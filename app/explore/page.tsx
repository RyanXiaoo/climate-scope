"use client"; // Ensure this is a client component

import Image from "next/image";
import { useState, FormEvent } from "react"; // Import useState and FormEvent
// import { useRouter } from 'next/navigation'; // Uncomment if you need router later for redirection

export default function Explore() {
    const currentYear = new Date().getFullYear();
    const years = Array.from(
        { length: currentYear - 1970 },
        (_, i) => currentYear - i
    );
    const months = Array.from({ length: 12 }, (_, i) =>
        (i + 1).toString().padStart(2, "0")
    );
    const days = Array.from({ length: 31 }, (_, i) =>
        (i + 1).toString().padStart(2, "0")
    );

    // State for form inputs
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [startYear, setStartYear] = useState("");
    const [startMonth, setStartMonth] = useState("");
    const [startDay, setStartDay] = useState("");
    const [endYear, setEndYear] = useState("");
    const [endMonth, setEndMonth] = useState("");
    const [endDay, setEndDay] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [apiResponse, setApiResponse] = useState<any>(null); // To store and display API response for debugging

    // const router = useRouter(); // Uncomment if needed later

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setApiResponse(null);

        if (
            !city ||
            !startYear ||
            !startMonth ||
            !startDay ||
            !endYear ||
            !endMonth ||
            !endDay
        ) {
            setError("Please fill in all location and date fields.");
            setIsLoading(false);
            return;
        }

        const startDate = `${startYear}-${startMonth}-${startDay}`;
        const endDate = `${endYear}-${endMonth}-${endDay}`;

        // Basic date validation (more robust validation can be added)
        if (new Date(startDate) >= new Date(endDate)) {
            setError("Start date must be before end date.");
            setIsLoading(false);
            return;
        }

        // Define the weather variables you want to fetch
        const weatherVariables = [
            "temperature_2m_mean",
            "precipitation_sum",
            // Add more variables here from Open-Meteo docs as needed
            // e.g., "relative_humidity_2m_mean", "wind_speed_10m_mean"
        ];

        try {
            console.log("[Explore Page] Calling /api/generate-report with:", {
                city,
                country,
                startDate,
                endDate,
                variables: weatherVariables,
            });

            const response = await fetch("/api/generate-report", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    city,
                    country: country || undefined, // Send country only if provided
                    startDate,
                    endDate,
                    variables: weatherVariables,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Failed to fetch report data.");
            } else {
                console.log("[Explore Page] Report data received:", data);
                setApiResponse(data); // Store data to display (for debugging/initial view)
                // Later, you will redirect to a new page with this data or a reportId
                // e.g., router.push(`/data/${data.reportId}`);
            }
        } catch (err: any) {
            console.error("[Explore Page] Error submitting form:", err);
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center md:flex-row md:items-center md:justify-center h-full w-full bg-custom-moss-green p-6 md:p-12">
            {/* iPhone Mockup - Direct Child */}
            <div
                className="relative mx-auto md:mx-16
                            border-gray-800 dark:border-gray-800 bg-gray-800 
                            border-[10px] md:border-[14px] 
                            rounded-[2rem] md:rounded-[2.5rem] 
                            h-[480px] w-[240px] 
                            md:h-[600px] md:w-[300px] 
                            shadow-xl mb-6 md:mb-0"
            >
                {/* Notch - Responsive */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 
                                w-[80px] h-[22px] 
                                md:w-[100px] md:h-[28px] 
                                bg-gray-800 rounded-b-lg md:rounded-b-xl"
                ></div>

                {/* Screen - Responsive */}
                <div
                    className="bg-white dark:bg-gray-900 
                                rounded-[1.5rem] md:rounded-[2rem] 
                                h-[460px] w-[220px] 
                                md:h-[572px] md:w-[272px] 
                                overflow-hidden flex flex-col
                                py-6 px-2"
                >
                    {/* iMessage-style Header */}
                    <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-blue-500"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                        </svg>
                        <Image
                            src="/images/profile.png"
                            alt="Profile"
                            width={36}
                            height={36}
                            className="rounded-full"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-blue-500"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z"
                            />
                        </svg>
                    </div>
                    {/* Screen content (Chat Bubbles) */}
                    <div className="flex-1 overflow-y-auto px-2 py-6">
                        <div className="flex flex-col gap-3 h-full">
                            {/* Header */}
                            <div className="flex justify-start">
                                <div className="bg-[#1e293b] rounded-xl px-3 py-1.5 text-sm text-white max-w-[80%] break-words">
                                    📍 Ever wonder how your city's climate has
                                    changed over the years?
                                </div>
                            </div>
                            {/* Message 1 */}
                            <div className="flex justify-start">
                                <div className="bg-[#1e293b] rounded-xl px-3 py-1.5 text-sm text-white max-w-[80%] break-words">
                                    📈 We can show you trends in temperature and
                                    rainfall from 1990 to today.
                                </div>
                            </div>
                            {/* Message 2 */}
                            <div className="flex justify-start">
                                <div className="bg-[#1e293b] rounded-xl px-3 py-1.5 text-sm text-white max-w-[80%] break-words">
                                    ❓ Curious about your city?
                                </div>
                            </div>
                            {/* Message 4 */}
                            <div className="flex justify-end">
                                <div className="bg-green-600 rounded-xl px-3 py-1.5 text-sm text-white max-w-[80%] break-words">
                                    Yes! How do I get started?
                                </div>
                            </div>
                            {/* Message 4 */}
                            <div className="flex justify-start">
                                <div className="bg-[#1e293b] rounded-xl px-3 py-1.5 text-sm text-white max-w-[80%] break-words">
                                    📄 Fill the form on the right!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form - Direct Child */}
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-6 mx-auto md:mx-16 mt-8 md:mt-0"
            >
                <div>
                    <label
                        htmlFor="city"
                        className="block text-sm font-medium text-white"
                    >
                        City <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        name="city"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    />
                </div>
                <div>
                    <label
                        htmlFor="country"
                        className="block text-sm font-medium text-white"
                    >
                        Country (Optional)
                    </label>
                    <input
                        type="text"
                        name="country"
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    />
                </div>
                <fieldset className="space-y-2">
                    <legend className="block text-sm font-medium text-white">
                        Start Date <span className="text-red-400">*</span>
                    </legend>
                    <div className="flex flex-row gap-3">
                        <div className="flex-1">
                            <label
                                htmlFor="startYear"
                                className="sr-only text-white"
                            >
                                Start Year
                            </label>
                            <select
                                id="startYear"
                                name="startYear"
                                value={startYear}
                                onChange={(e) => setStartYear(e.target.value)}
                                required
                                className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                            >
                                <option value="">Year</option>
                                {years.map((year) => (
                                    <option key={`start-${year}`} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label
                                htmlFor="startMonth"
                                className="sr-only text-white"
                            >
                                Start Month
                            </label>
                            <select
                                id="startMonth"
                                name="startMonth"
                                value={startMonth}
                                onChange={(e) => setStartMonth(e.target.value)}
                                required
                                className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                            >
                                <option value="">Month</option>
                                {months.map((month) => (
                                    <option
                                        key={`start-${month}`}
                                        value={month}
                                    >
                                        {month}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label
                                htmlFor="startDay"
                                className="sr-only text-white"
                            >
                                Start Day
                            </label>
                            <select
                                id="startDay"
                                name="startDay"
                                value={startDay}
                                onChange={(e) => setStartDay(e.target.value)}
                                required
                                className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                            >
                                <option value="">Day</option>
                                {days.map((day) => (
                                    <option key={`start-${day}`} value={day}>
                                        {day}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>
                <fieldset className="space-y-2">
                    <legend className="block text-sm font-medium text-white">
                        End Date <span className="text-red-400">*</span>
                    </legend>
                    <div className="flex flex-row gap-3">
                        <div className="flex-1">
                            <label
                                htmlFor="endYear"
                                className="sr-only text-white"
                            >
                                End Year
                            </label>
                            <select
                                id="endYear"
                                name="endYear"
                                value={endYear}
                                onChange={(e) => setEndYear(e.target.value)}
                                required
                                className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                            >
                                <option value="">Year</option>
                                {years.map((year) => (
                                    <option key={`end-${year}`} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label
                                htmlFor="endMonth"
                                className="sr-only text-white"
                            >
                                End Month
                            </label>
                            <select
                                id="endMonth"
                                name="endMonth"
                                value={endMonth}
                                onChange={(e) => setEndMonth(e.target.value)}
                                required
                                className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                            >
                                <option value="">Month</option>
                                {months.map((month) => (
                                    <option key={`end-${month}`} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label
                                htmlFor="endDay"
                                className="sr-only text-white"
                            >
                                End Day
                            </label>
                            <select
                                id="endDay"
                                name="endDay"
                                value={endDay}
                                onChange={(e) => setEndDay(e.target.value)}
                                required
                                className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                            >
                                <option value="">Day</option>
                                {days.map((day) => (
                                    <option key={`end-${day}`} value={day}>
                                        {day}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>
                <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Generating Report..." : "Generate Report"}
                    </button>
                </div>

                {error && (
                    <p className="mt-2 text-sm text-red-300 bg-red-900 p-3 rounded-md">
                        {error}
                    </p>
                )}

                {/* {apiResponse && (
                    <div className="mt-4 p-4 bg-gray-800 text-white rounded-md overflow-x-auto">
                        <h3 className="text-lg font-semibold mb-2">
                            API Response (Debug):
                        </h3>
                        <pre className="text-xs">
                            {JSON.stringify(apiResponse, null, 2)}
                        </pre>
                    </div>
                )} */}
            </form>
        </div>
    );
}
