


// import React, { useState } from 'react';
// import { Save, Phone, Mail, MapPin, Clock, Edit, Plus, Trash2 } from 'lucide-react';

// const ContactAdmin = () => {
//   const [contactInfo, setContactInfo] = useState({
//     mobileNumber: "+91 98765 43210",
//     infoEmail: "info@euryfoxglobal.com",
//     salesEmail: "sales@euryfoxglobal.com",
//     supportEmail: "support@euryfoxglobal.com",
//     officeAddress: "123 Global Trade Center\nBusiness District, Mumbai 400001\nMaharashtra, India",
//     additionalMobileNumber: "+91 22 1234 5678",
//     tollFreeNumber: "1800 123 4567",
//     additionalPhoneNumbers: [
//       "+91 98765 43211"
//     ],
//     additionalEmailAddresses: [
//       "marketing@euryfoxglobal.com"
//     ],
//     businessHours: {
//       monday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
//       tuesday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
//       wednesday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
//       thursday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
//       friday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
//       saturday: { isOpen: true, openTime: "10:00", closeTime: "16:00" },
//       sunday: { isOpen: false, openTime: "10:00", closeTime: "16:00" }
//     },
//     location: {
//       latitude: 28.4595,
//       longitude: 77.0266
//     }
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [editData, setEditData] = useState({});

//   const handleEdit = () => {
//     setEditData({ ...contactInfo });
//     setIsEditing(true);
//   };

//   const handleSave = () => {
//     setContactInfo(editData);
//     setIsEditing(false);
//     alert('Contact information updated successfully!');
//   };

//   const handleCancel = () => {
//     setEditData({});
//     setIsEditing(false);
//   };

//   const handleDelete = () => {
//     if (window.confirm('Are you sure you want to delete all contact information? This action cannot be undone.')) {
//       setContactInfo({
//         mobileNumber: "",
//         infoEmail: "",
//         salesEmail: "",
//         supportEmail: "",
//         officeAddress: "",
//         additionalMobileNumber: "",
//         tollFreeNumber: "",
//         additionalPhoneNumbers: [],
//         additionalEmailAddresses: [],
//         businessHours: {
//           monday: { isOpen: false, openTime: "09:00", closeTime: "18:00" },
//           tuesday: { isOpen: false, openTime: "09:00", closeTime: "18:00" },
//           wednesday: { isOpen: false, openTime: "09:00", closeTime: "18:00" },
//           thursday: { isOpen: false, openTime: "09:00", closeTime: "18:00" },
//           friday: { isOpen: false, openTime: "09:00", closeTime: "18:00" },
//           saturday: { isOpen: false, openTime: "09:00", closeTime: "18:00" },
//           sunday: { isOpen: false, openTime: "09:00", closeTime: "18:00" }
//         },
//         location: {
//           latitude: 0,
//           longitude: 0
//         }
//       });
//       alert('Contact information deleted successfully!');
//     }
//   };

//   const handleChange = (field, value) => {
//     setEditData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleBusinessHourChange = (day, field, value) => {
//     setEditData(prev => ({
//       ...prev,
//       businessHours: {
//         ...prev.businessHours,
//         [day]: {
//           ...prev.businessHours[day],
//           [field]: value
//         }
//       }
//     }));
//   };

//   const addAdditionalPhone = () => {
//     setEditData(prev => ({
//       ...prev,
//       additionalPhoneNumbers: [...prev.additionalPhoneNumbers, '']
//     }));
//   };

//   const removeAdditionalPhone = (index) => {
//     setEditData(prev => ({
//       ...prev,
//       additionalPhoneNumbers: prev.additionalPhoneNumbers.filter((_, i) => i !== index)
//     }));
//   };

//   const handleAdditionalPhoneChange = (index, value) => {
//     setEditData(prev => ({
//       ...prev,
//       additionalPhoneNumbers: prev.additionalPhoneNumbers.map((phone, i) => 
//         i === index ? value : phone
//       )
//     }));
//   };

//   const addAdditionalEmail = () => {
//     setEditData(prev => ({
//       ...prev,
//       additionalEmailAddresses: [...prev.additionalEmailAddresses, '']
//     }));
//   };

//   const removeAdditionalEmail = (index) => {
//     setEditData(prev => ({
//       ...prev,
//       additionalEmailAddresses: prev.additionalEmailAddresses.filter((_, i) => i !== index)
//     }));
//   };

//   const handleAdditionalEmailChange = (index, value) => {
//     setEditData(prev => ({
//       ...prev,
//       additionalEmailAddresses: prev.additionalEmailAddresses.map((email, i) => 
//         i === index ? value : email
//       )
//     }));
//   };

//   const currentData = isEditing ? editData : contactInfo;
//   const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Contact Information</h1>
//           <p className="text-gray-600 mt-1">Manage your business contact details</p>
//         </div>
//         <div className="flex items-center space-x-3 mt-4 sm:mt-0">
//           {isEditing ? (
//             <>
//               <button
//                 onClick={handleCancel}
//                 className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
//               >
//                 <Save className="w-4 h-4" />
//                 <span>Save Changes</span>
//               </button>
//             </>
//           ) : (
//             <>
//               <button
//                 onClick={handleDelete}
//                 className="px-4 py-2 text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors flex items-center space-x-2"
//               >
//                 <Trash2 className="w-4 h-4" />
//                 <span>Delete All</span>
//               </button>
//               <button
//                 onClick={handleEdit}
//                 className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
//               >
//                 <Edit className="w-4 h-4" />
//                 <span>Edit Contact Info</span>
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Contact Information Cards */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Primary Contact Details */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center space-x-3 mb-4">
//             <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
//               <Phone className="w-5 h-5 text-purple-600" />
//             </div>
//             <h2 className="text-xl font-semibold text-gray-900">Primary Contact</h2>
//           </div>

