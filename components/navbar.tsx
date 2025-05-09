import Image from "next/image";

const Navbar = () => {
    return (
        <div className="w-full h-20 bg-white shadow-md">
            <div className="flex items-center justify-between h-full px-48">
                <div className="flex items-center">
                    <div className="relative w-16 h-16">
                        <Image
                            src="/images/logo.jpg"
                            alt="logo"
                            fill={true}
                            className="object-contain"
                        />
                    </div>
                    <h1 className="ml-4 text-base font-bold">ClimateScope</h1>
                </div>
                <div className="flex gap-12 items-center">
                    <a href="/explore" className="hover:text-gray-600">
                        Explore
                    </a>
                    <a href="/about" className="hover:text-gray-600">
                        About
                    </a>
                    <a href="/sources" className="hover:text-gray-600">
                        Sources
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
