// File: src/components/Footer.js
import Image from "next/image"; // Import Image dari Next.js
import { Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full bg-green-800 text-gray-200 py-2 mt-10">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-sm flex items-center justify-center">
                    <Image
                        src="/logo.png" 
                        alt="Fregie Logo"
                        width={150}
                        height={80}
                        className="mr-2 rounded-full"
                    />
                    &copy; {new Date().getFullYear()} Fregie
                </p>
                <p className="text-xs mt-2 opacity-70">
                    Aplikasi deteksi buah & sayur berbasis AI.
                </p>
            </div>
        </footer>
    );
}