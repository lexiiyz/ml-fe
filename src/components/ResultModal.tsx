interface ResultModalProps {
    isOpen: boolean;
    result_class: string | null;
    confidence: number | null;
    onClose: () => void;
}

export default function ResultModal({ isOpen, result_class, confidence, onClose }: ResultModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm">
            
            {/* Modal Box */}
            <div className="bg-white p-8 rounded-lg text-center w-[350px] shadow-2xl transform transition-all">
                <h2 className="text-gray-800 text-xl font-bold mb-4">Hasil Deteksi</h2>
                
                <div className="mx-auto p-4 bg-green-100 rounded-md mb-4 border border-green-200">
                    <span className="block text-sm text-gray-600 mb-1">Prediksi</span>
                    <strong className="text-2xl text-green-800 capitalize block">
                        {result_class}
                    </strong>
                </div>

                <p className="text-md text-gray-700 mb-8">
                    Tingkat Keyakinan: <strong>{Math.round(confidence! * 100)}%</strong>
                </p>

                <button 
                    onClick={onClose}
                    className="w-full py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-md transition duration-200"
                >
                    Coba Lagi
                </button>
            </div>
        </div>
    )
}