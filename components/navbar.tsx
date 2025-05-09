import Image from "next/image";

const Navbar = () => {
    return (
        <div className="w-full h-20 bg-white shadow-md">
            <div className="flex items-center h-full px-4">
                <div className="relative w-16 h-16">
                    <Image
                        src="/images/logo.jpg"
                        alt="logo"
                        fill={true}
                        className="object-contain"
                    />
                </div>
                <h1 className="ml-4 text-2xl font-bold">ClimateScope</h1>
            </div>
        </div>
    );
};

export default Navbar;