//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Mobile Number
//               </label>
//               {isEditing ? (
//                 <input
//                   type="tel"
//                   value={currentData.mobileNumber || ''}
//                   onChange={(e) => handleChange('mobileNumber', e.target.value)}
//                   placeholder="Enter mobile number"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                 />
//               ) : (
//                 <p className="text-gray-600">{currentData.mobileNumber || 'Not provided'}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Info Email
//               </label>
//               {isEditing ? (
//                 <input
//                   type="email"
//                   value={currentData.infoEmail || ''}
//                   onChange={(e) => handleChange('infoEmail', e.target.value)}
//                   placeholder="Enter info email"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                 />
//               ) : (
//                 <p className="text-gray-600">{currentData.infoEmail || 'Not provided'}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Sales Email
//               </label>
//               {isEditing ? (
//                 <input
//                   type="email"
//                   value={currentData.salesEmail || ''}
//                   onChange={(e) => handleChange('salesEmail', e.target.value)}
//                   placeholder="Enter sales email"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                 />
//               ) : (
//                 <p className="text-gray-600">{currentData.salesEmail || 'Not provided'}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Support Email
//               </label>
//               {isEditing ? (
//                 <input
//                   type="email"
//                   value={currentData.supportEmail || ''}
//                   onChange={(e) => handleChange('supportEmail', e.target.value)}
//                   placeholder="Enter support email"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                 />
//               ) : (
//                 <p className="text-gray-600">{currentData.supportEmail || 'Not provided'}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Office Address */}
//         {/* <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center space-x-3 mb-4">
//             <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//               <MapPin className="w-5 h-5 text-blue-600" />
//             </div>
//             <h2 className="text-xl font-semibold text-gray-900">Office Address</h2>
//           </div>

//           <div className="space-y-4"> */}
//             {/* <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Address
//               </label>
//               {isEditing ? (
//                 <textarea
//                   value={currentData.officeAddress || ''}
//                   onChange={(e) => handleChange('officeAddress', e.target.value)}
//                   placeholder="Enter office address (use new lines to separate address parts)"
//                   rows={4}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                 />
//               ) : (
//                 <div className="text-gray-600">
//                   {currentData.officeAddress ? 
//                     currentData.officeAddress.split('\n').map((line, index) => (
//                       <p key={index}>{line}</p>
//                     )) : 
//                     'Not provided'
//                   }
//                 </div>
//               )}
//             </div> */}


//             {/* Office Address */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center space-x-3 mb-4">
//             <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//               <MapPin className="w-5 h-5 text-blue-600" />
//             </div>
//             <h2 className="text-xl font-semibold text-gray-900">Office Address</h2>
//           </div>

//           <div className="space-y-4">
//             {/* Street Address Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Street Address
//               </label>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   value={currentData.streetAddress || ''}
//                   onChange={(e) => handleChange('streetAddress', e.target.value)}
//                   placeholder="Enter street address"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                 />
//               ) : (
//                 <p className="text-gray-600">{currentData.streetAddress || 'Not provided'}</p>
//               )}
//             </div>

//             {/* City and Postal Code Fields */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   City
//                 </label>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     value={currentData.city || ''}
//                     onChange={(e) => handleChange('city', e.target.value)}
//                     placeholder="Enter city"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                   />
//                 ) : (
//                   <p className="text-gray-600">{currentData.city || 'Not provided'}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Postal Code
//                 </label>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     value={currentData.postalCode || ''}
//                     onChange={(e) => handleChange('postalCode', e.target.value)}
//                     placeholder="Enter postal code"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                   />
//                 ) : (
//                   <p className="text-gray-600">{currentData.postalCode || 'Not provided'}</p>
//                 )}
//               </div>
//             </div>

//             {/* Location Coordinates continue... */}

//             {/* Location Coordinates */}
//             <div className="pt-4 border-t border-gray-200">
//               <h3 className="text-sm font-medium text-gray-700 mb-2">Location Coordinates</h3>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs text-gray-500 mb-1">Latitude</label>
//                   {isEditing ? (
//                     <input
//                       type="number"
//                       step="any"
//                       value={currentData.location?.latitude || ''}
//                       onChange={(e) => handleChange('location', { 
//                         ...currentData.location, 
//                         latitude: parseFloat(e.target.value) || 0
//                       })}
//                       placeholder="Enter latitude"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                     />
//                   ) : (
//                     <p className="text-gray-600">{currentData.location?.latitude || 'Not provided'}</p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-xs text-gray-500 mb-1">Longitude</label>
//                   {isEditing ? (
//                     <input
//                       type="number"
//                       step="any"
//                       value={currentData.location?.longitude || ''}
//                       onChange={(e) => handleChange('location', { 
//                         ...currentData.location, 
//                         longitude: parseFloat(e.target.value) || 0
//                       })}
//                       placeholder="Enter longitude"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                     />
//                   ) : (
//                     <p className="text-gray-600">{currentData.location?.longitude || 'Not provided'}</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Additional Phone Numbers */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center space-x-3 mb-4">
//             <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
//               <Phone className="w-5 h-5 text-green-600" />
//             </div>
//             <h2 className="text-xl font-semibold text-gray-900">Additional Phone Numbers</h2>
//           </div>

//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Additional Mobile Number
//               </label>
//               {isEditing ? (
//                 <input
//                   type="tel"
//                   value={currentData.additionalMobileNumber || ''}
//                   onChange={(e) => handleChange('additionalMobileNumber', e.target.value)}
//                   placeholder="Enter additional mobile number"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                 />
//               ) : (
//                 <p className="text-gray-600">{currentData.additionalMobileNumber || 'Not provided'}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Toll Free Number
//               </label>
//               {isEditing ? (
//                 <input
//                   type="tel"
//                   value={currentData.tollFreeNumber || ''}
//                   onChange={(e) => handleChange('tollFreeNumber', e.target.value)}
//                   placeholder="Enter toll free number"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                 />
//               ) : (
//                 <p className="text-gray-600">{currentData.tollFreeNumber || 'Not provided'}</p>
//               )}
//             </div>

