import React, { useState, FormEvent, ChangeEvent, useMemo } from 'react';
import { Product, Category } from '../types';

interface AddProductFormProps {
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  categories: Category[];
  onProductAdded?: () => void;
}

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

// Helper to generate indented <option> elements for a select dropdown
const buildCategoryOptions = (
  categories: Category[],
  parentId: string | null = null,
  prefix = ''
): React.ReactElement[] => {
  return categories
    .filter((cat) => cat.parentId === parentId)
    .flatMap((cat) => {
      const currentOption = (
        <option key={cat.id} value={cat.id}>
          {prefix}
          {cat.name}
        </option>
      );
      const childOptions = buildCategoryOptions(categories, cat.id, prefix + '— ');
      return [currentOption, ...childOptions];
    });
};

const AddProductForm: React.FC<AddProductFormProps> = ({ onAddProduct, categories, onProductAdded }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const categoryOptions = useMemo(() => buildCategoryOptions(categories), [categories]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Revoke previous URL to prevent memory leaks
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageFile) {
        alert('請選擇一張商品圖片。');
        return;
    }
    setIsLoading(true);

    try {
        const imageUrl = await fileToBase64(imageFile);
        onAddProduct({
          name,
          price: parseFloat(price),
          description,
          imageUrl,
          categoryId: categoryId === 'null' ? null : categoryId
        });
        
        // Reset form
        setName('');
        setPrice('');
        setDescription('');
        setImageFile(null);
        setCategoryId(null);
        if (previewUrl && previewUrl.startsWith('blob:')) {
           URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(null);
        if (e.target instanceof HTMLFormElement) {
            e.target.reset();
        }
        onProductAdded?.(); // Notify parent component

    } catch (error) {
        console.error("Error creating product:", error);
        alert("無法建立商品，請再試一次。");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-900">新增商品</h3>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="product-name" className="block text-sm font-medium text-gray-700">
            商品名稱
          </label>
          <input
            type="text"
            id="product-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
            <label htmlFor="product-description" className="block text-sm font-medium text-gray-700">
                商品描述
            </label>
            <textarea
                id="product-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
            />
        </div>
        <div>
          <label htmlFor="product-price" className="block text-sm font-medium text-gray-700">
            價格 (NT$)
          </label>
          <input
            type="number"
            id="product-price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            min="0"
            step="0.01"
          />
        </div>
        <div>
            <label htmlFor="product-category" className="block text-sm font-medium text-gray-700">
                分類
            </label>
            <select
                id="product-category"
                value={categoryId ?? 'null'}
                onChange={(e) => setCategoryId(e.target.value === 'null' ? null : e.target.value)}
                className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
                <option value="null">未分類</option>
                {categoryOptions}
            </select>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">商品圖片</label>
            <div className="flex items-center justify-center w-full mt-1">
                <label htmlFor="product-image-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    {previewUrl ? (
                        <img src={previewUrl} alt="Product Preview" className="object-contain w-full h-full" />
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center">
                            <svg className="w-8 h-8 mb-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                            <p className="text-xs text-gray-500">點擊上傳</p>
                        </div>
                    )}
                    <input id="product-image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} required />
                </label>
            </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
        >
          {isLoading ? '新增中...' : '新增商品'}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;