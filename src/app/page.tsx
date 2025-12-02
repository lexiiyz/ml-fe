"use client";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import ResultModal from "@/components/ResultModal";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  
  // State untuk Hasil & Modal
  const [result, setResult] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false); 
  const [loading, setLoading] = useState(false);

  // Fungsi 1: Handle User Pilih Gambar
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const response = await fetch("`${API_URL}`/predict", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      
      // Simpan hasil dan TAMPILKAN MODAL
      setResult(data.predicted_class);
      setConfidence(data.confidence);
      setShowModal(true);

    } catch (error) {
      console.error(error);
      alert("Gagal koneksi ke Backend!");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi 3: Reset saat tombol 'Coba Lagi' ditekan di modal
  const handleCloseModal = () => {
    setShowModal(false);
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="bg-[#f9fafb] min-h-1vh justify-center">
      <Navbar />
      <main className="p-2 max-w-1vh mx-0 mt-20 text-center text-black">
        Ambil Foto Buah atau Sayur yang Ingin Dikenali
        <div className="my-20">
          {preview ? (
            <Image 
              src={preview} 
              alt="Preview" 
              width={300} 
              height={300} 
              className="mx-auto rounded-md shadow-2xs shadow-[rgba(0,0,0,0.2)]"
            />
          ) : (
            <div className="w-[300px] h-[300px] mx-auto flex justify-center items-center bg-green-700 border-2 border-dashed border-gray-300 rounded-md">
              <span className="text-gray-400">Preview Gambar</span>
            </div>
          )}
        </div>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange}
          className="mb-20 bg-[#166534] px-10 py-5 rounded-md cursor-pointer shadow-2xs shadow-[rgba(0,0,0,0.2)]"
        />
        <br />
        <button 
          onClick={handleUpload}
          disabled={!file || loading}
          className="px-10 py-5 mb-20 bg-[#166534] text-white rounded-md cursor-pointer disabled:opacity-50"
        >
          {loading ? "Memproses..." : "Deteksi"}
        </button> 
      </main>
      <ResultModal 
          isOpen={showModal}
          result_class={result}
          confidence={confidence}
          onClose={handleCloseModal}
        />
    </div>
  )
}
