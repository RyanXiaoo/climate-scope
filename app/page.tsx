import Navbar from "../components/navbar";
import Image from "next/image";

export default function Home() {
    return (
        <div className="flex flex-col lg:flex-row bg-custom-moss-green w-full h-full min-h-screen relative">
            <div className="w-full lg:w-1/2 h-full pl-8 lg:pl-24 flex">
                <div className="relative w-full h-full">
                    <Image
                        src="/images/home_image.png"
                        alt="Data Visualization"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
            <div className="flex flex-col w-full lg:w-2/3 h-full lg:p-56">
                <h1 className="text-white text-3xl lg:text-6xl font-bold mb-8">
                    Your city's climate story, revealed.
                </h1>
                <p className="text-white text-lg lg:text-xl lg:pb-8">
                    Get insights into your city's climate and how it's changing
                    over time.
                </p>
                <a href="/explore">
                    <button className="bg-white text-black font-bold w-32 px-2 py-2 rounded-md hover:bg-custom-light-green hover:cursor-pointer truncate">
                        Get Started
                    </button>
                </a>
            </div>
        </div>
    );
}
