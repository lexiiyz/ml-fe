// File: src/components/Navbar.js
import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full bg-green-700/95 backdrop-blur-sm px-4 py-8 md:py-4 text-white shadow-lg z-20 border-b border-green-800/20 rounded-bl-2xl rounded-br-2xl">
            <div className="max-w-7xl mx-auto flex justify-center items-center relative">
                <div className="flex items-center space-x-2"> 
                    <div className="flex items-center"> 
                        <Image
                            src="/logo.png" 
                            alt="Fregie Logo"
                            width={100} 
                            height={70} 
                            className="rounded-full object-contain md:w-[180px] md:h-[70px]" 
                        />
                    </div>
    
                    <h2 className="text-sm sm:text-lg font-semibold text-green-100/90 tracking-wide">
                        Kelompok 5 ML
                    </h2>
                </div>
                {/* --- END: Combined Wrapper --- */}

            </div>
        </nav>
    );
}