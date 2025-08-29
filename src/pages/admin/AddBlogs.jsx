

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, X, Save, Upload } from 'lucide-react';

const AddBlogs = () => {
  
  // Load existing blogs from in-memory storage
  const [savedBlogs, setSavedBlogs] = useState([]);
  
  const initialFormData = {
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    author: 'Admin',
    authorRole: 'Administrator',
    authorImage: null,
    authorImagePreview: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    readTime: '5 min read',
    categoryId: '',
    categoryName: '',
    tags: [],
    image: null,
    imagePreview: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400',
    views: 0,
    likes: 0,
    comments: 0,
    isActive: true,
    featured: false
  };
  
  const [formData, setFormData] = useState(initialFormData);
  const [tagInput, setTagInput] = useState('');
  const [imageError, setImageError] = useState('');
  const [authorImageError, setAuthorImageError] = useState('');

  const [categories] = useState([
    { id: 1, name: 'Industry Insights' },
    { id: 2, name: 'Quality Control' },
    { id: 3, name: 'Sustainability' },
    { id: 4, name: 'Health & Nutrition' }
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'categoryId') {
      const selectedCategory = categories.find(c => c.id === parseInt(value));
      setFormData(prev => ({
        ...prev,
        categoryId: parseInt(value),
        categoryName: selectedCategory ? selectedCategory.name : ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const validateAndSetImage = (file, isAuthorImage = false) => {
    const errorSetter = isAuthorImage ? setAuthorImageError : setImageError;
    const fieldPrefix = isAuthorImage ? 'authorImage' : 'image';
    
    errorSetter('');

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        errorSetter('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
        return;
      }

      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB < 1) {
        errorSetter('File size must be at least 1 MB');
        return;
      }
      if (fileSizeInMB > 5) {
        errorSetter('File size must not exceed 5 MB');
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      
      setFormData(prev => ({
        ...prev,
        [fieldPrefix]: file,
        [`${fieldPrefix}Preview`]: previewUrl
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    validateAndSetImage(file, false);
  };

  const handleAuthorImageChange = (e) => {
    const file = e.target.files[0];
    validateAndSetImage(file, true);
  };

  const removeImage = (isAuthorImage = false) => {
    const fieldPrefix = isAuthorImage ? 'authorImage' : 'image';
    const errorSetter = isAuthorImage ? setAuthorImageError : setImageError;
    const inputId = isAuthorImage ? 'author-image-upload' : 'featured-image-upload';
    
    if (formData[`${fieldPrefix}Preview`] && formData[`${fieldPrefix}Preview`].startsWith('blob:')) {
      URL.revokeObjectURL(formData[`${fieldPrefix}Preview`]);
    }
    
    setFormData(prev => ({
      ...prev,
      [fieldPrefix]: null,
      [`${fieldPrefix}Preview`]: ''
    }));
    
    errorSetter('');
    
    const fileInput = document.getElementById(inputId);
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setTagInput('');
    setImageError('');
    setAuthorImageError('');
  };

  const saveBlog = () => {
    const blogData = {
      id: Date.now(), // Use timestamp as unique ID
      ...formData,
      date: new Date(),
      publishedAt: formData.isActive ? new Date() : null,
      createdAt: new Date().toLocaleDateString(),
      // Convert image files to URLs for demo (in real app, upload to server)
      image: formData.imagePreview || formData.image,
      authorImage: formData.authorImagePreview || formData.authorImage
    };
    
    // Update local state
    const updatedBlogs = [...savedBlogs, blogData];
    setSavedBlogs(updatedBlogs);
    
    console.log('Blog saved:', blogData);
    
    return blogData;
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.excerpt || !formData.content) {
      alert('Please fill in all required fields');
      return;
    }

    if (!formData.image && !formData.imagePreview) {
      setImageError('Please select a featured image');
      return;
    }

    if (!formData.categoryId) {
      alert('Please select a category');
      return;
    }

    saveBlog();
    alert('Blog added successfully!');
    resetForm();
  };

  const handleAddMore = () => {
    if (!formData.title || !formData.excerpt || !formData.content) {
      alert('Please fill in all required fields');
      return;
    }

    if (!formData.image && !formData.imagePreview) {
      setImageError('Please select a featured image');
      return;
    }

    if (!formData.categoryId) {
      alert('Please select a category');
      return;
    }

    const savedBlog = saveBlog();
    alert('Blog saved! Form cleared for next blog.');
    
    // Complete form reset for adding new blog
    resetForm();
    
    // Scroll to top for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      resetForm();
    }
  };

  // Cleanup object URLs on component unmount
  useEffect(() => {
    return () => {
      if (formData.imagePreview && formData.imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(formData.imagePreview);
      }
      if (formData.authorImagePreview && formData.authorImagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(formData.authorImagePreview);
      }
    };
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleCancel}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Blog</h1>
            <p className="text-gray-600 mt-1">Create engaging content for your audience</p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Blogs Created: {savedBlogs.length}
        </div>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blog Title *
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
                  Name
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Read Time
                  </label>
                  <input
                    type="text"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author *
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author Role
                  </label>
                  <input
                    type="text"
                    name="authorRole"
                    value={formData.authorRole}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured</span>
                </label>
              </div>
            </div>
          </div>

          {/* Images Upload */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Images</h2>
            
            <div className="space-y-6">
              {/* Featured Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Featured Image * (1-5 MB)
                </label>
                
                <div className="space-y-3">
                  <input
                    type="file"
                    id="featured-image-upload"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                  />
                  
                  {imageError && (
                    <p className="text-red-500 text-sm">{imageError}</p>
                  )}
                  
                  {formData.imagePreview && (
                    <div className="relative inline-block">
                      <img
                        src={formData.imagePreview}
                        alt="Featured Image Preview"
                        className="w-full h-32 object-cover rounded-lg border-2 border-gray-300"
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
              </div>

              {/* Author Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author Image (1-5 MB)
                </label>
                
                <div className="space-y-3">
                  <input
                    type="file"
                    id="author-image-upload"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    onChange={handleAuthorImageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                  />
                  
                  {authorImageError && (
                    <p className="text-red-500 text-sm">{authorImageError}</p>
                  )}
                  
                  {formData.authorImagePreview && (
                    <div className="relative inline-block">
                      <img
                        src={formData.authorImagePreview}
                        alt="Author Preview"
                        className="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(true)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Content</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Excerpt *
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                required
                placeholder="Brief description of the blog post..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={8}
                required
                placeholder="Write your blog content here..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Tags</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
                placeholder="Add a tag..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
              <button
                type="button"
                onClick={handleTagAdd}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleTagRemove(tag)}
                    className="ml-2 text-purple-600 hover:text-purple-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAddMore}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Save & Add More</span>
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-md hover:from-purple-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save & Finish</span>
          </button>
        </div>
      </div>

      {/* Display Saved Blogs */}
      {savedBlogs.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recently Added Blogs ({savedBlogs.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedBlogs.slice(-6).map((blog) => (
              <div key={blog.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-32 object-cover rounded-md mb-2"
                  />
                )}
                <h3 className="font-semibold text-sm truncate">{blog.title}</h3>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{blog.excerpt}</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-purple-600">{blog.categoryName}</p>
                  <p className="text-xs text-gray-500">{blog.readTime}</p>
                </div>
                <p className="text-xs text-gray-400 mt-1">Added: {blog.createdAt}</p>
                <div className="flex items-center space-x-2 mt-2">
                  {blog.isActive && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                  )}
                  {blog.featured && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Featured</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          {savedBlogs.length > 6 && (
            <p className="text-sm text-gray-500 mt-4 text-center">
              Showing latest 6 blogs of {savedBlogs.length} total
            </p>
            )}
        </div>
      )}
    </div>
  );
};

export default AddBlogs;