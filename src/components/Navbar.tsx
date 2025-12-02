// File: src/components/Navbar.js
import Image from "next/image"; // Import Image dari Next.js

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full bg-green-700/95 backdrop-blur-sm px-6 py-1 text-white shadow-lg z-20 border-b border-green-800/20">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
               
                <div className="flex items-start"> 
                    <Image
                        src="/logo.png" 
                        alt="Fregie Logo"
                        width={180} 
                        height={100}
                        className="mr-1.5 rounded-full"
                    />
                </div>
                <h2>Kelompok 5 Machine Learning</h2>
            </div>
        </nav>
    );
}