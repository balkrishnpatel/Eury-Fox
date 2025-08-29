// import React, { useState } from 'react';
// import { Search, Filter, Eye, Truck, Check, X } from 'lucide-react';

// const OrdersAdmin = () => {
//   const [orders, setOrders] = useState([
//     {
//       id: 1001,
//       customer: 'John Smith',
//       email: 'john@example.com',
//       date: '2025-01-15',
//       amount: 2599,
//       status: 'Pending',
//       items: 3,
//       address: '123 Main St, New York, NY 10001'
//     },
//     {
//       id: 1002,
//       customer: 'Sarah Johnson',
//       email: 'sarah@example.com',
//       date: '2025-01-14',
//       amount: 1899,
//       status: 'Shipped',
//       items: 2,
//       address: '456 Oak Ave, Los Angeles, CA 90210'
//     },
//     {
//       id: 1003,
//       customer: 'Mike Brown',
//       email: 'mike@example.com',
//       date: '2025-01-13',
//       amount: 3299,
//       status: 'Delivered',
//       items: 4,
//       address: '789 Pine St, Chicago, IL 60601'
//     },
//     {
//       id: 1004,
//       customer: 'Emily Davis',
//       email: 'emily@example.com',
//       date: '2025-01-12',
//       amount: 1599,
//       status: 'Processing',
//       items: 1,
//       address: '321 Elm St, Houston, TX 77001'
//     }
//   ]);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');

//   const statusOptions = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

//   const filteredOrders = orders.filter(order => {
//     const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          order.id.toString().includes(searchTerm);
//     const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const updateOrderStatus = (orderId, newStatus) => {
//     setOrders(orders.map(order => 
//       order.id === orderId ? { ...order, status: newStatus } : order
//     ));
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Pending': return 'bg-yellow-100 text-yellow-800';
//       case 'Processing': return 'bg-blue-100 text-blue-800';
//       case 'Shipped': return 'bg-purple-100 text-purple-800';
//       case 'Delivered': return 'bg-green-100 text-green-800';
//       case 'Cancelled': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
//           <p className="text-gray-600 mt-1">Track and manage customer orders</p>
//         </div>
//         <div className="mt-4 sm:mt-0 flex space-x-3">
//           <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center space-x-2">
//             <Check className="w-4 h-4" />
//             <span>Export</span>
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Total Orders</p>
//               <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
//             </div>
//             <div className="p-3 rounded-lg bg-blue-100">
//               <Search className="w-6 h-6 text-blue-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Pending</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {orders.filter(o => o.status === 'Pending').length}
//               </p>
//             </div>
//             <div className="p-3 rounded-lg bg-yellow-100">
//               <Filter className="w-6 h-6 text-yellow-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Shipped</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {orders.filter(o => o.status === 'Shipped').length}
//               </p>
//             </div>
//             <div className="p-3 rounded-lg bg-purple-100">
//               <Truck className="w-6 h-6 text-purple-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Revenue</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 ₹{orders.reduce((sum, order) => sum + order.amount, 0).toLocaleString()}
//               </p>
//             </div>
//             <div className="p-3 rounded-lg bg-green-100">
//               <Check className="w-6 h-6 text-green-600" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
//           <div className="relative flex-1 max-w-md">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search orders..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//             />
//           </div>

//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2">
//               <Filter className="w-4 h-4 text-gray-400" />
//               <span className="text-sm text-gray-600">Status:</span>
//             </div>
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//             >
//               {statusOptions.map(status => (
//                 <option key={status} value={status}>{status}</option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Orders Table */}
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Order ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Customer
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Amount
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredOrders.map(order => (
//                 <tr key={order.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     #{order.id}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div>
//                       <div className="text-sm font-medium text-gray-900">{order.customer}</div>
//                       <div className="text-sm text-gray-500">{order.email}</div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {order.date}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
//                     ₹{order.amount.toLocaleString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
//                       {order.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
//                     <button className="text-purple-600 hover:text-purple-900">
//                       <Eye className="w-4 h-4" />
//                     </button>
//                     {order.status === 'Pending' && (
//                       <button
//                         onClick={() => updateOrderStatus(order.id, 'Processing')}
//                         className="text-blue-600 hover:text-blue-900"
//                       >
//                         <Check className="w-4 h-4" />
//                       </button>
//                     )}
//                     {order.status === 'Processing' && (
//                       <button
//                         onClick={() => updateOrderStatus(order.id, 'Shipped')}
//                         className="text-green-600 hover:text-green-900"
//                       >
//                         <Truck className="w-4 h-4" />
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrdersAdmin;