// import React, { useState } from 'react';
// import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
// import Modal from '../../components/ui/Modal';
// import BlogForm from '../../components/forms/BlogForm';

// const BlogAdmin = () => {
//   const [blogs, setBlogs] = useState([
//     {
//       id: 1,
//       title: 'The Future of Global Trade: Trends and Innovations',
//       category: 'Industry Insights',
//       status: 'Published',
//       author: 'Admin',
//       date: '2025-01-15',
//       readTime: '8 min read',
//       image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400'
//     },
//     {
//       id: 2,
//       title: 'Quality Control Standards in Food Industry',
//       category: 'Quality Control',
//       status: 'Published',
//       author: 'Admin',
//       date: '2025-01-14',
//       readTime: '6 min read',
//       image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'
//     },
//     {
//       id: 3,
//       title: 'Sustainable Packaging Solutions',
//       category: 'Sustainability',
//       status: 'Draft',
//       author: 'Admin',
//       date: '2025-01-13',
//       readTime: '5 min read',
//       image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400'
//     },
//     {
//       id: 4,
//       title: 'Health Benefits of Organic Nuts',
//       category: 'Health & Nutrition',
//       status: 'Published',
//       author: 'Admin',
//       date: '2025-01-12',
//       readTime: '7 min read',
//       image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400'
//     }
//   ]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingBlog, setEditingBlog] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [statusFilter, setStatusFilter] = useState('All');

//   const categories = ['All', 'Industry Insights', 'Quality Control', 'Sustainability', 'Business Strategy', 'Health & Nutrition', 'Regulations'];
//   const statusOptions = ['All', 'Published', 'Draft', 'Archived'];

//   const filteredBlogs = blogs.filter(blog => {
//     const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
//     const matchesStatus = statusFilter === 'All' || blog.status === statusFilter;
//     return matchesSearch && matchesCategory && matchesStatus;
//   });

//   const handleAddBlog = () => {
//     setEditingBlog(null);
//     setIsModalOpen(true);
//   };

//   const handleEditBlog = (blog) => {
//     setEditingBlog(blog);
//     setIsModalOpen(true);
//   };

//   const handleDeleteBlog = (blogId) => {
//     setBlogs(blogs.filter(b => b.id !== blogId));
//   };

//   const handleSaveBlog = (blogData) => {
//     if (editingBlog) {
//       setBlogs(blogs.map(b => 
//         b.id === editingBlog.id ? { ...b, ...blogData } : b
//       ));
//     } else {
//       const newBlog = {
//         ...blogData,
//         id: Math.max(...blogs.map(b => b.id)) + 1,
//         date: new Date().toISOString().split('T')[0],
//         author: 'Admin'
//       };
//       setBlogs([...blogs, newBlog]);
//     }
//     setIsModalOpen(false);
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Published': return 'bg-green-100 text-green-800';
//       case 'Draft': return 'bg-yellow-100 text-yellow-800';
//       case 'Archived': return 'bg-gray-100 text-gray-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
//           <p className="text-gray-600 mt-1">Create and manage your blog content</p>
//         </div>
//         <button
//           onClick={handleAddBlog}
//           className="mt-4 sm:mt-0 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
//         >
//           <Plus className="w-4 h-4" />
//           <span>New Article</span>
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Total Articles</p>
//               <p className="text-2xl font-bold text-gray-900">{blogs.length}</p>
//             </div>
//             <div className="p-3 rounded-lg bg-blue-100">
//               <Edit className="w-6 h-6 text-blue-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Published</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {blogs.filter(b => b.status === 'Published').length}
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
//               <p className="text-sm font-medium text-gray-500">Drafts</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {blogs.filter(b => b.status === 'Draft').length}
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
//               <p className="text-sm font-medium text-gray-500">Categories</p>
//               <p className="text-2xl font-bold text-gray-900">{categories.length - 1}</p>
//             </div>
//             <div className="p-3 rounded-lg bg-purple-100">
//               <Search className="w-6 h-6 text-purple-600" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
//           <div className="relative flex-1 max-w-md">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search articles..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//             />
//           </div>

//           <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
//             <div className="flex items-center space-x-2">
//               <Filter className="w-4 h-4 text-gray-400" />
//               <span className="text-sm text-gray-600">Category:</span>
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//               >
//                 {categories.map(category => (
//                   <option key={category} value={category}>{category}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex items-center space-x-2">
//               <span className="text-sm text-gray-600">Status:</span>
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//               >
//                 {statusOptions.map(status => (
//                   <option key={status} value={status}>{status}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Blog Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredBlogs.map(blog => (
//           <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
//             <div className="relative">
//               <img
//                 src={blog.image}
//                 alt={blog.title}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="absolute top-2 right-2 flex space-x-1">
//                 <button
//                   onClick={() => handleEditBlog(blog)}
//                   className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
//                 >
//                   <Edit className="w-4 h-4 text-gray-600" />
//                 </button>
//                 <button
//                   onClick={() => handleDeleteBlog(blog.id)}
//                   className="p-1 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
//                 >
//                   <Trash2 className="w-4 h-4 text-red-600" />
//                 </button>
//               </div>
//               <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-semibold ${getStatusColor(blog.status)}`}>
//                 {blog.status}
//               </div>
//             </div>
            
//             <div className="p-4">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-xs text-purple-600 font-medium">{blog.category}</span>
//                 <span className="text-xs text-gray-500">{blog.readTime}</span>
//               </div>
              
//               <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{blog.title}</h3>
              
//               <div className="flex items-center justify-between text-sm text-gray-500">
//                 <span>By {blog.author}</span>
//                 <span>{new Date(blog.date).toLocaleDateString()}</span>
//               </div>

//               <div className="mt-4 flex items-center justify-between">
//                 <button className="text-purple-600 hover:text-purple-800 transition-colors flex items-center space-x-1">
//                   <Eye className="w-4 h-4" />
//                   <span className="text-sm">Preview</span>
//                 </button>
//                 <button
//                   onClick={() => handleEditBlog(blog)}
//                   className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors"
//                 >
//                   Edit
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Blog Form Modal */}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={editingBlog ? 'Edit Article' : 'Create New Article'}
//       >
//         <BlogForm
//           blog={editingBlog}
//           onSave={handleSaveBlog}
//           onCancel={() => setIsModalOpen(false)}
//         />
//       </Modal>
//     </div>
//   );
// };

// export default BlogAdmin;