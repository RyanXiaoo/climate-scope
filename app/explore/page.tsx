import Image from "next/image";

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
                action="onSubmit"
                className="w-full max-w-md space-y-6 mx-auto md:mx-16"
            >
                <div>
                    <label
                        htmlFor="city"
                        className="block text-sm font-medium text-white"
                    >
                        City
                    </label>
                    <input
                        type="text"
                        name="city"
                        id="city"
                        className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    />
                </div>
                <div>
                    <label
                        htmlFor="country"
                        className="block text-sm font-medium text-white"
                    >
                        Country
                    </label>
                    <input
                        type="text"
                        name="country"
                        id="country"
                        className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    />
                </div>
                <fieldset className="space-y-2">
                    <legend className="block text-sm font-medium text-white">
                        Start Date
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
                                className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                            >
                                <option value="">Year</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>
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
                                className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                            >
                                <option value="">Month</option>
                                {months.map((month) => (
                                    <option key={month} value={month}>
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
                                className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                            >
                                <option value="">Day</option>
                                {days.map((day) => (
                                    <option key={day} value={day}>
                                        {day}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>
                <fieldset className="space-y-2">
                    <legend className="block text-sm font-medium text-white">
                        End Date
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
                                className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                            >
                                <option value="">Year</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>
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
                                className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                            >
                                <option value="">Month</option>
                                {months.map((month) => (
                                    <option key={month} value={month}>
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
                                className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                            >
                                <option value="">Day</option>
                                {days.map((day) => (
                                    <option key={day} value={day}>
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
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
