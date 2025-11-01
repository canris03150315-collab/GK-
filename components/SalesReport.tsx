import React from 'react';
import { Order, Product } from '../types';

interface SalesReportProps {
  orders: Order[];
  products: Product[];
}

// FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const StatCard: React.FC<{ title: string; value: string | number, icon: React.ReactElement }> = ({ title, value, icon }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="text-3xl font-semibold text-gray-900">{value}</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
);

const SalesReport: React.FC<SalesReportProps> = ({ orders, products }) => {
    // --- Calculations ---
    const validOrders = orders.filter(o => o.status !== '已取消');

    const totalRevenue = validOrders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const totalProductsSold = validOrders.reduce((sum, order) => 
        sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);

    const productSales = validOrders.flatMap(o => o.items).reduce((acc, item) => {
        acc[item.productId] = (acc[item.productId] || 0) + item.quantity;
        return acc;
    }, {} as Record<string, number>);

    const topSellingProducts = Object.entries(productSales)
        .map(([productId, quantity]) => {
            const product = products.find(p => p.id === productId);
            return {
                name: product?.name || '未知商品',
                quantity,
            };
        })
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5);
    
    // --- CSV Download ---
    const downloadReport = () => {
        const headers = ["訂單ID", "日期", "顧客姓名", "總金額", "狀態", "商品列表"];
        
        const rows = orders.map(order => {
            const productList = order.items.map(item => {
                const product = products.find(p => p.id === item.productId);
                return `${product ? product.name : 'N/A'} x${item.quantity}`;
            }).join('; ');
            
            return [
                order.id,
                new Date(order.createdAt).toLocaleString('zh-TW'),
                order.customerInfo.name,
                order.total,
                order.status,
                `"${productList}"` // Enclose in quotes to handle commas
            ].join(',');
        });

        const csvContent = "data:text/csv;charset=utf-8," 
            + "\uFEFF" // BOM for Excel to recognize UTF-8
            + headers.join(',') + "\n" + rows.join('\n');
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `sales_report_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

  return (
    <div>
        <div className="flex justify-between items-center">
             <h2 className="text-2xl font-bold tracking-tight text-gray-900">銷售總覽</h2>
             <button
                onClick={downloadReport}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                下載報表 (CSV)
            </button>
        </div>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
         <StatCard 
            title="總收入 (NT$)" 
            value={totalRevenue.toLocaleString()} 
            icon={<svg className="h-8 w-8 text-white bg-green-500 rounded-lg p-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>}
        />
         <StatCard 
            title="總訂單數" 
            value={totalOrders}
            icon={<svg className="h-8 w-8 text-white bg-blue-500 rounded-lg p-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
        />
         <StatCard 
            title="總銷售商品件數" 
            value={totalProductsSold}
            icon={<svg className="h-8 w-8 text-white bg-purple-500 rounded-lg p-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
        />
      </div>

      {/* Top Selling Products */}
       <div className="mt-8">
            <h3 className="text-lg font-medium leading-6 text-gray-900">熱銷商品排行榜</h3>
            <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                    {topSellingProducts.map((product, index) => (
                    <li key={index}>
                        <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-indigo-600 truncate">{product.name}</p>
                            <div className="ml-2 flex-shrink-0 flex">
                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                已售出 {product.quantity} 件
                            </p>
                            </div>
                        </div>
                        </div>
                    </li>
                    ))}
                     {topSellingProducts.length === 0 && (
                        <li className="px-4 py-4 sm:px-6 text-sm text-gray-500">
                            尚無銷售紀錄。
                        </li>
                    )}
                </ul>
            </div>
      </div>
    </div>
  );
};

export default SalesReport;
