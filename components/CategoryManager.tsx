import React, { useState, useMemo } from 'react';
import { Category } from '../types';

interface CategoryManagerProps {
    categories: Category[];
    onAddCategory: (name: string, parentId: string | null) => void;
    onDeleteCategory: (id: string) => void;
    onUpdateCategory: (id: string, newName: string) => void;
}

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

// A recursive component to display a category and its children
const CategoryItem: React.FC<{
  category: Category;
  allCategories: Category[];
  onEdit: (id: string, currentName: string) => void;
  onDelete: (id: string, name: string) => void;
}> = ({ category, allCategories, onEdit, onDelete }) => {
  const children = allCategories.filter((c) => c.parentId === category.id);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
        <span className="text-sm text-gray-800">{category.name}</span>
        <div className="space-x-2">
          <button onClick={() => onEdit(category.id, category.name)} className="text-sm text-indigo-600 hover:text-indigo-800">
            編輯
          </button>
          <button onClick={() => onDelete(category.id, category.name)} className="text-sm text-red-600 hover:text-red-800">
            刪除
          </button>
        </div>
      </div>
      {children.length > 0 && (
        <div className="pl-4 border-l-2 border-gray-200 space-y-2">
          {children.map((child) => (
            <CategoryItem key={child.id} category={child} allCategories={allCategories} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

const CategoryManager: React.FC<CategoryManagerProps> = ({ categories, onAddCategory, onDeleteCategory, onUpdateCategory }) => {
    const [newCategoryName, setNewCategoryName] = useState('');
    const [parentId, setParentId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const categoryOptions = useMemo(() => buildCategoryOptions(categories), [categories]);
    const topLevelCategories = useMemo(() => categories.filter((c) => c.parentId === null), [categories]);

    const handleAddSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;
        
        setIsLoading(true);
        onAddCategory(newCategoryName, parentId);
        setNewCategoryName('');
        setParentId(null);
        setTimeout(() => setIsLoading(false), 500);
    }
    
    const handleEdit = (id: string, currentName: string) => {
        const newName = prompt('輸入新的分類名稱：', currentName);
        if (newName && newName.trim() && newName.trim() !== currentName) {
            onUpdateCategory(id, newName.trim());
        }
    }

    const handleDelete = (id: string, name: string) => {
        if (window.confirm(`您確定要刪除分類 "${name}" 嗎？這將會一併刪除其所有子分類，並將相關商品的分類設為「未分類」。`)) {
            onDeleteCategory(id);
        }
    }

    return (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md sticky top-8">
            <h3 className="text-xl font-semibold text-gray-900">分類管理</h3>
            <form onSubmit={handleAddSubmit} className="mt-6 space-y-4">
                 <div>
                    <label htmlFor="category-name" className="block text-sm font-medium text-gray-700">
                        分類名稱
                    </label>
                    <input
                        type="text"
                        id="category-name"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="例如：七龍珠"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="parent-category" className="block text-sm font-medium text-gray-700">
                        上層分類
                    </label>
                    <select
                        id="parent-category"
                        value={parentId ?? 'null'}
                        onChange={(e) => setParentId(e.target.value === 'null' ? null : e.target.value)}
                        className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="null">無 (頂層分類)</option>
                        {categoryOptions}
                    </select>
                </div>
                <button
                    type="submit"
                    disabled={isLoading || !newCategoryName.trim()}
                    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                >
                    {isLoading ? '新增中...' : '新增分類'}
                </button>
            </form>

            <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-500">現有分類</h4>
                <div className="mt-2 space-y-2">
                    {topLevelCategories.map(cat => (
                        <CategoryItem 
                            key={cat.id} 
                            category={cat} 
                            allCategories={categories}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                    {categories.length === 0 && (
                        <p className="text-sm text-gray-400">尚無分類。</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryManager;