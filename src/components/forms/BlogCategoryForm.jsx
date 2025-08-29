// import React, { useState, useEffect } from 'react';

// const BlogCategoryForm = ({ category, onSave, onCancel }) => {
//   const [formData, setFormData] = useState({
//     category: 'Industry',
//     name: '',
//     title: '',
//     isActive: true,
//     image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400'
//   });

//   const categoryTypes = ['Industry', 'Quality', 'Environment', 'Health', 'Business', 'Technology'];

//   useEffect(() => {
//     if (category) {
//       setFormData({
//         ...category,
//         date: undefined // Remove date from form data as it's auto-generated
//       });
//     }
//   }, [category]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Category Type *
//           </label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//           >
//             {categoryTypes.map(type => (
//               <option key={type} value={type}>{type}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Category Name *
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Category Title *
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
//           Image URL *
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
//         <label className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             name="isActive"
//             checked={formData.isActive}
//             onChange={handleChange}
//             className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//           />
//           <span className="text-sm font-medium text-gray-700">Active Category</span>
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
//           {category ? 'Update Category' : 'Add Category'}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default BlogCategoryForm;







import React, { useState, useEffect } from 'react';

const BlogCategoryForm = ({ category, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    category: 'Industry',
    name: '',
    title: '',
    isActive: true,
    image: null,
    imagePreview: ''
  });

  const [imageError, setImageError] = useState('');

  const categoryTypes = ['Industry', 'Quality', 'Environment', 'Health', 'Business', 'Technology'];

  useEffect(() => {
    if (category) {
      setFormData({
        ...category,
        date: undefined, // Remove date from form data as it's auto-generated
        imagePreview: category.image || ''
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageError('');

    if (file) {
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setImageError('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
        return;
      }

      // Check file size (1MB to 5MB)
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB < 1) {
        setImageError('File size must be at least 1 MB');
        return;
      }
      if (fileSizeInMB > 5) {
        setImageError('File size must not exceed 5 MB');
        return;
      }

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: previewUrl
      }));
    }
  };

  const removeImage = () => {
    if (formData.imagePreview && formData.imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(formData.imagePreview);
    }
    
    setFormData(prev => ({
      ...prev,
      image: null,
      imagePreview: ''
    }));
    
    setImageError('');
    
    // Reset file input
    const fileInput = document.getElementById('image-upload');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.image && !formData.imagePreview) {
      setImageError('Please select an image');
      return;
    }

    onSave(formData);
  };

  // Cleanup object URL on component unmount
  useEffect(() => {
    return () => {
      if (formData.imagePreview && formData.imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(formData.imagePreview);
      }
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          {/* <label className="block text-sm font-medium text-gray-700 mb-1">
            Category Type *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
          >
            {categoryTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select> */}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image * (1-5 MB)
        </label>
        
        {/* File Input */}
        <div className="space-y-3">
          <input
            type="file"
            id="image-upload"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
          />
          
          {/* Error Message */}
          {imageError && (
            <p className="text-red-500 text-sm">{imageError}</p>
          )}
          
          {/* Image Preview */}
          {formData.imagePreview && (
            <div className="relative inline-block">
              <img
                src={formData.imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          )}
        </div>
        
        <p className="text-xs text-gray-500 mt-1">
          Supported formats: JPEG, PNG, GIF, WebP. File size: 1-5 MB
        </p>
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          <span className="text-sm font-medium text-gray-700">Active Category</span>
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-md hover:from-purple-600 hover:to-blue-700 transition-all duration-200"
        >
          {category ? 'Update Category' : 'Add Category'}
        </button>
      </div>
    </div>
  );
};

export default BlogCategoryForm;