//             {/* Additional Phone Numbers */}
//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Other Phone Numbers
//                 </label>
//                 {isEditing && (
//                   <button
//                     onClick={addAdditionalPhone}
//                     className="text-purple-600 hover:text-purple-800 transition-colors flex items-center space-x-1"
//                   >
//                     <Plus className="w-4 h-4" />
//                     <span className="text-sm">Add</span>
//                   </button>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 {currentData.additionalPhoneNumbers?.map((phone, index) => (
//                   <div key={index} className="flex items-center space-x-2">
//                     {isEditing ? (
//                       <>
//                         <input
//                           type="tel"
//                           value={phone}
//                           onChange={(e) => handleAdditionalPhoneChange(index, e.target.value)}
//                           placeholder="Enter phone number"
//                           className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                         />
//                         <button
//                           onClick={() => removeAdditionalPhone(index)}
//                           className="text-red-600 hover:text-red-800 transition-colors"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </>
//                     ) : (
//                       <p className="text-gray-600">{phone || 'Not provided'}</p>
//                     )}
//                   </div>
//                 ))}
//                 {(!currentData.additionalPhoneNumbers || currentData.additionalPhoneNumbers.length === 0) && !isEditing && (
//                   <p className="text-gray-600">No additional phone numbers</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Additional Email Addresses */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
//                 <Mail className="w-5 h-5 text-orange-600" />
//               </div>
//               <h2 className="text-xl font-semibold text-gray-900">Additional Email Addresses</h2>
//             </div>
//             {isEditing && (
//               <button
//                 onClick={addAdditionalEmail}
//                 className="text-purple-600 hover:text-purple-800 transition-colors flex items-center space-x-1"
//               >
//                 <Plus className="w-4 h-4" />
//                 <span className="text-sm">Add</span>
//               </button>
//             )}
//           </div>

//           <div className="space-y-2">
//             {currentData.additionalEmailAddresses?.map((email, index) => (
//               <div key={index} className="flex items-center space-x-2">
//                 {isEditing ? (
//                   <>
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => handleAdditionalEmailChange(index, e.target.value)}
//                       placeholder="Enter email address"
//                       className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                     />
//                     <button
//                       onClick={() => removeAdditionalEmail(index)}
//                       className="text-red-600 hover:text-red-800 transition-colors"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </>
//                 ) : (
//                   <p className="text-gray-600">{email || 'Not provided'}</p>
//                 )}
//               </div>
//             ))}
//             {(!currentData.additionalEmailAddresses || currentData.additionalEmailAddresses.length === 0) && !isEditing && (
//               <p className="text-gray-600">No additional email addresses</p>
//             )}
//           </div>
//         </div>


//         {/* Business Hours */}
//         <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
//           <div className="flex items-center space-x-3 mb-4">
//             <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
//               <Clock className="w-5 h-5 text-indigo-600" />
//             </div>
//             <h2 className="text-xl font-semibold text-gray-900">Business Hours</h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
//             {dayNames.map((day) => (
//               <div key={day} className="border border-gray-200 rounded-lg p-3">
//                 <div className="flex items-center justify-between mb-2">
//                   <h3 className="text-sm font-medium text-gray-900 capitalize">{day.slice(0,3)}</h3>
//                   {isEditing ? (
//                     <input
//                       type="checkbox"
//                       checked={currentData.businessHours?.[day]?.isOpen || false}
//                       onChange={(e) => handleBusinessHourChange(day, 'isOpen', e.target.checked)}
//                       className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//                     />
//                   ) : (
//                     <span className={`text-xs font-medium ${
//                       currentData.businessHours?.[day]?.isOpen ? 'text-green-600' : 'text-red-600'
//                     }`}>
//                       {currentData.businessHours?.[day]?.isOpen ? 'Open' : 'Closed'}
//                     </span>
//                   )}
//                 </div>
                
//                 {currentData.businessHours?.[day]?.isOpen && (
//                   <div className="space-y-1">
//                     {isEditing ? (
//                       <>
//                         <input
//                           type="time"
//                           value={currentData.businessHours?.[day]?.openTime || '09:00'}
//                           onChange={(e) => handleBusinessHourChange(day, 'openTime', e.target.value)}
//                           className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                         />
//                         <input
//                           type="time"
//                           value={currentData.businessHours?.[day]?.closeTime || '18:00'}
//                           onChange={(e) => handleBusinessHourChange(day, 'closeTime', e.target.value)}
//                           className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                         />
//                       </>
//                     ) : (
//                       <div className="text-xs text-gray-600">
//                         <div>{currentData.businessHours?.[day]?.openTime || '09:00'}</div>
//                         <div>to</div>
//                         <div>{currentData.businessHours?.[day]?.closeTime || '18:00'}</div>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactAdmin;























// import React, { useState } from 'react';
// import { Save, Phone, Mail, MapPin, Clock, Edit, Plus, Trash2 } from 'lucide-react';

// const ContactAdmin = () => {
//   const [contactInfo, setContactInfo] = useState({
//     mobileNumber: "+91 98765 43210",
//     infoEmail: "info@euryfoxglobal.com",
//     salesEmail: "sales@euryfoxglobal.com",
//     supportEmail: "support@euryfoxglobal.com",
//     streetAddress: "123 Global Trade Center",
//     city: "Mumbai",
//     postalCode: "400001",
//     additionalMobileNumber: "+91 22 1234 5678",
//     tollFreeNumber: "1800 123 4567",
//     additionalPhoneNumbers: [
//       "+91 98765 43211"
//     ],
//     additionalEmailAddresses: [
//       "marketing@euryfoxglobal.com"
//     ],
//     businessHours: {
//       monday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
//       tuesday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
//       wednesday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
//       thursday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
//       friday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
//       saturday: { isOpen: true, openTime: "10:00", closeTime: "16:00" },
//       sunday: { isOpen: false, openTime: "10:00", closeTime: "16:00" }
//     },
//     location: {
//       latitude: 28.4595,
//       longitude: 77.0266
//     }
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [editData, setEditData] = useState({});

//   const handleEdit = () => {
//     setEditData({ ...contactInfo });
//     setIsEditing(true);
//   };

//   const handleSave = () => {
//     setContactInfo(editData);
//     setIsEditing(false);
//     alert('Contact information updated successfully!');
//   };

//   const handleCancel = () => {
//     setEditData({});
//     setIsEditing(false);
//   };

