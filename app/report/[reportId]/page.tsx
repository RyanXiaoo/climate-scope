"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // For accessing route parameters

// You might want to define a more specific type for your report data later
interface ReportData {
    _id: string;
    locationName: string;
    searchCity: string;
    searchCountry?: string;
    geoCoordinates: {
        lat: number;
        lng: number;
    };
    requestedStartDate: string; // Assuming it comes as an ISO string
    requestedEndDate: string;   // Assuming it comes as an ISO string
    apiLatitude: number;
    apiLongitude: number;
    elevation?: number;
    generationtime_ms?: number;
    timezone?: string;
    timezone_abbreviation?: string;
    utc_offset_seconds?: number;
    daily_units: any;
    daily_data: {
        time: string[];
        [key: string]: any[]; // For other weather variables like temperature_2m_mean
    };
    createdAt: string; // Assuming it comes as an ISO string
    user: string; // User ID
    // Add any other fields you expect from the API
}

export default function ReportPage() {
    const params = useParams();
    const reportId = params.reportId as string; // Get reportId from URL

    const [reportData, setReportData] = useState<ReportData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!reportId) {
            setLoading(false);
            setError("Report ID not found in URL.");
            return;
        }

        const fetchReport = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/report/${reportId}`);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `Error: ${response.status}`);
                }
                const data: ReportData = await response.json();
                setReportData(data);
            } catch (err: any) {
                setError(err.message || "Failed to fetch report data.");
                console.error("Error fetching report:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [reportId]); // Re-run effect if reportId changes

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
                <p className="text-xl">Loading report data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900 text-red-400">
                <p className="text-xl">Error: {error}</p>
            </div>
        );
    }

    if (!reportData) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
                <p className="text-xl">No report data found.</p>
            </div>
        );
    }

    // Basic display of report data for now
    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">Climate Report Details</h1>
                
                <div className="bg-gray-800 shadow-xl rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-3 text-green-400">Location: {reportData.locationName}</h2>
                    <p><span className="font-semibold">Searched City:</span> {reportData.searchCity}</p>
                    {reportData.searchCountry && <p><span className="font-semibold">Searched Country:</span> {reportData.searchCountry}</p>}
                    <p><span className="font-semibold">Coordinates:</span> Lat: {reportData.geoCoordinates.lat}, Lng: {reportData.geoCoordinates.lng}</p>
                </div>

                <div className="bg-gray-800 shadow-xl rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-3 text-green-400">Requested Period</h2>
                    <p><span className="font-semibold">Start Date:</span> {new Date(reportData.requestedStartDate).toLocaleDateString()}</p>
                    <p><span className="font-semibold">End Date:</span> {new Date(reportData.requestedEndDate).toLocaleDateString()}</p>
                </div>
                
                <div className="bg-gray-800 shadow-xl rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-3 text-green-400">Weather Data Summary</h2>
                    <p className="mb-2"><span className="font-semibold">Timezone:</span> {reportData.timezone} ({reportData.timezone_abbreviation})</p>
                    <p className="mb-4"><span className="font-semibold">Elevation:</span> {reportData.elevation}m</p>

                    <h3 className="text-xl font-semibold mb-2 text-green-300">Daily Variables:</h3>
                    <ul className="list-disc list-inside mb-4">
                        {Object.keys(reportData.daily_units).map(key => (
                            <li key={key}>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}: {reportData.daily_units[key]}</li>
                        ))}
                    </ul>
                    
                    {/* Displaying a snippet of the time series data as a table for now */}
                    {reportData.daily_data && reportData.daily_data.time && (
                        <div className="overflow-x-auto">
                             <h3 className="text-xl font-semibold mb-2 mt-4 text-green-300">Sample Daily Data (First 5 days)</h3>
                            <table className="min-w-full divide-y divide-gray-700">
                                <thead className="bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                                        {Object.keys(reportData.daily_data).filter(key => key !== 'time').map(variable => (
                                            <th key={variable} className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                {variable.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} ({reportData.daily_units[variable]})
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-800 divide-y divide-gray-600">
                                    {reportData.daily_data.time.slice(0, 5).map((time, index) => (
                                        <tr key={time}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{new Date(time).toLocaleDateString()}</td>
                                            {Object.keys(reportData.daily_data).filter(key => key !== 'time').map(variable => (
                                                <td key={`${variable}-${index}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                                                    {reportData.daily_data[variable][index]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                     <div className="mt-6">
                        <h3 className="text-xl font-semibold mb-2 text-green-300">Raw Data (Debug)</h3>
                        <pre className="bg-gray-950 p-4 rounded-md overflow-x-auto text-xs">
                            {JSON.stringify(reportData, null, 2)}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
} 