// File: src/app/page.js
"use client";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useState, useRef } from "react";
import ResultModal from "@/components/ResultModal";
import { Camera, Upload, Loader2, RefreshCw } from "lucide-react"; 
import Footer from "@/components/Footer";

export default function Home() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const [result, setResult] = useState<string | null>(null);
    const [confidence, setConfidence] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false); 
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null); 

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            // Membersihkan URL preview lama
            if (preview) URL.revokeObjectURL(preview); 
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSelectFileClick = () => {
        fileInputRef.current?.click();
    };

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);
        
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(`${API_URL}/predict`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Server returned status: ${response.status}`);
            }

            const data = await response.json();

            setResult(data.predicted_class);
            setConfidence(data.confidence);
            setShowModal(true);

        } catch (error) {
            console.error("Prediction Error:", error);
            alert("Gagal koneksi atau memproses data dari Backend! Pastikan server berjalan.");
        } finally {
            setLoading(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFile(null);
        if (preview) URL.revokeObjectURL(preview); 
        setPreview(null);
    };

    return (
        <div className="bg-gradient-to-br from-yellow-500 via-green-400 to-blue-50 min-h-screen pt-28">
            <Navbar />
            <main className="flex-grow w-full max-w-4xl mx-auto p-4 sm:p-8 my-5 sm:my-10 bg-white rounded-2xl shadow-2xl border border-gray-100 text-center text-gray-800">

                <h1 className="text-2xl sm:text-3xl font-extrabold text-green-700 mb-2">
                    Kenali Buah & Sayurmu 🍎🥦
                </h1>
                <p className="text-base sm:text-lg font-medium text-gray-600 mb-6 sm:mb-10">
                    Unggah foto untuk mendeteksi jenis buah dan sayur.
                </p>
                
                <div className="flex flex-col items-center gap-6">

                    {/* Area Preview Gambar (Lebar maksimal 350px, Tinggi fleksibel) */}
                    {/* Mengganti w-full max-w-sm h-80 menjadi ukuran yang lebih terkontrol */}
                    <div className="w-full max-w-xs sm:max-w-sm h-[280px] sm:h-[350px] mx-auto transition-all duration-300 relative">
                        {preview ? (
                            <>
                                <Image 
                                    src={preview} 
                                    alt="Preview" 
                                    fill 
                                    style={{ objectFit: 'cover' }}
                                    className="rounded-xl shadow-xl border-4 border-white transition-all duration-500 hover:scale-[1.02]"
                                />
                                <button 
                                    onClick={() => {
                                        setFile(null);
                                        if (preview) URL.revokeObjectURL(preview);
                                        setPreview(null);
                                    }}
                                    className="absolute top-2 right-2 bg-red-500 p-2 rounded-full text-white shadow-md hover:bg-red-600 transition"
                                    aria-label="Hapus Gambar"
                                >
                                    <RefreshCw size={18} />
                                </button>
                            </>
                        ) : (
                            <div 
                                className="w-full h-full flex flex-col justify-center items-center bg-white border-2 border-dashed border-gray-300 rounded-xl shadow-lg cursor-pointer transition-all hover:border-green-500 hover:shadow-xl"
                                onClick={handleSelectFileClick}
                            >
                                <Upload size={40} className="text-green-500 mb-3 sm:mb-4" />
                                <span className="text-sm sm:text-base text-gray-500 font-semibold">
                                    Klik atau Seret Gambar di Sini
                                </span>
                                <span className="text-xs text-gray-400 mt-1">(Maks. 5MB, format JPG/PNG)</span>
                            </div>
                        )}
                    </div>

                    <input 
                        type="file" 
                        accept="image/*" 
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        // Dihapus 'capture' untuk memunculkan opsi Kamera ATAU Galeri
                    />

                    {/* Kontainer Tombol (Menggunakan flex-col di sm, dan flex-row di md ke atas) */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 sm:mt-4 w-full max-w-xs sm:max-w-md">
                        
                        {/* Tombol Pilih/Ganti Gambar (Dibuat full-width di layar kecil) */}
                        <button 
                            onClick={handleSelectFileClick}
                            className={`flex items-center justify-center gap-2 w-full px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base transition-all duration-300 
                                      ${file ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-green-600 text-white hover:bg-green-700 shadow-md'}
                                    `}
                        >
                            <Camera size={20} />
                            {file ? "Ganti Gambar" : "Pilih Gambar"}
                        </button>

                        {/* Tombol Deteksi (Dibuat full-width di layar kecil) */}
                        <button 
                            onClick={handleUpload}
                            disabled={!file || loading}
                            className={`flex items-center justify-center gap-2 w-full px-4 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base transition-all duration-300 
                                      ${file && !loading ? 'bg-green-700 text-white shadow-lg hover:bg-green-800 hover:scale-[1.03]' : 'bg-gray-400 text-white cursor-not-allowed'}
                                      disabled:opacity-70
                                    `}
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Memproses...
                                </>
                            ) : (
                                "Deteksi Sekarang"
                            )}
                        </button> 
                    </div>
                </div>
                
            </main>
            <ResultModal 
                isOpen={showModal}
                result_class={result}
                confidence={confidence}
                onClose={handleCloseModal}
            />
            <Footer />
        </div>
    )
}