//   const handleDelete = () => {
//     if (window.confirm('Are you sure you want to delete all contact information? This action cannot be undone.')) {
//       setContactInfo({
//         mobileNumber: "",
//         infoEmail: "",
//         salesEmail: "",
//         supportEmail: "",
//         streetAddress: "",
//         city: "",
//         postalCode: "",
//         additionalMobileNumber: "",
//         tollFreeNumber: "",
//         additionalPhoneNumbers: [],
//         additionalEmailAddresses: [],
//         businessHours: {
//           monday: { isOpen: false, openTime: "09:00", closeTime: "18:00" },
//           tuesday: { isOpen: false, openTime: "09:00", closeTime: "18:00" },
//           wednesday: { isOpen: false, openTime: "09:00", closeTime: "18:00" },
//           thursday: { isOpen: false, openTime: "09:00", closeTime: "18:00" },
//           friday: { isOpen: false, openTime: "09:00", closeTime: "18:00" },
//           saturday: { isOpen: false, openTime: "09:00", closeTime: "18:00" },
//           sunday: { isOpen: false, openTime: "09:00", closeTime: "18:00" }
//         },
//         location: {
//           latitude: 0,
//           longitude: 0
//         }
//       });
//       alert('Contact information deleted successfully!');
//     }
//   };

//   const handleChange = (field, value) => {
//     setEditData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleBusinessHourChange = (day, field, value) => {
//     setEditData(prev => ({
//       ...prev,
//       businessHours: {
//         ...prev.businessHours,
//         [day]: {
//           ...prev.businessHours[day],
//           [field]: value
//         }
//       }
//     }));
//   };

//   const addAdditionalPhone = () => {
//     setEditData(prev => ({
//       ...prev,
//       additionalPhoneNumbers: [...prev.additionalPhoneNumbers, '']
//     }));
//   };

//   const removeAdditionalPhone = (index) => {
//     setEditData(prev => ({
//       ...prev,
//       additionalPhoneNumbers: prev.additionalPhoneNumbers.filter((_, i) => i !== index)
//     }));
//   };

//   const handleAdditionalPhoneChange = (index, value) => {
//     setEditData(prev => ({
//       ...prev,
//       additionalPhoneNumbers: prev.additionalPhoneNumbers.map((phone, i) => 
//         i === index ? value : phone
//       )
//     }));
//   };

//   const addAdditionalEmail = () => {
//     setEditData(prev => ({
//       ...prev,
//       additionalEmailAddresses: [...prev.additionalEmailAddresses, '']
//     }));
//   };

//   const removeAdditionalEmail = (index) => {
//     setEditData(prev => ({
//       ...prev,
//       additionalEmailAddresses: prev.additionalEmailAddresses.filter((_, i) => i !== index)
//     }));
//   };

//   const handleAdditionalEmailChange = (index, value) => {
//     setEditData(prev => ({
//       ...prev,
//       additionalEmailAddresses: prev.additionalEmailAddresses.map((email, i) => 
//         i === index ? value : email
//       )
//     }));
//   };

//   const currentData = isEditing ? editData : contactInfo;
//   const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Contact Information</h1>
//           <p className="text-gray-600 mt-1">Manage your business contact details</p>
//         </div>
//         <div className="flex items-center space-x-3 mt-4 sm:mt-0">
//           {isEditing ? (
//             <>
//               <button
//                 onClick={handleCancel}
//                 className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
//               >
//                 <Save className="w-4 h-4" />
//                 <span>Save Changes</span>
//               </button>
//             </>
//           ) : (
//             <>
//               <button
//                 onClick={handleDelete}
//                 className="px-4 py-2 text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors flex items-center space-x-2"
//               >
//                 <Trash2 className="w-4 h-4" />
//                 <span>Delete All</span>
//               </button>
//               <button
//                 onClick={handleEdit}
//                 className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
//               >
//                 <Edit className="w-4 h-4" />
//                 <span>Edit Contact Info</span>
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Contact Information Cards */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Primary Contact Details */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center space-x-3 mb-4">
//             <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
//               <Phone className="w-5 h-5 text-purple-600" />
//             </div>
//             <h2 className="text-xl font-semibold text-gray-900">Primary Contact</h2>
//           </div>

//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Mobile Number
//               </label>
//               {isEditing ? (
//                 <input
//                   type="tel"
//                   value={currentData.mobileNumber || ''}
//                   onChange={(e) => handleChange('mobileNumber', e.target.value)}
//                   placeholder="+91 98765 43210"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                 />
//               ) : (
//                 <p className="text-gray-600">{currentData.mobileNumber || 'Not provided'}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Info Email
//               </label>
//               {isEditing ? (
//                 <input
//                   type="email"
//                   value={currentData.infoEmail || ''}
//                   onChange={(e) => handleChange('infoEmail', e.target.value)}
//                   placeholder="info@euryfoxglobal.com"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                 />
//               ) : (
//                 <p className="text-gray-600">{currentData.infoEmail || 'Not provided'}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Sales Email
//               </label>
//               {isEditing ? (
//                 <input
//                   type="email"
//                   value={currentData.salesEmail || ''}
//                   onChange={(e) => handleChange('salesEmail', e.target.value)}
//                   placeholder="sales@euryfoxglobal.com"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                 />
//               ) : (
//                 <p className="text-gray-600">{currentData.salesEmail || 'Not provided'}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Support Email
//               </label>
//               {isEditing ? (
//                 <input
//                   type="email"
//                   value={currentData.supportEmail || ''}
//                   onChange={(e) => handleChange('supportEmail', e.target.value)}
//                   placeholder="support@euryfoxglobal.com"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                 />
//               ) : (
//                 <p className="text-gray-600">{currentData.supportEmail || 'Not provided'}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Office Address */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center space-x-3 mb-4">
//             <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//               <MapPin className="w-5 h-5 text-blue-600" />
//             </div>
//             <h2 className="text-xl font-semibold text-gray-900">Office Address</h2>
//           </div>

//           <div className="space-y-4">
//             {/* Street Address Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Street Address
//               </label>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   value={currentData.streetAddress || ''}
//                   onChange={(e) => handleChange('streetAddress', e.target.value)}
//                   placeholder="123 Global Trade Center"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                 />
//               ) : (
//                 <p className="text-gray-600">{currentData.streetAddress || 'Not provided'}</p>
//               )}
//             </div>

