"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react"; // Potentially useful later

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle errors from API (e.g., validation, user exists)
                if (data.errors) {
                    // Mongoose validation errors
                    const errorMessages = Object.values(data.errors).join("\n");
                    setError(errorMessages);
                } else {
                    setError(
                        data.message || "Sign up failed. Please try again."
                    );
                }
                setIsLoading(false);
                return;
            }

            // Successful registration
            setTimeout(() => {
                router.push("/login");
            }, 1500);
        } catch (err) {
            console.error("Sign up error (client-side catch):", err);
            setError(
                "An unexpected client-side error occurred during sign up."
            );
            // Ensure isLoading is false even if fetch itself throws an error (e.g. network issue)
            setIsLoading(false);
        }
        // No finally block for setIsLoading(false) needed here if all paths set it
        // but it's good practice to ensure it's always reset.
        // However, the redirection might happen before the user sees the button revert.
        // So, we manage it inside the try/catch specifically.
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-custom-moss-green py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-xl shadow-2xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                            <p>{error}</p>
                        </div>
                    )}
                    <div className="rounded-md shadow-sm space-y-[-1px]">
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Full name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password (min. 8 characters)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="confirm-password"
                                className="sr-only"
                            >
                                Confirm password
                            </label>
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {isLoading ? "Creating account..." : "Sign up"}
                        </button>
                    </div>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-green-600 hover:text-green-500"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
