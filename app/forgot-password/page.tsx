"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
// import Image from 'next/image'; // If you have a logo

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null); // For success/error messages

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        // Simulate API call for password reset
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // In a real app, you would call your backend API here to send a reset link.
        // For now, we'll just simulate success.
        console.log("Password reset requested for:", email);
        setMessage(
            "If an account with that email exists, a password reset link has been sent."
        );
        setIsLoading(false);
        // setEmail(''); // Optionally clear email field
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 sm:px-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8 text-center">
                <Image
                    src="/images/logo.png"
                    alt="Your Company"
                    width={80}
                    height={80}
                    className="object-contain inline-block"
                />
                <h1 className="text-xl font-semibold text-gray-700 mt-2">
                    ClimateScope
                </h1>
            </div>

            <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="mb-8 text-left">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Forgot your password
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Please enter the email address you'd like your password
                        reset information sent to.
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Enter email address
                        </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    {message && (
                        <div
                            className={`p-3 rounded-md text-sm ${
                                message.includes("sent")
                                    ? "bg-green-50 text-green-700"
                                    : "bg-red-50 text-red-700"
                            }`}
                        >
                            {message}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-700 disabled:bg-gray-400"
                        >
                            {isLoading ? "Sending..." : "Request reset link"}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <Link
                        href="/login"
                        className="text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                        Back To Login
                    </Link>
                </div>
            </div>

            {/* Optional: Language selector like in the example */}
            {/* <div className="mt-8 text-center text-sm text-gray-500">
                English <span className="inline-block">▼</span>
            </div> */}
        </div>
    );
}