//             {/* City and Postal Code Fields */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   City
//                 </label>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     value={currentData.city || ''}
//                     onChange={(e) => handleChange('city', e.target.value)}
//                     placeholder="Mumbai"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                   />
//                 ) : (
//                   <p className="text-gray-600">{currentData.city || 'Not provided'}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Postal Code
//                 </label>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     value={currentData.postalCode || ''}
//                     onChange={(e) => handleChange('postalCode', e.target.value)}
//                     placeholder="400001"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                   />
//                 ) : (
//                   <p className="text-gray-600">{currentData.postalCode || 'Not provided'}</p>
//                 )}
//               </div>
//             </div>

//             {/* Location Coordinates */}
//             <div className="pt-4 border-t border-gray-200">
//               <h3 className="text-sm font-medium text-gray-700 mb-2">Location Coordinates</h3>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs text-gray-500 mb-1">Latitude</label>
//                   {isEditing ? (
//                     <input
//                       type="number"
//                       step="any"
//                       value={currentData.location?.latitude || ''}
//                       onChange={(e) => handleChange('location', { 
//                         ...currentData.location, 
//                         latitude: parseFloat(e.target.value) || 0
//                       })}
//                       placeholder="28.4595"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                     />
//                   ) : (
//                     <p className="text-gray-600">{currentData.location?.latitude || 'Not provided'}</p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-xs text-gray-500 mb-1">Longitude</label>
//                   {isEditing ? (
//                     <input
//                       type="number"
//                       step="any"
//                       value={currentData.location?.longitude || ''}
//                       onChange={(e) => handleChange('location', { 
//                         ...currentData.location, 
//                         longitude: parseFloat(e.target.value) || 0
//                       })}
//                       placeholder="77.0266"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                     />
//                   ) : (
//                     <p className="text-gray-600">{currentData.location?.longitude || 'Not provided'}</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Additional Phone Numbers */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center space-x-3 mb-4">
//             <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
//               <Phone className="w-5 h-5 text-green-600" />
//             </div>
//             <h2 className="text-xl font-semibold text-gray-900">Additional Phone Numbers</h2>
//           </div>

//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Additional Mobile Number
//               </label>
//               {isEditing ? (
//                 <input
//                   type="tel"
//                   value={currentData.additionalMobileNumber || ''}
//                   onChange={(e) => handleChange('additionalMobileNumber', e.target.value)}
//                   placeholder="+91 22 1234 5678"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                 />
//               ) : (
//                 <p className="text-gray-600">{currentData.additionalMobileNumber || 'Not provided'}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Toll Free Number
//               </label>
//               {isEditing ? (
//                 <input
//                   type="tel"
//                   value={currentData.tollFreeNumber || ''}
//                   onChange={(e) => handleChange('tollFreeNumber', e.target.value)}
//                   placeholder="1800 123 4567"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                 />
//               ) : (
//                 <p className="text-gray-600">{currentData.tollFreeNumber || 'Not provided'}</p>
//               )}
//             </div>

//             {/* Additional Phone Numbers */}
//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Other Phone Numbers
//                 </label>
//                 {isEditing && (
//                   <button
//                     onClick={addAdditionalPhone}
//                     className="text-purple-600 hover:text-purple-800 transition-colors flex items-center space-x-1"
//                   >
//                     <Plus className="w-4 h-4" />
//                     <span className="text-sm">Add</span>
//                   </button>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 {currentData.additionalPhoneNumbers?.map((phone, index) => (
//                   <div key={index} className="flex items-center space-x-2">
//                     {isEditing ? (
//                       <>
//                         <input
//                           type="tel"
//                           value={phone}
//                           onChange={(e) => handleAdditionalPhoneChange(index, e.target.value)}
//                           placeholder="+91 98765 43211"
//                           className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                         />
//                         <button
//                           onClick={() => removeAdditionalPhone(index)}
//                           className="text-red-600 hover:text-red-800 transition-colors"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </>
//                     ) : (
//                       <p className="text-gray-600">{phone || 'Not provided'}</p>
//                     )}
//                   </div>
//                 ))}
//                 {(!currentData.additionalPhoneNumbers || currentData.additionalPhoneNumbers.length === 0) && !isEditing && (
//                   <p className="text-gray-600">No additional phone numbers</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Additional Email Addresses */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
//                 <Mail className="w-5 h-5 text-orange-600" />
//               </div>
//               <h2 className="text-xl font-semibold text-gray-900">Additional Email Addresses</h2>
//             </div>
//             {isEditing && (
//               <button
//                 onClick={addAdditionalEmail}
//                 className="text-purple-600 hover:text-purple-800 transition-colors flex items-center space-x-1"
//               >
//                 <Plus className="w-4 h-4" />
//                 <span className="text-sm">Add</span>
//               </button>
//             )}
//           </div>

//           <div className="space-y-2">
//             {currentData.additionalEmailAddresses?.map((email, index) => (
//               <div key={index} className="flex items-center space-x-2">
//                 {isEditing ? (
//                   <>
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => handleAdditionalEmailChange(index, e.target.value)}
//                       placeholder="marketing@euryfoxglobal.com"
//                       className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                     />
//                     <button
//                       onClick={() => removeAdditionalEmail(index)}
//                       className="text-red-600 hover:text-red-800 transition-colors"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </>
//                 ) : (
//                   <p className="text-gray-600">{email || 'Not provided'}</p>
//                 )}
//               </div>
//             ))}
//             {(!currentData.additionalEmailAddresses || currentData.additionalEmailAddresses.length === 0) && !isEditing && (
//               <p className="text-gray-600">No additional email addresses</p>
//             )}
//           </div>
//         </div>

