

// import React, { useState, useEffect } from 'react';

// const ProductCategoryForm = ({ category, onSave, onCancel }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     icon: '',
//     description: '',
//     image: ''
//   });

//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState('');
//   const [selectedIcon, setSelectedIcon] = useState(null);
//   const [iconPreviewUrl, setIconPreviewUrl] = useState('');
//   const [imageError, setImageError] = useState('');
//   const [iconError, setIconError] = useState('');
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     if (category) {
//       setFormData(category);
//       setPreviewUrl(category.image);
//       setIconPreviewUrl(category.icon);
//     }
//   }, [category]);

//   const validateAndSetFile = (file, isIcon = false) => {
//     const errorSetter = isIcon ? setIconError : setImageError;
//     const fieldPrefix = isIcon ? 'selectedIcon' : 'selectedFile';
//     const previewPrefix = isIcon ? 'iconPreviewUrl' : 'previewUrl';
    
//     errorSetter('');

//     if (file) {
//       const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
//       if (!allowedTypes.includes(file.type)) {
//         errorSetter('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
//         return;
//       }

//       const fileSizeInMB = file.size / (1024 * 1024);
      
//       if (isIcon) {
//         if (fileSizeInMB > 1) {
//           errorSetter('Icon size must not exceed 1 MB');
//           return;
//         }
//       } else {
//         if (fileSizeInMB < 2) {
//           errorSetter('Image size must be at least 2 MB');
//           return;
//         }
//         if (fileSizeInMB > 5) {
//           errorSetter('Image size must not exceed 5 MB');
//           return;
//         }
//       }

//       const previewUrl = URL.createObjectURL(file);
      
//       if (isIcon) {
//         setSelectedIcon(file);
//         setIconPreviewUrl(previewUrl);
//       } else {
//         setSelectedFile(file);
//         setPreviewUrl(previewUrl);
//       }
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     validateAndSetFile(file, false);
//   };

//   const handleIconChange = (e) => {
//     const file = e.target.files[0];
//     validateAndSetFile(file, true);
//   };

//   const removeImage = (isIcon = false) => {
//     const inputId = isIcon ? 'icon-upload' : 'image-upload';
    
//     if (isIcon) {
//       if (iconPreviewUrl && iconPreviewUrl.startsWith('blob:')) {
//         URL.revokeObjectURL(iconPreviewUrl);
//       }
//       setSelectedIcon(null);
//       setIconPreviewUrl('');
//       setFormData(prev => ({ ...prev, icon: '' }));
//       setIconError('');
//     } else {
//       if (previewUrl && previewUrl.startsWith('blob:')) {
//         URL.revokeObjectURL(previewUrl);
//       }
//       setSelectedFile(null);
//       setPreviewUrl('');
//       setFormData(prev => ({ ...prev, image: '' }));
//       setImageError('');
//     }
    
//     const fileInput = document.getElementById(inputId);
//     if (fileInput) {
//       fileInput.value = '';
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Clear errors when user starts typing
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: '' });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.title.trim()) {
//       newErrors.title = 'Name is required';
//     }
    
//     if (!formData.description.trim()) {
//       newErrors.description = 'Description is required';
//     }
    
//     if (!previewUrl && !category?.image) {
//       setImageError('Image is required');
//     }

//     if (!iconPreviewUrl && !category?.icon) {
//       setIconError('Icon is required');
//     }
    
//     return newErrors;
//   };

//   const handleSubmit = () => {
//     setIsSubmitting(true);
    
//     const formErrors = validateForm();
//     if (Object.keys(formErrors).length > 0 || imageError || iconError) {
//       setErrors(formErrors);
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       // In a real application, you would upload the files to your server/cloud storage
//       // For now, we'll use the preview URLs (base64) or existing images
//       const finalFormData = {
//         ...formData,
//         image: previewUrl || formData.image,
//         icon: iconPreviewUrl || formData.icon
//       };
      
//       onSave(finalFormData);
//     } catch (error) {
//       console.error('Error saving category:', error);
//       setErrors({ submit: 'Failed to save category. Please try again.' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Cleanup object URLs on component unmount
//   useEffect(() => {
//     return () => {
//       if (previewUrl && previewUrl.startsWith('blob:')) {
//         URL.revokeObjectURL(previewUrl);
//       }
//       if (iconPreviewUrl && iconPreviewUrl.startsWith('blob:')) {
//         URL.revokeObjectURL(iconPreviewUrl);
//       }
//     };
//   }, []);

//   return (
//     <div className="space-y-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Name *
//         </label>
//         <input
//           type="text"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           required
//           className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 ${
//             errors.title ? 'border-red-500' : 'border-gray-300'
//           }`}
//           placeholder="Enter Name"
//         />
//         {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
//       </div>

//       {/* Icon Upload Section */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Icon * (Max 1 MB)
//         </label>
        
//         <div className="space-y-3">
//           <input
//             type="file"
//             id="icon-upload"
//             accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
//             onChange={handleIconChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
//           />
          
//           {iconError && (
//             <p className="text-red-500 text-sm">{iconError}</p>
//           )}
          
//           {iconPreviewUrl && (
//             <div className="relative inline-block">
//               <img
//                 src={iconPreviewUrl}
//                 alt="Icon Preview"
//                 className="w-16 h-16 object-cover rounded-lg border-2 border-gray-300"
//               />
//               <button
//                 type="button"
//                 onClick={() => removeImage(true)}
//                 className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
//               >
//                 ×
//               </button>
//             </div>
//           )}
//         </div>
        
//         <p className="text-xs text-gray-500 mt-1">
//           Supported formats: JPEG, PNG, GIF, WebP. Max size: 1 MB
//         </p>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Description *
//         </label>
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           rows={3}
//           required
//           className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 ${
//             errors.description ? 'border-red-500' : 'border-gray-300'
//           }`}
//           placeholder="Enter category description"
//         />
//         {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
//       </div>

//       {/* Image Upload Section */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Image * (2-5 MB)
//         </label>
        
//         <div className="space-y-3">
//           <input
//             type="file"
//             id="image-upload"
//             accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
//             onChange={handleFileChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
//           />
          
//           {imageError && (
//             <p className="text-red-500 text-sm">{imageError}</p>
//           )}
          
//           {previewUrl && (
//             <div className="relative inline-block">
//               <img
//                 src={previewUrl}
//                 alt="Category Preview"
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
//           Supported formats: JPEG, PNG, GIF, WebP. File size: 2-5 MB
//         </p>
//       </div>

//       {/* Submit Error */}
//       {errors.submit && (
//         <div className="bg-red-50 border border-red-200 rounded-md p-3">
//           <p className="text-red-600 text-sm">{errors.submit}</p>
//         </div>
//       )}

//       <div className="flex justify-end space-x-3 pt-4">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
//           disabled={isSubmitting}
//         >
//           Cancel
//         </button>
//         <button
//           type="button"
//           onClick={handleSubmit}
//           disabled={isSubmitting}
//           className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-md hover:from-purple-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
//         >
//           {isSubmitting && (
//             <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//           )}
//           <span>
//             {isSubmitting 
//               ? 'Saving...' 
//               : (category ? 'Update Category' : 'Add Category')
//             }
//           </span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCategoryForm;



import React, { useState, useEffect } from 'react';

const ProductCategoryForm = ({ category, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '', // Add category field
    icon: '',
    description: '',
    image: ''
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [iconPreviewUrl, setIconPreviewUrl] = useState('');
  const [imageError, setImageError] = useState('');
  const [iconError, setIconError] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData(category);
      setPreviewUrl(category.image);
      setIconPreviewUrl(category.icon);
    }
  }, [category]);

  const validateAndSetFile = (file, isIcon = false) => {
    const errorSetter = isIcon ? setIconError : setImageError;
    const fieldPrefix = isIcon ? 'selectedIcon' : 'selectedFile';
    const previewPrefix = isIcon ? 'iconPreviewUrl' : 'previewUrl';
    
    errorSetter('');

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        errorSetter('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
        return;
      }

      const fileSizeInMB = file.size / (1024 * 1024);
      
      if (isIcon) {
        if (fileSizeInMB > 1) {
          errorSetter('Icon size must not exceed 1 MB');
          return;
        }
      } else {
        if (fileSizeInMB < 2) {
          errorSetter('Image size must be at least 2 MB');
          return;
        }
        if (fileSizeInMB > 5) {
          errorSetter('Image size must not exceed 5 MB');
          return;
        }
      }

      const previewUrl = URL.createObjectURL(file);
      
      if (isIcon) {
        setSelectedIcon(file);
        setIconPreviewUrl(previewUrl);
      } else {
        setSelectedFile(file);
        setPreviewUrl(previewUrl);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    validateAndSetFile(file, false);
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    validateAndSetFile(file, true);
  };

  const removeImage = (isIcon = false) => {
    const inputId = isIcon ? 'icon-upload' : 'image-upload';
    
    if (isIcon) {
      if (iconPreviewUrl && iconPreviewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(iconPreviewUrl);
      }
      setSelectedIcon(null);
      setIconPreviewUrl('');
      setFormData(prev => ({ ...prev, icon: '' }));
      setIconError('');
    } else {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
      setSelectedFile(null);
      setPreviewUrl('');
      setFormData(prev => ({ ...prev, image: '' }));
      setImageError('');
    }
    
    const fileInput = document.getElementById(inputId);
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Name is required';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!previewUrl && !category?.image) {
      setImageError('Image is required');
    }

    if (!iconPreviewUrl && !category?.icon) {
      setIconError('Icon is required');
    }
    
    return newErrors;
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0 || imageError || iconError) {
      setErrors(formErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Send the actual file objects instead of blob URLs
      const finalFormData = {
        ...formData,
        // Send the File objects for new uploads, or existing URLs for updates
        image: selectedFile || formData.image,
        icon: selectedIcon || formData.icon
      };
      
      onSave(finalFormData);
    } catch (error) {
      console.error('Error saving category:', error);
      setErrors({ submit: 'Failed to save category. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cleanup object URLs on component unmount
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
      if (iconPreviewUrl && iconPreviewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(iconPreviewUrl);
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter Name"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      {/* Add Category Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category *
        </label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 ${
            errors.category ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter Category"
        />
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
      </div>

      {/* Icon Upload Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Icon * (Max 1 MB)
        </label>
        
        <div className="space-y-3">
          <input
            type="file"
            id="icon-upload"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            onChange={handleIconChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
          />
          
          {iconError && (
            <p className="text-red-500 text-sm">{iconError}</p>
          )}
          
          {iconPreviewUrl && (
            <div className="relative inline-block">
              <img
                src={iconPreviewUrl}
                alt="Icon Preview"
                className="w-16 h-16 object-cover rounded-lg border-2 border-gray-300"
              />
              <button
                type="button"
                onClick={() => removeImage(true)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          )}
        </div>
        
        <p className="text-xs text-gray-500 mt-1">
          Supported formats: JPEG, PNG, GIF, WebP. Max size: 1 MB
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          required
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter category description"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      {/* Image Upload Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image * (2-5 MB)
        </label>
        
        <div className="space-y-3">
          <input
            type="file"
            id="image-upload"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
          />
          
          {imageError && (
            <p className="text-red-500 text-sm">{imageError}</p>
          )}
          
          {previewUrl && (
            <div className="relative inline-block">
              <img
                src={previewUrl}
                alt="Category Preview"
                className="w-48 h-32 object-cover rounded-lg border-2 border-gray-300"
              />
              <button
                type="button"
                onClick={() => removeImage(false)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          )}
        </div>
        
        <p className="text-xs text-gray-500 mt-1">
          Supported formats: JPEG, PNG, GIF, WebP. File size: 2-5 MB
        </p>
      </div>

      {/* Submit Error */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-600 text-sm">{errors.submit}</p>
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-md hover:from-purple-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
        >
          {isSubmitting && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
          <span>
            {isSubmitting 
              ? 'Saving...' 
              : (category ? 'Update Category' : 'Add Category')
            }
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductCategoryForm;