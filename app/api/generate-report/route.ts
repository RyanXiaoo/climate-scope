import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect from "@lib/mongodb";
import ReportModel, { IReport } from "../../../models/Report";
import UserModel from "../../../models/User";

const OPENCAGE_API_KEY = process.env.OPENCAGE_API_KEY;
const OPEN_METEO_API_URL = "https://archive-api.open-meteo.com/v1/archive"; // Corrected API endpoint

interface GeocodingResult {
    lat: number;
    lng: number;
}

interface GeocodingResponse {
    results: {
        formatted: string;
        geometry: { lat: number; lng: number };
    }[];
    status: { code: number; message: string };
}

interface MeteoResponse {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    daily_units: any; // Can be more specific if needed
    daily: any; // Can be more specific if needed
}

async function geocodeCity(
    city: string,
    country?: string
): Promise<GeocodingResponse> {
    if (!OPENCAGE_API_KEY) {
        console.error("OpenCage API key is not configured.");
        throw new Error(
            "Server configuration error: Geocoding service not available."
        );
    }

    const locationQuery = country ? `${city}, ${country}` : city; // Handle optional country

    // Step 1: Geocoding with OpenCage
    console.log(`[generate-report] Geocoding location: ${locationQuery}`);
    const geocodingUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        locationQuery
    )}&key=${OPENCAGE_API_KEY}&limit=1&no_annotations=1`;

    const geoResponse = await fetch(geocodingUrl);
    const geoData = await geoResponse.json();

    if (!geoResponse.ok || !geoData.results || geoData.results.length === 0) {
        console.error("[generate-report] Geocoding failed:", geoData);
        throw new Error(
            `Geocoding failed for location: ${locationQuery}. ${
                geoData?.status?.message || "Unknown error"
            }`
        );
    }

    const { lat, lng }: GeocodingResult = geoData.results[0].geometry;
    console.log(`[generate-report] Geocoded to Lat: ${lat}, Lng: ${lng}`);

    return {
        results: [
            {
                formatted: locationQuery,
                geometry: { lat, lng },
            },
        ],
        status: { code: 200, message: "OK" },
    };
}

async function getWeatherData(
    lat: number,
    lng: number,
    startDate: string,
    endDate: string,
    variables: string[]
): Promise<MeteoResponse> {
    // Step 2: Fetching weather data from Open-Meteo
    // Example variables: temperature_2m_mean, precipitation_sum, relativehumidity_2m_mean, windspeed_10m_mean
    // Ensure `variables` is an array of strings like ["temperature_2m_mean", "precipitation_sum"]
    const weatherVariables = Array.isArray(variables)
        ? variables.join(",")
        : variables; // Ensure it's a comma-separated string

    const weatherUrl = `${OPEN_METEO_API_URL}?latitude=${lat}&longitude=${lng}&start_date=${startDate}&end_date=${endDate}&daily=${weatherVariables}&timezone=auto`;

    console.log(`[generate-report] Fetching weather data from: ${weatherUrl}`);
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    if (!weatherResponse.ok) {
        console.error("[generate-report] Open-Meteo API error:", weatherData);
        throw new Error(
            `Failed to fetch weather data. ${
                weatherData?.reason || "Unknown error"
            }`
        );
    }

    return weatherData;
}

// The main function that orchestrates geocoding and weather data fetching
async function generateReport(
    city: string,
    country: string | undefined,
    startDate: string,
    endDate: string,
    variables: string[]
) {
    const geocodingData = await geocodeCity(city, country);
    const meteoData = await getWeatherData(
        geocodingData.results[0].geometry.lat,
        geocodingData.results[0].geometry.lng,
        startDate,
        endDate,
        variables
    );

    // Construct the combined response
    const reportResult = {
        location: geocodingData.results[0].formatted,
        coordinates: {
            lat: geocodingData.results[0].geometry.lat,
            lng: geocodingData.results[0].geometry.lng,
        },
        requestedPeriod: { startDate, endDate }, // Keep these as strings for now, convert to Date for DB
        weatherData: meteoData, // This is the direct response from Open-Meteo
    };

    return reportResult; // Return the structured data
}

export async function POST(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json(
            { message: "Unauthorized. Please log in to generate a report." },
            { status: 401 }
        );
    }
    const userId = (session.user as { id?: string }).id;
    if (!userId) {
        return NextResponse.json(
            { message: "Unauthorized. User ID not found in session." },
            { status: 401 }
        );
    }

    try {
        const { city, country, startDate, endDate, variables } =
            await request.json();

        if (
            !city ||
            !startDate ||
            !endDate ||
            !variables ||
            !variables.length
        ) {
            return NextResponse.json(
                {
                    message:
                        "Missing required fields: city, startDate, endDate, variables.",
                },
                { status: 400 }
            );
        }

        // Generate the report data (geocoding + weather fetch)
        const generatedReportData = await generateReport(
            city,
            country,
            startDate,
            endDate,
            variables
        );

        // Now, save this report to the database
        const newReport = new ReportModel({
            user: userId, // Link to the logged-in user
            locationName: generatedReportData.location,
            searchCity: city,
            searchCountry: country,
            geoCoordinates: generatedReportData.coordinates,
            requestedStartDate: new Date(
                generatedReportData.requestedPeriod.startDate
            ),
            requestedEndDate: new Date(
                generatedReportData.requestedPeriod.endDate
            ),
            // Spread Open-Meteo specific metadata
            apiLatitude: generatedReportData.weatherData.latitude,
            apiLongitude: generatedReportData.weatherData.longitude,
            elevation: generatedReportData.weatherData.elevation,
            generationtime_ms:
                generatedReportData.weatherData.generationtime_ms,
            timezone: generatedReportData.weatherData.timezone,
            timezone_abbreviation:
                generatedReportData.weatherData.timezone_abbreviation,
            utc_offset_seconds:
                generatedReportData.weatherData.utc_offset_seconds,
            // Store the actual daily units and data
            daily_units: generatedReportData.weatherData.daily_units,
            daily_data: generatedReportData.weatherData.daily,
        });

        const savedReport = await newReport.save();

        // Add the report ID to the user's list of reports
        await UserModel.findByIdAndUpdate(
            userId,
            { $push: { reports: savedReport._id } },
            { new: true, runValidators: true } // new: true returns the modified doc
        );

        return NextResponse.json(
            {
                message: "Report generated and saved successfully!",
                reportId: savedReport._id,
                data: generatedReportData, // Optionally return the generated data too
            },
            { status: 200 } // 200 OK or 201 Created for the report resource
        );
    } catch (error: any) {
        console.error("[generate-report] General error:", error);
        return NextResponse.json(
            {
                message: "An unexpected error occurred on the server.",
                error: error.message,
            },
            { status: 500 }
        );
    }
}
