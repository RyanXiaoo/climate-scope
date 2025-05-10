import Image from "next/image";

const Navbar = () => {
    return (
        <div className="w-full h-24 bg-white shadow-md px-4 sm:px-8 md:px-16 lg:px-24 xl:px-48">
            <div className="flex items-center justify-between h-full">
                <div className="flex items-center">
                    <div className="relative w-20 h-20">
                        <a href="/">
                            <Image
                                src="/images/logo.jpg"
                                alt="logo"
                                fill={true}
                                className="object-contain"
                            />
                        </a>
                    </div>

                    <a href="/" className="text-xl font-bold">
                        ClimateScope
                    </a>
                </div>
                <div className="flex gap-12 items-center">
                    <a href="/explore" className="hover:text-gray-600 text-lg">
                        Explore
                    </a>
                    <a href="/about" className="hover:text-gray-600 text-lg">
                        About
                    </a>
                    <a href="/sources" className="hover:text-gray-600 text-lg">
                        Sources
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
