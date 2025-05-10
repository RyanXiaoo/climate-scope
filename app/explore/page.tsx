export default function Explore() {
    return (
        <div className="flex flex-col md:flex-row h-full w-full">
            <div className="bg-custom-moss-green w-full md:w-3/5 h-auto md:h-full flex justify-center items-center p-6 md:p-12">
                {/* iPhone-like div - Responsive */}
                <div
                    className="relative mx-auto 
                                border-gray-800 dark:border-gray-800 bg-gray-800 
                                border-[10px] md:border-[14px] 
                                rounded-[2rem] md:rounded-[2.5rem] 
                                h-[480px] w-[240px] 
                                md:h-[600px] md:w-[300px] 
                                shadow-xl"
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
                            {/* Back Arrow */}
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
                            {/* Profile Image Placeholder */}
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                            {/* FaceTime Icon */}
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
                        <div className="flex-1 overflow-y-auto px-2 py-4">
                            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                                <div className="flex flex-col gap-3 h-full">
                                    {/* Header */}
                                    <div className="flex justify-start">
                                        <div className="bg-[#1e293b] rounded-xl px-3 py-1.5 text-sm text-white max-w-[80%] break-words">
                                            📍 Ever wonder how your city's
                                            climate has changed since the '90s?
                                        </div>
                                    </div>
                                    {/* Message 1 */}
                                    <div className="flex justify-start">
                                        <div className="bg-[#1e293b] rounded-xl px-3 py-1.5 text-sm text-white max-w-[80%] break-words">
                                            📈 We'll show you temperature +
                                            rainfall trends for your hometown.
                                        </div>
                                    </div>

                                    {/* Message 2 */}
                                    <div className="flex justify-start">
                                        <div className="bg-[#1e293b] rounded-xl px-3 py-1.5 text-sm text-white max-w-[80%] break-words">
                                            🧊 Some cities have warmed over 2°C
                                            in just 30 years.
                                        </div>
                                    </div>
                                    {/* Message 3 */}
                                    <div className="flex justify-start">
                                        <div className="bg-[#1e293b] rounded-xl px-3 py-1.5 text-sm text-white max-w-[80%] break-words">
                                            🔍 Enter your city or zip to explore
                                            its climate story.
                                        </div>
                                    </div>
                                    {/* Message 4 */}
                                    <div className="flex justify-end">
                                        <div className="bg-green-600 rounded-xl px-3 py-1.5 text-sm text-white max-w-[80%] break-words">
                                            How do I get started?
                                        </div>
                                    </div>
                                    {/* Message 5 */}
                                    <div className="flex justify-start">
                                        <div className="bg-[#1e293b] rounded-xl px-3 py-1.5 text-sm text-white max-w-[80%] break-words">
                                            📄 Fill the form on the right!
                                        </div>
                                    </div>
                                </div>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side content */}
            <div className="w-full md:w-2/5 h-auto md:h-full bg-blue-500 flex justify-center items-center p-6 md:p-12">
                <p className="text-white text-center md:text-left">
                    Right side content
                </p>
            </div>
        </div>
    );
}
