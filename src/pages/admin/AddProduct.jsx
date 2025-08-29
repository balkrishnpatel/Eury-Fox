


import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, X, Save, Upload, IndianRupee } from 'lucide-react';

const AddProduct = ({ onProductAdd, navigate }) => {
  // Load existing products from state on component mount
  const [savedProducts, setSavedProducts] = useState(() => {
    // Using in-memory storage instead of localStorage for Claude.ai compatibility
    return [];
  });
  
  const initialFormData = {
    name: '',
    price: '',
    originalPrice: '',
    unit: 'kg',
    categoryId: '',
    images: [],
    rating: 4.5,
    reviews: 0,
    inStock: true,
    stockCount: 0,
    discount: '',
    description: '',
    longDescription: '',
    features: [''],
    specifications: [{ key: '', value: '' }], // Changed to array of key-value pairs
    benefits: ['']
  };
  
  const [formData, setFormData] = useState(initialFormData);

  const [categories] = useState([
    { id: 1, name: 'Healthy Snacks' },
    { id: 2, name: 'Spices & Herbs' },
    { id: 3, name: 'Dry Fruits & Nuts' },
    { id: 4, name: 'Beauty & Skin Care' }
  ]);

  const units = ['kg', 'g', '100g', '250g', '500g', 'piece', 'pack', 'bottle', 'jar'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Auto-calculate original price when discount is entered
    if (name === 'discount' && value && formData.price) {
      const discountPercent = parseFloat(value);
      const currentPrice = parseFloat(formData.price);
      if (!isNaN(discountPercent) && !isNaN(currentPrice) && discountPercent > 0) {
        const originalPrice = currentPrice / (1 - discountPercent / 100);
        setFormData(prev => ({
          ...prev,
          [name]: value,
          originalPrice: originalPrice.toFixed(2)
        }));
        return;
      }
    }
    
    // Auto-calculate original price when price is entered and discount exists
    if (name === 'price' && value && formData.discount) {
      const discountPercent = parseFloat(formData.discount);
      const currentPrice = parseFloat(value);
      if (!isNaN(discountPercent) && !isNaN(currentPrice) && discountPercent > 0) {
        const originalPrice = currentPrice / (1 - discountPercent / 100);
        setFormData(prev => ({
          ...prev,
          [name]: value,
          originalPrice: originalPrice.toFixed(2)
        }));
        return;
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle file upload for images
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imagePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(images => {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...images]
      }));
    });
  };

  // Remove image
  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleArrayChange = (index, value, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  // Handle specifications change
  const handleSpecificationChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.map((spec, i) => 
        i === index ? { ...spec, [field]: value } : spec
      )
    }));
  };

  const addArrayItem = (field) => {
    if (field === 'specifications') {
      setFormData(prev => ({
        ...prev,
        specifications: [...prev.specifications, { key: '', value: '' }]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], '']
      }));
    }
  };

  const removeArrayItem = (index, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const saveProduct = () => {
    const categoryName = categories.find(cat => cat.id == formData.categoryId)?.name || 'Unknown';
    
    // Convert specifications array to object for easier use
    const specificationsObj = {};
    formData.specifications.forEach(spec => {
      if (spec.key.trim() && spec.value.trim()) {
        specificationsObj[spec.key.trim()] = spec.value.trim();
      }
    });
    
    const productData = {
      id: Date.now(),
      ...formData,
      categoryName,
      createdAt: new Date().toLocaleDateString(),
      // Convert price to proper format
      price: formData.price.toString(),
      originalPrice: formData.originalPrice ? formData.originalPrice.toString() : '',
      // Ensure proper data types
      stockCount: parseInt(formData.stockCount) || 0,
      rating: parseFloat(formData.rating) || 4.5,
      reviews: parseInt(formData.reviews) || 0,
      discount: formData.discount ? `${formData.discount}%` : '',
      // Filter out empty features and benefits
      features: formData.features.filter(f => f.trim() !== ''),
      benefits: formData.benefits.filter(b => b.trim() !== ''),
      specifications: specificationsObj
    };
    
    // Update local state
    const updatedProducts = [...savedProducts, productData];
    setSavedProducts(updatedProducts);
    
    // Call parent callback if provided
    if (onProductAdd) {
      onProductAdd(productData);
    }
    
    console.log('Product saved:', productData);
    
    return productData;
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.price || !formData.categoryId) {
      alert('Please fill in all required fields');
      return;
    }

    saveProduct();
    alert('Product added successfully!');
    resetForm();
    
    // Navigate back to products page if navigate function is provided
    if (navigate) {
      navigate('/admin/products');
    }
  };

  const handleAddMore = () => {
    if (!formData.name || !formData.price || !formData.categoryId) {
      alert('Please fill in all required fields');
      return;
    }

    const savedProduct = saveProduct();
    alert('Product saved! Form cleared for next product.');
    
    // Complete form reset for adding new product
    resetForm();
    
    // Scroll to top for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      resetForm();
      // Navigate back to products page if navigate function is provided
      if (navigate) {
        navigate('/admin/products');
      }
    }
  };

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
            <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-gray-600 mt-1">Fill in the product details below</p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Products Added: {savedProducts.length}
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
                  Product Name *
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IndianRupee className="h-4 w-4 text-gray-500" />
                    </div>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    placeholder="15"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Original Price (Auto-calculated)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IndianRupee className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    readOnly
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit *
                  </label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  >
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Count
                  </label>
                  <input
                    type="number"
                    name="stockCount"
                    value={formData.stockCount}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    step="0.1"
                    min="0"
                    max="5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reviews Count
                  </label>
                  <input
                    type="number"
                    name="reviews"
                    value={formData.reviews}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="inStock"
                      checked={formData.inStock}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm font-medium text-gray-700">In Stock</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Images Upload */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Images</h2>
            
            <div className="space-y-4">
              {/* File Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload images</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB each</p>
                </label>
              </div>

              {/* Preview uploaded images */}
              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-full h-24 object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Descriptions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Descriptions</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Long Description
              </label>
              <textarea
                name="longDescription"
                value={formData.longDescription}
                onChange={handleChange}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Features, Benefits, and Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Features */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Features</h2>
            
            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleArrayChange(index, e.target.value, 'features')}
                    placeholder="Feature"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, 'features')}
                      className="p-2 text-red-600 hover:text-red-800 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('features')}
                className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Feature</span>
              </button>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Benefits</h2>
            
            <div className="space-y-3">
              {formData.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => handleArrayChange(index, e.target.value, 'benefits')}
                    placeholder="Benefit"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  />
                  {formData.benefits.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, 'benefits')}
                      className="p-2 text-red-600 hover:text-red-800 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('benefits')}
                className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Benefit</span>
              </button>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h2>
            
            <div className="space-y-3">
              {formData.specifications.map((spec, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={spec.key}
                      onChange={(e) => handleSpecificationChange(index, 'key', e.target.value)}
                      placeholder="Specification name"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    />
                    {formData.specifications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, 'specifications')}
                        className="p-2 text-red-600 hover:text-red-800 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                    placeholder="Specification value"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 text-sm"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('specifications')}
                className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Specification</span>
              </button>
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
    </div>
  );
};

export default AddProduct;