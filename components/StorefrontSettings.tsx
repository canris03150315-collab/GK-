import React, { useState, FormEvent, useEffect } from 'react';

interface StorefrontSettingsProps {
    currentShopName: string;
    onUpdateShopName: (name: string) => void;
}

const StorefrontSettings: React.FC<StorefrontSettingsProps> = ({ 
    currentShopName, 
    onUpdateShopName, 
}) => {
    const [shopName, setShopName] = useState(currentShopName);
    const [isSavingName, setIsSavingName] = useState(false);

    useEffect(() => {
        setShopName(currentShopName);
    }, [currentShopName]);

    const handleNameSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSavingName(true);
        onUpdateShopName(shopName);
        setTimeout(() => setIsSavingName(false), 1000); // Simulate save
    };

    return (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md sticky top-8 space-y-8">
            <h3 className="text-xl font-semibold text-gray-900">商店設定</h3>
            
            {/* Shop Name Form */}
            <form onSubmit={handleNameSubmit} className="space-y-4">
                <div>
                    <label htmlFor="shop-name" className="block text-sm font-medium text-gray-700">
                        商店名稱
                    </label>
                    <input
                        type="text"
                        id="shop-name"
                        value={shopName}
                        onChange={(e) => setShopName(e.target.value)}
                        className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSavingName || shopName === currentShopName}
                    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                    {isSavingName ? '儲存中...' : '儲存名稱'}
                </button>
            </form>
        </div>
    );
};

export default StorefrontSettings;