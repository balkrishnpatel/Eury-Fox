// import React, { useState } from 'react';
// import { Save, User, Bell, Shield, Globe, Palette } from 'lucide-react';

// const SettingsAdmin = () => {
//   const [activeTab, setActiveTab] = useState('profile');

//   const tabs = [
//     { id: 'profile', label: 'Profile', icon: User },
//     { id: 'notifications', label: 'Notifications', icon: Bell },
//     { id: 'security', label: 'Security', icon: Shield },
//     { id: 'general', label: 'General', icon: Globe },
//     { id: 'appearance', label: 'Appearance', icon: Palette },
//   ];

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'profile':
//         return (
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   defaultValue="Admin User"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   defaultValue="admin@euryfoxglobal.com"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Phone
//                 </label>
//                 <input
//                   type="tel"
//                   defaultValue="+91 98765 43210"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Role
//                 </label>
//                 <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500">
//                   <option>Administrator</option>
//                   <option>Manager</option>
//                   <option>Editor</option>
//                 </select>
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Bio
//               </label>
//               <textarea
//                 rows={4}
//                 defaultValue="Experienced administrator managing Eury Fox Global operations."
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//               />
//             </div>
//           </div>
//         );

//       case 'notifications':
//         return (
//           <div className="space-y-6">
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
//               <div className="space-y-3">
//                 {[
//                   { label: 'New Orders', desc: 'Get notified when new orders are placed' },
//                   { label: 'Low Stock Alerts', desc: 'Receive alerts when products are running low' },
//                   { label: 'Customer Messages', desc: 'Get notified about customer inquiries' },
//                   { label: 'Weekly Reports', desc: 'Receive weekly performance reports' }
//                 ].map((item, index) => (
//                   <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
//                     <div>
//                       <p className="font-medium text-gray-900">{item.label}</p>
//                       <p className="text-sm text-gray-500">{item.desc}</p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input type="checkbox" defaultChecked className="sr-only peer" />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         );

//       case 'security':
//         return (
//           <div className="space-y-6">
//             <div>
//               <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Current Password
//                   </label>
//                   <input
//                     type="password"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     New Password
//                   </label>
//                   <input
//                     type="password"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Confirm New Password
//                   </label>
//                   <input
//                     type="password"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
//               <div className="p-4 border border-gray-200 rounded-lg">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="font-medium text-gray-900">Enable 2FA</p>
//                     <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
//                   </div>
//                   <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
//                     Setup
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       case 'general':
//         return (
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Company Name
//                 </label>
//                 <input
//                   type="text"
//                   defaultValue="Eury Fox Global"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Website URL
//                 </label>
//                 <input
//                   type="url"
//                   defaultValue="https://eury-fox.vercel.app"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Time Zone
//                 </label>
//                 <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500">
//                   <option>Asia/Kolkata (UTC+05:30)</option>
//                   <option>UTC (UTC+00:00)</option>
//                   <option>America/New_York (UTC-05:00)</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Currency
//                 </label>
//                 <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500">
//                   <option>INR (₹)</option>
//                   <option>USD ($)</option>
//                   <option>EUR (€)</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         );

//       case 'appearance':
//         return (
//           <div className="space-y-6">
//             <div>
//               <h3 className="text-lg font-medium text-gray-900 mb-4">Theme</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <div className="p-4 border-2 border-purple-500 rounded-lg bg-purple-50">
//                   <div className="text-center">
//                     <div className="w-full h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded mb-2"></div>
//                     <p className="font-medium">Default</p>
//                   </div>
//                 </div>
//                 <div className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer">
//                   <div className="text-center">
//                     <div className="w-full h-20 bg-gray-800 rounded mb-2"></div>
//                     <p className="font-medium">Dark</p>
//                   </div>
//                 </div>
//                 <div className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer">
//                   <div className="text-center">
//                     <div className="w-full h-20 bg-white border rounded mb-2"></div>
//                     <p className="font-medium">Light</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 className="text-lg font-medium text-gray-900 mb-4">Color Scheme</h3>
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//                 {[
//                   { name: 'Purple', color: 'from-purple-500 to-blue-600' },
//                   { name: 'Green', color: 'from-green-500 to-emerald-600' },
//                   { name: 'Blue', color: 'from-blue-500 to-cyan-600' },
//                   { name: 'Orange', color: 'from-orange-500 to-red-600' }
//                 ].map((scheme, index) => (
//                   <div key={index} className={`p-3 rounded-lg cursor-pointer ${index === 0 ? 'ring-2 ring-purple-500' : 'hover:ring-2 hover:ring-gray-300'}`}>
//                     <div className={`w-full h-8 bg-gradient-to-r ${scheme.color} rounded mb-2`}></div>
//                     <p className="text-sm font-medium text-center">{scheme.name}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
//           <p className="text-gray-600 mt-1">Manage your account and application preferences</p>
//         </div>
//         <button className="mt-4 sm:mt-0 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2">
//           <Save className="w-4 h-4" />
//           <span>Save Changes</span>
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow-md">
//         <div className="border-b border-gray-200">
//           <nav className="-mb-px flex overflow-x-auto">
//             {tabs.map((tab) => {
//               const Icon = tab.icon;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm flex items-center space-x-2 ${
//                     activeTab === tab.id
//                       ? 'border-purple-500 text-purple-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   <Icon className="w-4 h-4" />
//                   <span>{tab.label}</span>
//                 </button>
//               );
//             })}
//           </nav>
//         </div>

//         <div className="p-6">
//           {renderTabContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SettingsAdmin;