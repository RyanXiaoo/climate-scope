import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google"; // Assuming Geist is not strictly needed for now
import "./globals.css";
import Navbar from "../components/navbar";
import AuthProviders from "../components/AuthProviders"; // Import the new provider

export const metadata: Metadata = {
    title: "ClimateScope App",
    description: "Visualize climate change data for your city.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full">
            <body className="flex flex-col w-full h-full bg-custom-moss-green">
                <AuthProviders>
                    {" "}
                    {/* Wrap with AuthProviders */}
                    <Navbar />
                    <main className="flex-1 overflow-y-auto">{children}</main>
                </AuthProviders>
            </body>
        </html>
    );
}
