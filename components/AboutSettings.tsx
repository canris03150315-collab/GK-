
import React, { useState, FormEvent, useEffect, ChangeEvent } from 'react';
import { AboutInfo } from '../types.ts';

interface AboutSettingsProps {
    currentAboutInfo: AboutInfo;
    onUpdateAboutInfo: (info: AboutInfo) => void;
}

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

const AboutSettings: React.FC<AboutSettingsProps> = ({ currentAboutInfo, onUpdateAboutInfo }) => {
    const [info, setInfo] = useState(currentAboutInfo);
    const [isSaving, setIsSaving] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(currentAboutInfo.imageUrl);

    useEffect(() => {
        setInfo(currentAboutInfo);
        setPreviewUrl(currentAboutInfo.imageUrl)
    }, [currentAboutInfo]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInfo(prev => ({ ...prev, [name]: value }));
    };

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
        setIsSaving(true);

        let finalInfo = { ...info };

        try {
            if (imageFile) {
                const newImageUrl = await fileToBase64(imageFile);
                finalInfo.imageUrl = newImageUrl;
            }
            onUpdateAboutInfo(finalInfo);

             // Clean up
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
            setImageFile(null);

            setTimeout(() => {
                setIsSaving(false);
                alert("「關於我們」頁面已更新！");
            }, 1000);
        } catch (error) {
            console.error("Error updating about info:", error);
            alert("Could not update. Please try again.");
            setIsSaving(false);
        }
    };
    
    const isUnchanged = JSON.stringify(info) === JSON.stringify(currentAboutInfo) && !imageFile;

    return (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md sticky top-8">
            <h3 className="text-xl font-semibold text-gray-900">「關於我們」頁面內容</h3>
            <p className="mt-1 text-sm text-gray-600">編輯顯示在「關於我們」頁面上的內容。</p>
            
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        頁面標題
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={info.title}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                        內容
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        value={info.content}
                        onChange={handleChange}
                        rows={8}
                        className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">橫幅圖片</label>
                    <div className="flex items-center justify-center w-full mt-1">
                        <label htmlFor="about-image-upload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            {previewUrl ? (
                                <img src={previewUrl} alt="About Us Preview" className="object-cover w-full h-full" />
                            ) : (
                                <div className="flex flex-col items-center justify-center text-center">
                                    <svg className="w-8 h-8 mb-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                                    <p className="text-xs text-gray-500">點擊上傳橫幅圖片</p>
                                </div>
                            )}
                            <input id="about-image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                        </label>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isSaving || isUnchanged}
                    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                    {isSaving ? '儲存中...' : '儲存變更'}
                </button>
            </form>
        </div>
    );
};

export default AboutSettings;