//         {/* Business Hours */}
//         <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
//           <div className="flex items-center space-x-3 mb-4">
//             <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
//               <Clock className="w-5 h-5 text-indigo-600" />
//             </div>
//             <h2 className="text-xl font-semibold text-gray-900">Business Hours</h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
//             {dayNames.map((day) => (
//               <div key={day} className="border border-gray-200 rounded-lg p-3">
//                 <div className="flex items-center justify-between mb-2">
//                   <h3 className="text-sm font-medium text-gray-900 capitalize">{day.slice(0,3)}</h3>
//                   {isEditing ? (
//                     <input
//                       type="checkbox"
//                       checked={currentData.businessHours?.[day]?.isOpen || false}
//                       onChange={(e) => handleBusinessHourChange(day, 'isOpen', e.target.checked)}
//                       className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//                     />
//                   ) : (
//                     <span className={`text-xs font-medium ${
//                       currentData.businessHours?.[day]?.isOpen ? 'text-green-600' : 'text-red-600'
//                     }`}>
//                       {currentData.businessHours?.[day]?.isOpen ? 'Open' : 'Closed'}
//                     </span>
//                   )}
//                 </div>
                
//                 {currentData.businessHours?.[day]?.isOpen && (
//                   <div className="space-y-1">
//                     {isEditing ? (
//                       <>
//                         <input
//                           type="time"
//                           value={currentData.businessHours?.[day]?.openTime || '09:00'}
//                           onChange={(e) => handleBusinessHourChange(day, 'openTime', e.target.value)}
//                           className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                         />
//                         <input
//                           type="time"
//                           value={currentData.businessHours?.[day]?.closeTime || '18:00'}
//                           onChange={(e) => handleBusinessHourChange(day, 'closeTime', e.target.value)}
//                           className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                         />
//                       </>
//                     ) : (
//                       <div className="text-xs text-gray-600">
//                         <div>{currentData.businessHours?.[day]?.openTime || '09:00'}</div>
//                         <div>to</div>
//                         <div>{currentData.businessHours?.[day]?.closeTime || '18:00'}</div>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactAdmin;



import React, { useState, useEffect } from 'react';
import { Save, Phone, Mail, MapPin, Clock, Edit, Plus, Trash2, Loader } from 'lucide-react';

