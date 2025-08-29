// import React, { useState, useEffect } from 'react';

// const BlogForm = ({ blog, onSave, onCancel }) => {
//   const [formData, setFormData] = useState({
//     slug: '',
//     title: '',
//     excerpt: '',
//     content: '',
//     author: 'Admin',
//     authorRole: 'Administrator',
//     authorImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
//     readTime: '5 min read',
//     categoryId: '',
//     categoryName: '',
//     tags: [],
//     image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400',
//     isActive: true,
//     featured: false
//   });

//   const [tagInput, setTagInput] = useState('');
  
//   const categories = [
//     { id: 1, name: 'Industry Insights' },
//     { id: 2, name: 'Quality Control' },
//     { id: 3, name: 'Sustainability' },
//     { id: 4, name: 'Health & Nutrition' }
//   ];

//   useEffect(() => {
//     if (blog) {
//       setFormData(blog);
//     }
//   }, [blog]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'categoryId') {
//       const selectedCategory = categories.find(c => c.id === parseInt(value));
//       setFormData(prev => ({
//         ...prev,
//         categoryId: parseInt(value),
//         categoryName: selectedCategory ? selectedCategory.name : ''
//       }));
//     } else if (name === 'title') {
//       // Auto-generate slug from title
//       const slug = value.toLowerCase()
//         .replace(/[^a-z0-9 -]/g, '')
//         .replace(/\s+/g, '-')
//         .replace(/-+/g, '-');
//       setFormData(prev => ({
//         ...prev,
//         [name]: value,
//         slug: slug
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }));
//     }
//   };

//   const handleTagAdd = () => {
//     if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
//       setFormData(prev => ({
//         ...prev,
//         tags: [...prev.tags, tagInput.trim()]
//       }));
//       setTagInput('');
//     }
//   };

//   const handleTagRemove = (tagToRemove) => {
//     setFormData(prev => ({
//       ...prev,
//       tags: prev.tags.filter(tag => tag !== tagToRemove)
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Blog Title *
//         </label>
//         <input
//           type="text"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           required
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Slug (Auto-generated)
//         </label>
//         <input
//           type="text"
//           name="slug"
//           value={formData.slug}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Category *
//           </label>
//           <select
//             name="categoryId"
//             value={formData.categoryId}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//           >
//             <option value="">Select Category</option>
//             {categories.map(category => (
//               <option key={category.id} value={category.id}>{category.name}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Read Time
//           </label>
//           <input
//             type="text"
//             name="readTime"
//             value={formData.readTime}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-3 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Author *
//           </label>
//           <input
//             type="text"
//             name="author"
//             value={formData.author}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Author Role
//           </label>
//           <input
//             type="text"
//             name="authorRole"
//             value={formData.authorRole}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Author Image URL
//           </label>
//           <input
//             type="url"
//             name="authorImage"
//             value={formData.authorImage}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Excerpt *
//         </label>
//         <textarea
//           name="excerpt"
//           value={formData.excerpt}
//           onChange={handleChange}
//           rows={3}
//           required
//           placeholder="Brief description of the blog post..."
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Content *
//         </label>
//         <textarea
//           name="content"
//           value={formData.content}
//           onChange={handleChange}
//           rows={8}
//           required
//           placeholder="Write your blog content here..."
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Featured Image URL *
//         </label>
//         <input
//           type="url"
//           name="image"
//           value={formData.image}
//           onChange={handleChange}
//           required
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Tags
//         </label>
//         <div className="flex items-center space-x-2 mb-2">
//           <input
//             type="text"
//             value={tagInput}
//             onChange={(e) => setTagInput(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
//             placeholder="Add a tag..."
//             className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//           />
//           <button
//             type="button"
//             onClick={handleTagAdd}
//             className="px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
//           >
//             Add
//           </button>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {formData.tags.map((tag, index) => (
//             <span
//               key={index}
//               className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
//             >
//               {tag}
//               <button
//                 type="button"
//                 onClick={() => handleTagRemove(tag)}
//                 className="ml-1 text-purple-600 hover:text-purple-800"
//               >
//                 ×
//               </button>
//             </span>
//           ))}
//         </div>
//       </div>

//       <div className="flex items-center space-x-4">
//         <label className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             name="isActive"
//             checked={formData.isActive}
//             onChange={handleChange}
//             className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//           />
//           <span className="text-sm font-medium text-gray-700">Active</span>
//         </label>

//         <label className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             name="featured"
//             checked={formData.featured}
//             onChange={handleChange}
//             className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//           />
//           <span className="text-sm font-medium text-gray-700">Featured</span>
//         </label>
//       </div>

//       <div className="flex justify-end space-x-3 pt-4">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-md hover:from-purple-600 hover:to-blue-700 transition-all duration-200"
//         >
//           {blog ? 'Update Blog' : 'Create Blog'}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default BlogForm;














// import React, { useState, useEffect } from 'react';

// const BlogForm = ({ blog, onSave, onCancel }) => {
//   const [formData, setFormData] = useState({
//     slug: '',
//     title: '',
//     excerpt: '',
//     content: '',
//     author: 'Admin',
//     authorRole: 'Administrator',
//     authorImage: null,
//     authorImagePreview: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
//     readTime: '5 min read',
//     categoryId: '',
//     categoryName: '',
//     tags: [],
//     image: null,
//     imagePreview: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400',
//     isActive: true,
//     featured: false
//   });

//   const [tagInput, setTagInput] = useState('');
//   const [imageError, setImageError] = useState('');
//   const [authorImageError, setAuthorImageError] = useState('');
  
//   const categories = [
//     { id: 1, name: 'Industry Insights' },
//     { id: 2, name: 'Quality Control' },
//     { id: 3, name: 'Sustainability' },
//     { id: 4, name: 'Health & Nutrition' }
//   ];

//   useEffect(() => {
//     if (blog) {
//       setFormData({
//         ...blog,
//         imagePreview: blog.image || '',
//         authorImagePreview: blog.authorImage || ''
//       });
//     }
//   }, [blog]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (name === 'categoryId') {
//       const selectedCategory = categories.find(c => c.id === parseInt(value));
//       setFormData(prev => ({
//         ...prev,
//         categoryId: parseInt(value),
//         categoryName: selectedCategory ? selectedCategory.name : ''
//       }));
//     } else if (name === 'title') {
//       const slug = value.toLowerCase()
//         .replace(/[^a-z0-9 -]/g, '')
//         .replace(/\s+/g, '-')
//         .replace(/-+/g, '-');
//       setFormData(prev => ({
//         ...prev,
//         [name]: value,
//         slug: slug
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }));
//     }
//   };

//   const validateAndSetImage = (file, isAuthorImage = false) => {
//     const errorSetter = isAuthorImage ? setAuthorImageError : setImageError;
//     const fieldPrefix = isAuthorImage ? 'authorImage' : 'image';
    
//     errorSetter('');

//     if (file) {
//       const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
//       if (!allowedTypes.includes(file.type)) {
//         errorSetter('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
//         return;
//       }

//       const fileSizeInMB = file.size / (1024 * 1024);
//       if (fileSizeInMB < 1) {
//         errorSetter('File size must be at least 1 MB');
//         return;
//       }
//       if (fileSizeInMB > 5) {
//         errorSetter('File size must not exceed 5 MB');
//         return;
//       }

//       const previewUrl = URL.createObjectURL(file);
      
//       setFormData(prev => ({
//         ...prev,
//         [fieldPrefix]: file,
//         [`${fieldPrefix}Preview`]: previewUrl
//       }));
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     validateAndSetImage(file, false);
//   };

//   const handleAuthorImageChange = (e) => {
//     const file = e.target.files[0];
//     validateAndSetImage(file, true);
//   };

//   const removeImage = (isAuthorImage = false) => {
//     const fieldPrefix = isAuthorImage ? 'authorImage' : 'image';
//     const errorSetter = isAuthorImage ? setAuthorImageError : setImageError;
//     const inputId = isAuthorImage ? 'author-image-upload' : 'featured-image-upload';
    
//     if (formData[`${fieldPrefix}Preview`] && formData[`${fieldPrefix}Preview`].startsWith('blob:')) {
//       URL.revokeObjectURL(formData[`${fieldPrefix}Preview`]);
//     }
    
//     setFormData(prev => ({
//       ...prev,
//       [fieldPrefix]: null,
//       [`${fieldPrefix}Preview`]: ''
//     }));
    
//     errorSetter('');
    
//     const fileInput = document.getElementById(inputId);
//     if (fileInput) {
//       fileInput.value = '';
//     }
//   };

//   const handleTagAdd = () => {
//     if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
//       setFormData(prev => ({
//         ...prev,
//         tags: [...prev.tags, tagInput.trim()]
//       }));
//       setTagInput('');
//     }
//   };

//   const handleTagRemove = (tagToRemove) => {
//     setFormData(prev => ({
//       ...prev,
//       tags: prev.tags.filter(tag => tag !== tagToRemove)
//     }));
//   };

//   const handleSubmit = () => {
//     if (!formData.title || !formData.excerpt || !formData.content) {
//       alert('Please fill all required fields');
//       return;
//     }

//     if (!formData.image && !formData.imagePreview) {
//       setImageError('Please select a featured image');
//       return;
//     }

//     if (!formData.categoryId) {
//       alert('Please select a category');
//       return;
//     }

//     onSave(formData);
//   };

