"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
    const { data: session, status } = useSession();
    const isLoading = status === "loading";

    return (
        <div className="w-full h-24 bg-white shadow-md px-4 sm:px-8 md:px-16 lg:px-24 xl:px-48">
            <div className="flex items-center justify-between h-full">
                <Link href="/" className="flex items-center">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                        <Image
                            src="/images/logo.png"
                            alt="logo"
                            fill={true}
                            className="object-contain"
                        />
                    </div>
                    <h1 className="ml-2 sm:ml-4 text-lg sm:text-xl font-bold">
                        ClimateScope
                    </h1>
                </Link>

                <div className="flex items-center gap-6 md:gap-8 lg:gap-12">
                    {isLoading ? (
                        <div className="animate-pulse h-6 w-20 bg-gray-200 rounded-md"></div>
                    ) : session ? (
                        <>
                            <Link
                                href="/explore"
                                className="hover:text-gray-600 text-base sm:text-lg"
                            >
                                Explore
                            </Link>
                            <Link
                                href="/data"
                                className="hover:text-gray-600 text-base sm:text-lg"
                            >
                                Data
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-base sm:text-lg"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/about"
                                className="hover:text-gray-600 text-base sm:text-lg"
                            >
                                About
                            </Link>
                            <button
                                onClick={() => signIn()}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-base sm:text-lg cursor-pointer"
                            >
                                Login
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