const ContactAdmin = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const API_BASE_URL = 'http://localhost:4000/eury/fox/contact-info';

  // Helper function to parse business hours string to object
  const parseBusinessHours = (businessHoursArray) => {
    const daysMap = {
      'monday': 'Monday',
      'tuesday': 'Tuesday', 
      'wednesday': 'Wednesday',
      'thursday': 'Thursday',
      'friday': 'Friday',
      'saturday': 'Saturday',
      'sunday': 'Sunday'
    };

    const parsedHours = {};
    
    Object.keys(daysMap).forEach(day => {
      const hourString = businessHoursArray?.find(h => 
        h.toLowerCase().startsWith(daysMap[day].toLowerCase())
      );
      
      if (hourString && !hourString.toLowerCase().includes('closed')) {
        const timeMatch = hourString.match(/(\d{1,2}):(\d{2})\s*(AM|PM)\s*-\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i);
        if (timeMatch) {
          const [, startHour, startMin, startPeriod, endHour, endMin, endPeriod] = timeMatch;
          
          // Convert to 24-hour format
          const convertTo24Hour = (hour, minute, period) => {
            let h = parseInt(hour);
            if (period.toUpperCase() === 'PM' && h !== 12) h += 12;
            if (period.toUpperCase() === 'AM' && h === 12) h = 0;
            return `${h.toString().padStart(2, '0')}:${minute}`;
          };

          parsedHours[day] = {
            isOpen: true,
            openTime: convertTo24Hour(startHour, startMin, startPeriod),
            closeTime: convertTo24Hour(endHour, endMin, endPeriod)
          };
        } else {
          parsedHours[day] = { isOpen: false, openTime: "09:00", closeTime: "18:00" };
        }
      } else {
        parsedHours[day] = { isOpen: false, openTime: "09:00", closeTime: "18:00" };
      }
    });

    return parsedHours;
  };

  // Helper function to format business hours object to string array
  const formatBusinessHours = (businessHoursObj) => {
    const daysMap = {
      'monday': 'Monday',
      'tuesday': 'Tuesday',
      'wednesday': 'Wednesday', 
      'thursday': 'Thursday',
      'friday': 'Friday',
      'saturday': 'Saturday',
      'sunday': 'Sunday'
    };

    // Convert 24-hour to 12-hour format with error handling
    const convertTo12Hour = (time) => {
      if (!time || typeof time !== 'string') {
        return '9:00 AM'; // Default fallback
      }
      
      const timeParts = time.split(':');
      if (timeParts.length < 2) {
        return '9:00 AM'; // Default fallback
      }
      
      const [hour, minute] = timeParts;
      const h = parseInt(hour) || 0;
      const m = minute || '00';
      const period = h >= 12 ? 'PM' : 'AM';
      const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
      return `${displayHour}:${m} ${period}`;
    };

    return Object.keys(daysMap).map(day => {
      const dayData = businessHoursObj?.[day];
      if (!dayData?.isOpen) {
        return `${daysMap[day]}: Closed`;
      }

      const openTime = convertTo12Hour(dayData.openTime);
      const closeTime = convertTo12Hour(dayData.closeTime);
      
      return `${daysMap[day]}: ${openTime} - ${closeTime}`;
    });
  };

  // Fetch contact info on component mount
  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/getActive`);
      const data = await response.json();
      
      if (data.success && data.result) {
        const result = data.result;
        const transformedData = {
          _id: result._id,
          mobileNumber: result.mobileNumber,
          infoEmail: result.infoEmail,
          salesEmail: result.salesEmail,
          supportEmail: result.supportEmail,
          streetAddress: result.officeAddress?.[0] || '',
          city: result.officeAddress?.[2]?.split(',')[0] || '',
          postalCode: result.officeAddress?.[2]?.match(/\d+/)?.[0] || '',
          additionalMobileNumber: result.phoneNumbers?.[0] || '',
          tollFreeNumber: result.phoneNumbers?.[2] || '',
          additionalPhoneNumbers: result.phoneNumbers?.slice(1, -1) || [],
          additionalEmailAddresses: result.emails?.filter(email => 
            email !== result.infoEmail && 
            email !== result.salesEmail && 
            email !== result.supportEmail
          ) || [],
          businessHours: parseBusinessHours(result.businessHours),
          location: {
            latitude: result.latitude,
            longitude: result.longitude
          }
        };
        setContactInfo(transformedData);
      }
    } catch (error) {
      console.error('Error fetching contact info:', error);
      alert('Failed to fetch contact information');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setEditData({ ...contactInfo });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      // Ensure editData has proper structure with defaults
      const safeEditData = {
        mobileNumber: editData.mobileNumber || '',
        infoEmail: editData.infoEmail || '',
        salesEmail: editData.salesEmail || '',
        supportEmail: editData.supportEmail || '',
        streetAddress: editData.streetAddress || '',
        city: editData.city || '',
        postalCode: editData.postalCode || '',
        additionalMobileNumber: editData.additionalMobileNumber || '',
        tollFreeNumber: editData.tollFreeNumber || '',
        additionalPhoneNumbers: editData.additionalPhoneNumbers || [],
        additionalEmailAddresses: editData.additionalEmailAddresses || [],
        businessHours: editData.businessHours || {},
        location: editData.location || { latitude: 0, longitude: 0 }
      };
      
      // Transform data back to API format
      const apiData = {
        mobileNumber: safeEditData.mobileNumber,
        infoEmail: safeEditData.infoEmail,
        salesEmail: safeEditData.salesEmail,
        supportEmail: safeEditData.supportEmail,
        officeAddress: [
          safeEditData.streetAddress,
          '', // Suite/Building (you can add this field if needed)
          `${safeEditData.city}, ${safeEditData.postalCode}`,
          'India' // You might want to make this configurable
        ].filter(addr => addr && addr.trim()),
        phoneNumbers: [
          safeEditData.additionalMobileNumber,
          ...safeEditData.additionalPhoneNumbers,
          safeEditData.tollFreeNumber
        ].filter(phone => phone && phone.trim()),
        emails: [
          safeEditData.infoEmail,
          safeEditData.salesEmail,
          safeEditData.supportEmail,
          ...safeEditData.additionalEmailAddresses
        ].filter((email, index, self) => email && email.trim() && self.indexOf(email) === index),
        businessHours: formatBusinessHours(safeEditData.businessHours),
        latitude: safeEditData.location?.latitude || 0,
        longitude: safeEditData.location?.longitude || 0,
        isActive: true
      };

      let response;
      if (contactInfo?._id) {
        // Update existing contact
        response = await fetch(`${API_BASE_URL}/update`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...apiData, _id: contactInfo._id }),
        });
      } else {
        // Add new contact
        response = await fetch(`${API_BASE_URL}/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(apiData),
        });
      }

      const data = await response.json();
      
      if (data.success) {
        setContactInfo(safeEditData);
        setIsEditing(false);
        alert('Contact information updated successfully!');
        // Refresh data from server
        fetchContactInfo();
      } else {
        throw new Error(data.message || 'Failed to update contact information');
      }
    } catch (error) {
      console.error('Error saving contact info:', error);
      alert('Failed to save contact information: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditData({});
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!contactInfo?._id) return;
    
    if (window.confirm('Are you sure you want to delete all contact information? This action cannot be undone.')) {
      try {
        setIsSaving(true);
        const response = await fetch(`${API_BASE_URL}/${contactInfo._id}`, {
          method: 'DELETE',
        });

        const data = await response.json();
        
        if (data.success) {
          setContactInfo(null);
          alert('Contact information deleted successfully!');
        } else {
          throw new Error(data.message || 'Failed to delete contact information');
        }
      } catch (error) {
        console.error('Error deleting contact info:', error);
        alert('Failed to delete contact information: ' + error.message);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBusinessHourChange = (day, field, value) => {
    setEditData(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...prev.businessHours?.[day],
          [field]: value
        }
      }
    }));
  };

  const addAdditionalPhone = () => {
    setEditData(prev => ({
      ...prev,
      additionalPhoneNumbers: [...(prev.additionalPhoneNumbers || []), '']
    }));
  };

  const removeAdditionalPhone = (index) => {
    setEditData(prev => ({
      ...prev,
      additionalPhoneNumbers: prev.additionalPhoneNumbers?.filter((_, i) => i !== index) || []
    }));
  };

  const handleAdditionalPhoneChange = (index, value) => {
    setEditData(prev => ({
      ...prev,
      additionalPhoneNumbers: prev.additionalPhoneNumbers?.map((phone, i) => 
        i === index ? value : phone
      ) || []
    }));
  };

  const addAdditionalEmail = () => {
    setEditData(prev => ({
      ...prev,
      additionalEmailAddresses: [...(prev.additionalEmailAddresses || []), '']
    }));
  };

  const removeAdditionalEmail = (index) => {
    setEditData(prev => ({
      ...prev,
      additionalEmailAddresses: prev.additionalEmailAddresses?.filter((_, i) => i !== index) || []
    }));
  };

  const handleAdditionalEmailChange = (index, value) => {
    setEditData(prev => ({
      ...prev,
      additionalEmailAddresses: prev.additionalEmailAddresses?.map((email, i) => 
        i === index ? value : email
      ) || []
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader className="w-6 h-6 animate-spin text-purple-600" />
          <span className="text-gray-600">Loading contact information...</span>
        </div>
      </div>
    );
  }

  const currentData = isEditing ? editData : contactInfo || {};
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Information</h1>
          <p className="text-gray-600 mt-1">Manage your business contact details</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
              >
                {isSaving ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </>
          ) : (
            <>
              {contactInfo && (
                <button
                  onClick={handleDelete}
                  disabled={isSaving}
                  className="px-4 py-2 text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors flex items-center space-x-2 disabled:opacity-50"
                >
                  {isSaving ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                  <span>Delete All</span>
                </button>
              )}
              <button
                onClick={handleEdit}
                className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>{contactInfo ? 'Edit Contact Info' : 'Add Contact Info'}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Contact Information Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Primary Contact Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Primary Contact</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={currentData.mobileNumber || ''}
                  onChange={(e) => handleChange('mobileNumber', e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
              ) : (
                <p className="text-gray-600">{currentData.mobileNumber || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Info Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={currentData.infoEmail || ''}
                  onChange={(e) => handleChange('infoEmail', e.target.value)}
                  placeholder="info@euryfoxglobal.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
              ) : (
                <p className="text-gray-600">{currentData.infoEmail || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sales Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={currentData.salesEmail || ''}
                  onChange={(e) => handleChange('salesEmail', e.target.value)}
                  placeholder="sales@euryfoxglobal.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
              ) : (
                <p className="text-gray-600">{currentData.salesEmail || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Support Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={currentData.supportEmail || ''}
                  onChange={(e) => handleChange('supportEmail', e.target.value)}
                  placeholder="support@euryfoxglobal.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
              ) : (
                <p className="text-gray-600">{currentData.supportEmail || 'Not provided'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Office Address */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Office Address</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={currentData.streetAddress || ''}
                  onChange={(e) => handleChange('streetAddress', e.target.value)}
                  placeholder="123 Global Trade Center"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
              ) : (
                <p className="text-gray-600">{currentData.streetAddress || 'Not provided'}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentData.city || ''}
                    onChange={(e) => handleChange('city', e.target.value)}
                    placeholder="Mumbai"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  />
                ) : (
                  <p className="text-gray-600">{currentData.city || 'Not provided'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentData.postalCode || ''}
                    onChange={(e) => handleChange('postalCode', e.target.value)}
                    placeholder="400001"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  />
                ) : (
                  <p className="text-gray-600">{currentData.postalCode || 'Not provided'}</p>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Location Coordinates</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Latitude</label>
                  {isEditing ? (
                    <input
                      type="number"
                      step="any"
                      value={currentData.location?.latitude || ''}
                      onChange={(e) => handleChange('location', { 
                        ...currentData.location, 
                        latitude: parseFloat(e.target.value) || 0
                      })}
                      placeholder="28.4595"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    />
                  ) : (
                    <p className="text-gray-600">{currentData.location?.latitude || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Longitude</label>
                  {isEditing ? (
                    <input
                      type="number"
                      step="any"
                      value={currentData.location?.longitude || ''}
                      onChange={(e) => handleChange('location', { 
                        ...currentData.location, 
                        longitude: parseFloat(e.target.value) || 0
                      })}
                      placeholder="77.0266"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    />
                  ) : (
                    <p className="text-gray-600">{currentData.location?.longitude || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Phone Numbers */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Additional Phone Numbers</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Mobile Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={currentData.additionalMobileNumber || ''}
                  onChange={(e) => handleChange('additionalMobileNumber', e.target.value)}
                  placeholder="+91 22 1234 5678"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
              ) : (
                <p className="text-gray-600">{currentData.additionalMobileNumber || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Toll Free Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={currentData.tollFreeNumber || ''}
                  onChange={(e) => handleChange('tollFreeNumber', e.target.value)}
                  placeholder="1800 123 4567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
              ) : (
                <p className="text-gray-600">{currentData.tollFreeNumber || 'Not provided'}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Other Phone Numbers
                </label>
                {isEditing && (
                  <button
                    onClick={addAdditionalPhone}
                    className="text-purple-600 hover:text-purple-800 transition-colors flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-sm">Add</span>
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {currentData.additionalPhoneNumbers?.map((phone, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {isEditing ? (
                      <>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => handleAdditionalPhoneChange(index, e.target.value)}
                          placeholder="+91 98765 43211"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                        />
                        <button
                          onClick={() => removeAdditionalPhone(index)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <p className="text-gray-600">{phone || 'Not provided'}</p>
                    )}
                  </div>
                ))}
                {(!currentData.additionalPhoneNumbers || currentData.additionalPhoneNumbers.length === 0) && !isEditing && (
                  <p className="text-gray-600">No additional phone numbers</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Email Addresses */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Additional Email Addresses</h2>
            </div>
            {isEditing && (
              <button
                onClick={addAdditionalEmail}
                className="text-purple-600 hover:text-purple-800 transition-colors flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">Add</span>
              </button>
            )}
          </div>

          <div className="space-y-2">
            {currentData.additionalEmailAddresses?.map((email, index) => (
              <div key={index} className="flex items-center space-x-2">
                {isEditing ? (
                  <>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => handleAdditionalEmailChange(index, e.target.value)}
                      placeholder="marketing@euryfoxglobal.com"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    />
                    <button
                      onClick={() => removeAdditionalEmail(index)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <p className="text-gray-600">{email || 'Not provided'}</p>
                )}
              </div>
            ))}
            {(!currentData.additionalEmailAddresses || currentData.additionalEmailAddresses.length === 0) && !isEditing && (
              <p className="text-gray-600">No additional email addresses</p>
            )}
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Business Hours</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
            {dayNames.map((day) => (
              <div key={day} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-900 capitalize">{day.slice(0,3)}</h3>
                  {isEditing ? (
                    <input
                      type="checkbox"
                      checked={currentData.businessHours?.[day]?.isOpen || false}
                      onChange={(e) => handleBusinessHourChange(day, 'isOpen', e.target.checked)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                  ) : (
                    <span className={`text-xs font-medium ${
                      currentData.businessHours?.[day]?.isOpen ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {currentData.businessHours?.[day]?.isOpen ? 'Open' : 'Closed'}
                    </span>
                  )}
                </div>
                
                {currentData.businessHours?.[day]?.isOpen && (
                  <div className="space-y-1">
                    {isEditing ? (
                      <>
                        <input
                          type="time"
                          value={currentData.businessHours?.[day]?.openTime || '09:00'}
                          onChange={(e) => handleBusinessHourChange(day, 'openTime', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                        />
                        <input
                          type="time"
                          value={currentData.businessHours?.[day]?.closeTime || '18:00'}
                          onChange={(e) => handleBusinessHourChange(day, 'closeTime', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </>
                    ) : (
                      <div className="text-xs text-gray-600">
                        <div>{currentData.businessHours?.[day]?.openTime || '09:00'}</div>
                        <div>to</div>
                        <div>{currentData.businessHours?.[day]?.closeTime || '18:00'}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactAdmin;