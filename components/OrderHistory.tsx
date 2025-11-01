
import React, { useState } from 'react';
import { Order, Product, OrderStatus } from '../types.ts';

interface OrderHistoryProps {
  orders: Order[];
  products: Product[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
}

const ORDER_STATUSES: OrderStatus[] = ['待處理', '處理中', '已出貨', '已取消'];

const getStatusColor = (status: OrderStatus) => {
    switch(status) {
        case '待處理': return 'bg-yellow-100 text-yellow-800';
        case '處理中': return 'bg-blue-100 text-blue-800';
        case '已出貨': return 'bg-green-100 text-green-800';
        case '已取消': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders, products, onUpdateOrderStatus }) => {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrderId(prevId => prevId === orderId ? null : orderId);
  };

  const getProductById = (id: string) => products.find(p => p.id === id);

  if (orders.length === 0) {
    return (
      <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">沒有訂單</h3>
        <p className="mt-1 text-sm text-gray-500">目前還沒有任何顧客下單。</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map(order => (
        <div key={order.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="px-4 py-5 sm:px-6 cursor-pointer bg-gray-50 hover:bg-gray-100" onClick={() => toggleOrderDetails(order.id)}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  訂單 #{order.id.replace('order-', '')}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString('zh-TW')}
                </p>
              </div>
              <div className="flex items-center gap-4">
                 <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                </span>
                <div className="text-right">
                    <p className="text-lg font-semibold text-indigo-600">NT$ {order.total.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{order.customerInfo.name}</p>
                </div>
              </div>
            </div>
          </div>
          {expandedOrderId === order.id && (
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">顧客姓名</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.customerInfo.name}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">電子郵件</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.customerInfo.email}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">電話</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.customerInfo.phone}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">運送地址</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.customerInfo.address}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">訂單商品</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                      {order.items.map(item => {
                        const product = getProductById(item.productId);
                        return (
                          <li key={item.productId} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                            <div className="w-0 flex-1 flex items-center">
                              <span className="ml-2 flex-1 w-0 truncate">
                                {product ? product.name : `商品ID: ${item.productId}`} (x{item.quantity})
                              </span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                                {product ? `NT$ ${(product.price * item.quantity).toLocaleString()}`: ''}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">更新狀態</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <select
                            value={order.status}
                            onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                            className="block w-full max-w-xs pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            {ORDER_STATUSES.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;