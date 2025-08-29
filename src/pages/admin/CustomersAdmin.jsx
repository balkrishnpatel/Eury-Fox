// import React, { useState } from 'react';
// import { Search, Filter, Eye, Mail, Phone, MapPin } from 'lucide-react';

// const CustomersAdmin = () => {
//   const [customers, setCustomers] = useState([
//     {
//       id: 1,
//       name: 'John Smith',
//       email: 'john@example.com',
//       phone: '+91 98765 43210',
//       location: 'Mumbai, India',
//       orders: 5,
//       totalSpent: 12500,
//       joinDate: '2024-01-15',
//       status: 'Active'
//     },
//     {
//       id: 2,
//       name: 'Sarah Johnson',
//       email: 'sarah@example.com',
//       phone: '+91 98765 43211',
//       location: 'Delhi, India',
//       orders: 12,
//       totalSpent: 28900,
//       joinDate: '2023-11-20',
//       status: 'Active'
//     },
//     {
//       id: 3,
//       name: 'Mike Brown',
//       email: 'mike@example.com',
//       phone: '+91 98765 43212',
//       location: 'Bangalore, India',
//       orders: 8,
//       totalSpent: 19800,
//       joinDate: '2024-03-10',
//       status: 'Active'
//     },
//     {
//       id: 4,
//       name: 'Emily Davis',
//       email: 'emily@example.com',
//       phone: '+91 98765 43213',
//       location: 'Chennai, India',
//       orders: 3,
//       totalSpent: 7500,
//       joinDate: '2024-06-05',
//       status: 'Inactive'
//     }
//   ]);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');

//   const statusOptions = ['All', 'Active', 'Inactive'];

//   const filteredCustomers = customers.filter(customer => {
//     const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          customer.email.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === 'All' || customer.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Active': return 'bg-green-100 text-green-800';
//       case 'Inactive': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
//           <p className="text-gray-600 mt-1">Manage your customer relationships</p>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Total Customers</p>
//               <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
//             </div>
//             <div className="p-3 rounded-lg bg-blue-100">
//               <Search className="w-6 h-6 text-blue-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Active</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {customers.filter(c => c.status === 'Active').length}
//               </p>
//             </div>
//             <div className="p-3 rounded-lg bg-green-100">
//               <Eye className="w-6 h-6 text-green-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Total Orders</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {customers.reduce((sum, customer) => sum + customer.orders, 0)}
//               </p>
//             </div>
//             <div className="p-3 rounded-lg bg-purple-100">
//               <Mail className="w-6 h-6 text-purple-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Total Revenue</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 ₹{customers.reduce((sum, customer) => sum + customer.totalSpent, 0).toLocaleString()}
//               </p>
//             </div>
//             <div className="p-3 rounded-lg bg-orange-100">
//               <Phone className="w-6 h-6 text-orange-600" />
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
//               placeholder="Search customers..."
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

//       {/* Customers Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredCustomers.map(customer => (
//           <div key={customer.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center space-x-3">
//                 <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
//                   <span className="text-white font-semibold text-lg">
//                     {customer.name.charAt(0)}
//                   </span>
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-900">{customer.name}</h3>
//                   <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
//                     {customer.status}
//                   </span>
//                 </div>
//               </div>
//               <button className="text-purple-600 hover:text-purple-800 transition-colors">
//                 <Eye className="w-5 h-5" />
//               </button>
//             </div>

//             <div className="space-y-3">
//               <div className="flex items-center space-x-3 text-sm text-gray-600">
//                 <Mail className="w-4 h-4" />
//                 <span>{customer.email}</span>
//               </div>
//               <div className="flex items-center space-x-3 text-sm text-gray-600">
//                 <Phone className="w-4 h-4" />
//                 <span>{customer.phone}</span>
//               </div>
//               <div className="flex items-center space-x-3 text-sm text-gray-600">
//                 <MapPin className="w-4 h-4" />
//                 <span>{customer.location}</span>
//               </div>
//             </div>

//             <div className="mt-4 pt-4 border-t border-gray-200">
//               <div className="grid grid-cols-2 gap-4 text-center">
//                 <div>
//                   <p className="text-2xl font-bold text-gray-900">{customer.orders}</p>
//                   <p className="text-xs text-gray-500">Orders</p>
//                 </div>
//                 <div>
//                   <p className="text-2xl font-bold text-purple-600">₹{customer.totalSpent.toLocaleString()}</p>
//                   <p className="text-xs text-gray-500">Total Spent</p>
//                 </div>
//               </div>
//               <p className="text-xs text-gray-500 text-center mt-2">
//                 Joined {new Date(customer.joinDate).toLocaleDateString()}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CustomersAdmin;