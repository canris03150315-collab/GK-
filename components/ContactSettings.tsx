
import React, { useState, FormEvent, useEffect } from 'react';
import { ContactInfo } from '../types.ts';

interface ContactSettingsProps {
    currentContactInfo: ContactInfo;
    onUpdateContactInfo: (info: ContactInfo) => void;
}

const ContactSettings: React.FC<ContactSettingsProps> = ({ currentContactInfo, onUpdateContactInfo }) => {
    const [info, setInfo] = useState(currentContactInfo);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setInfo(currentContactInfo);
    }, [currentContactInfo]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);
        onUpdateContactInfo(info);
        setTimeout(() => {
            setIsSaving(false)
            alert("聯絡資訊已更新！");
        }, 1000); // Simulate save
    };
    
    const isUnchanged = JSON.stringify(info) === JSON.stringify(currentContactInfo);

    return (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md sticky top-8">
            <h3 className="text-xl font-semibold text-gray-900">聯絡資訊</h3>
            <p className="mt-1 text-sm text-gray-600">此資訊將會顯示在您商店的頁尾。</p>
            
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        電話號碼
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={info.phone}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        電子郵件
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={info.email}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                 <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        地址
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={info.address}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="facebookUrl" className="block text-sm font-medium text-gray-700">
                        Facebook 連結
                    </label>
                    <input
                        type="url"
                        id="facebookUrl"
                        name="facebookUrl"
                        value={info.facebookUrl}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                 <div>
                    <label htmlFor="instagramUrl" className="block text-sm font-medium text-gray-700">
                        Instagram 連結
                    </label>
                    <input
                        type="url"
                        id="instagramUrl"
                        name="instagramUrl"
                        value={info.instagramUrl}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
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

export default ContactSettings;