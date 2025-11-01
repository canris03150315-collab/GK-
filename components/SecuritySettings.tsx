import React, { useState, FormEvent } from 'react';

interface SecuritySettingsProps {
    currentAdminPassword: string;
    onUpdateAdminPassword: (newPassword: string) => void;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ currentAdminPassword, onUpdateAdminPassword }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (currentPassword !== currentAdminPassword) {
            setError('目前的密碼不正確。');
            return;
        }

        if (newPassword.length < 4) {
            setError('新密碼必須至少為 4 個字元。');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('新密碼與確認密碼不符。');
            return;
        }
        
        setIsSaving(true);
        
        // Simulate save
        setTimeout(() => {
            onUpdateAdminPassword(newPassword);
            setSuccess('密碼已成功更新！');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setIsSaving(false);
        }, 1000);
    };

    return (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md sticky top-8">
            <h3 className="text-xl font-semibold text-gray-900">更改管理員密碼</h3>
            
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                        目前密碼
                    </label>
                    <input
                        type="password"
                        id="current-password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                        新密碼
                    </label>
                    <input
                        type="password"
                        id="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                 <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                        確認新密碼
                    </label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}
                {success && <p className="text-sm text-green-600">{success}</p>}

                <button
                    type="submit"
                    disabled={isSaving}
                    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                    {isSaving ? '儲存中...' : '更新密碼'}
                </button>
            </form>
        </div>
    );
};

export default SecuritySettings;