//   // Cleanup object URLs on component unmount
//   useEffect(() => {
//     return () => {
//       if (formData.imagePreview && formData.imagePreview.startsWith('blob:')) {
//         URL.revokeObjectURL(formData.imagePreview);
//       }
//       if (formData.authorImagePreview && formData.authorImagePreview.startsWith('blob:')) {
//         URL.revokeObjectURL(formData.authorImagePreview);
//       }
//     };
//   }, []);

//   return (
//     <div className="space-y-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Blog Title *
//         </label>
//         <input
//           type="text"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           required
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Slug (Auto-generated)
//         </label>
//         <input
//           type="text"
//           name="slug"
//           value={formData.slug}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Category *
//           </label>
//           <select
//             name="categoryId"
//             value={formData.categoryId}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//           >
//             <option value="">Select Category</option>
//             {categories.map(category => (
//               <option key={category.id} value={category.id}>{category.name}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Read Time
//           </label>
//           <input
//             type="text"
//             name="readTime"
//             value={formData.readTime}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Author *
//           </label>
//           <input
//             type="text"
//             name="author"
//             value={formData.author}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Author Role
//           </label>
//           <input
//             type="text"
//             name="authorRole"
//             value={formData.authorRole}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Author Image (1-5 MB)
//         </label>
        
//         <div className="space-y-3">
//           <input
//             type="file"
//             id="author-image-upload"
//             accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
//             onChange={handleAuthorImageChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
//           />
          
//           {authorImageError && (
//             <p className="text-red-500 text-sm">{authorImageError}</p>
//           )}
          
//           {formData.authorImagePreview && (
//             <div className="relative inline-block">
//               <img
//                 src={formData.authorImagePreview}
//                 alt="Author Preview"
//                 className="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
//               />
//               <button
//                 type="button"
//                 onClick={() => removeImage(true)}
//                 className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
//               >
//                 ×
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Excerpt *
//         </label>
//         <textarea
//           name="excerpt"
//           value={formData.excerpt}
//           onChange={handleChange}
//           rows={3}
//           required
//           placeholder="Brief description of the blog post..."
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Content *
//         </label>
//         <textarea
//           name="content"
//           value={formData.content}
//           onChange={handleChange}
//           rows={8}
//           required
//           placeholder="Write your blog content here..."
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Featured Image * (1-5 MB)
//         </label>
        
//         <div className="space-y-3">
//           <input
//             type="file"
//             id="featured-image-upload"
//             accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
//             onChange={handleImageChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
//           />
          
//           {imageError && (
//             <p className="text-red-500 text-sm">{imageError}</p>
//           )}
          
//           {formData.imagePreview && (
//             <div className="relative inline-block">
//               <img
//                 src={formData.imagePreview}
//                 alt="Featured Image Preview"
//                 className="w-48 h-32 object-cover rounded-lg border-2 border-gray-300"
//               />
//               <button
//                 type="button"
//                 onClick={() => removeImage(false)}
//                 className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
//               >
//                 ×
//               </button>
//             </div>
//           )}
//         </div>
        
//         <p className="text-xs text-gray-500 mt-1">
//           Supported formats: JPEG, PNG, GIF, WebP. File size: 1-5 MB
//         </p>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Tags
//         </label>
//         <div className="flex items-center space-x-2 mb-2">
//           <input
//             type="text"
//             value={tagInput}
//             onChange={(e) => setTagInput(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
//             placeholder="Add a tag..."
//             className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//           />
//           <button
//             type="button"
//             onClick={handleTagAdd}
//             className="px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
//           >
//             Add
//           </button>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {formData.tags.map((tag, index) => (
//             <span
//               key={index}
//               className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
//             >
//               {tag}
//               <button
//                 type="button"
//                 onClick={() => handleTagRemove(tag)}
//                 className="ml-1 text-purple-600 hover:text-purple-800"
//               >
//                 ×
//               </button>
//             </span>
//           ))}
//         </div>
//       </div>

//       <div className="flex items-center space-x-4">
//         <label className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             name="isActive"
//             checked={formData.isActive}
//             onChange={handleChange}
//             className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//           />
//           <span className="text-sm font-medium text-gray-700">Active</span>
//         </label>

//         <label className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             name="featured"
//             checked={formData.featured}
//             onChange={handleChange}
//             className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//           />
//           <span className="text-sm font-medium text-gray-700">Featured</span>
//         </label>
//       </div>

//       <div className="flex justify-end space-x-3 pt-4">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
//         >
//           Cancel
//         </button>
//         <button
//           type="button"
//           onClick={handleSubmit}
//           className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-md hover:from-purple-600 hover:to-blue-700 transition-all duration-200"
//         >
//           {blog ? 'Update Blog' : 'Create Blog'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BlogForm;