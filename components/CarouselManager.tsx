
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { CarouselImage } from '../types.ts';

interface CarouselManagerProps {
    images: CarouselImage[];
    onAddImage: (imageUrl: string) => void;
    onDeleteImage: (id: string) => void;
}

const MAX_IMAGES = 10;

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

const CarouselManager: React.FC<CarouselManagerProps> = ({ images, onAddImage, onDeleteImage }) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const isAtMaxCapacity = images.length >= MAX_IMAGES;

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        }
    };
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!imageFile || isAtMaxCapacity) {
            return;
        }
        setIsLoading(true);
        try {
            const imageUrl = await fileToBase64(imageFile);
            onAddImage(imageUrl);
            // Reset form
            setImageFile(null);
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
            setPreviewUrl(null);
            if (e.target instanceof HTMLFormElement) {
                e.target.reset();
            }
        } catch (error) {
            console.error("Error adding image:", error);
            alert("無法新增圖片，請再試一次。");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleDelete = (id: string, name: string) => {
        if (window.confirm(`您確定要刪除這張橫幅圖片嗎？`)) {
            onDeleteImage(id);
        }
    };

    return (
        <div className="space-y-8">
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900">新增首頁橫幅圖片</h3>
                <p className="text-sm text-gray-500 mt-1">您目前有 {images.length} / {MAX_IMAGES} 張圖片。</p>

                {isAtMaxCapacity && (
                    <div className="mt-4 p-4 text-sm text-yellow-800 bg-yellow-100 border border-yellow-200 rounded-md">
                        已達到圖片數量上限。請先刪除現有圖片才能新增。
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700">圖片</label>
                        <div className="flex items-center justify-center w-full mt-1">
                            <label htmlFor="carousel-image-upload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Carousel Preview" className="object-contain w-full h-full" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <svg className="w-8 h-8 mb-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                                        <p className="text-xs text-gray-500">點擊上傳 (建議尺寸: 1920x1080)</p>
                                    </div>
                                )}
                                <input id="carousel-image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} required disabled={isAtMaxCapacity} />
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading || !imageFile || isAtMaxCapacity}
                        className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? '新增中...' : '新增圖片'}
                    </button>
                </form>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-gray-900">目前圖片</h3>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map(image => (
                        <div key={image.id} className="relative group aspect-w-16 aspect-h-9">
                            <img src={image.imageUrl} alt="Carousel slide" className="object-cover w-full h-full rounded-md shadow-md" />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-colors flex items-center justify-center">
                                <button
                                    onClick={() => handleDelete(image.id, `Image ${image.id}`)}
                                    className="p-2 text-white bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    aria-label="刪除圖片"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CarouselManager;