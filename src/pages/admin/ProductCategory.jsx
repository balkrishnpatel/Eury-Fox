import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Grid3X3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { categoriesAPI } from '../../lib/api/productcategories.js';
import Modal from '../../components/ui/Modal';
import ProductCategoryForm from '../../components/forms/ProductCategoryForm';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';

const ProductCategory = () => {
  const navigate = useNavigate();
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await categoriesAPI.getAll();
      console.log('API Response:', response); // Debug log
      
      if (response.success) {
        // Handle different response structures
        let categoryData = [];
        if (response.data) {
          categoryData = response.data;
        } else if (response.result) {
          categoryData = Array.isArray(response.result) ? response.result : [response.result];
        } else if (response.categories) {
          categoryData = response.categories;
        }
        
        // Normalize the data structure
        const normalizedCategories = categoryData.map(category => ({
          ...category,
          id: category.id || category._id, // Ensure we have an id field
        }));
        
        setCategories(normalizedCategories);
        console.log('Normalized Categories:', normalizedCategories); // Debug log
      } else {
        setError('Failed to fetch categories');
      }
    } catch (err) {
      setError('Failed to fetch categories: ' + err.message);
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter(category =>
    (category.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      const response = await categoriesAPI.delete(categoryId);
      if (response.success) {
        setCategories(categories.filter(c => (c.id || c._id) !== categoryId));
        alert('Category deleted successfully!');
      } else {
        alert('Failed to delete category');
      }
    } catch (err) {
      alert('Failed to delete category: ' + err.message);
      console.error('Error deleting category:', err);
    }
  };

  const handleSaveCategory = async (categoryData) => {
    try {
      let response;
      if (editingCategory) {
        // Update existing category
        const categoryId = editingCategory.id || editingCategory._id;
        response = await categoriesAPI.update(categoryId, categoryData);
        if (response.success) {
          const updatedCategory = {
            ...(response.data || response.result),
            id: (response.data || response.result).id || (response.data || response.result)._id
          };
          setCategories(categories.map(c => 
            (c.id || c._id) === categoryId ? updatedCategory : c
          ));
          alert('Category updated successfully!');
        }
      } else {
        // Create new category
        response = await categoriesAPI.create(categoryData);
        if (response.success) {
          const newCategory = {
            ...(response.data || response.result),
            id: (response.data || response.result).id || (response.data || response.result)._id
          };
          setCategories([...categories, newCategory]);
          alert('Category created successfully!');
        }
      }
      
      if (response.success) {
        setIsModalOpen(false);
        setEditingCategory(null);
      } else {
        alert('Failed to save category: ' + (response.message || 'Unknown error'));
      }
    } catch (err) {
      alert('Failed to save category: ' + err.message);
      console.error('Error saving category:', err);
    }
  };

  const handleViewProducts = (category) => {
    // Navigate to products page with category filter
    navigate('/admin/products', { 
      state: { selectedCategory: category.category } 
    });
  };

  // Get image URL with fallback
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400';
    return imagePath.startsWith('http') ? imagePath : `http://localhost:4000${imagePath}`;
  };

  // Get icon URL with fallback
  const getIconUrl = (iconPath) => {
    if (!iconPath) return null;
    return iconPath.startsWith('http') ? iconPath : `http://localhost:4000${iconPath}`;
  };

  // Count categories by type
  const getCategoryStats = () => {
    const foodCategories = categories.filter(c => 
      (c.category || '').toLowerCase().includes('food') || 
      (c.category || '').toLowerCase().includes('snack') ||
      (c.title || '').toLowerCase().includes('food') || 
      (c.title || '').toLowerCase().includes('snack')
    ).length;
    
    const beautyCategories = categories.filter(c => 
      (c.category || '').toLowerCase().includes('beauty') || 
      (c.category || '').toLowerCase().includes('skin') ||
      (c.title || '').toLowerCase().includes('beauty') || 
      (c.title || '').toLowerCase().includes('skin')
    ).length;
    
    return { foodCategories, beautyCategories };
  };

  const { foodCategories, beautyCategories } = getCategoryStats();

  if (loading && categories.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Categories</h1>
          <p className="text-gray-600 mt-1">Manage your product categories ({categories.length} total)</p>
        </div>
        <button
          onClick={handleAddCategory}
          disabled={loading}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product Category</span>
        </button>
      </div>

     

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-red-700">{error}</span>
            <button
              onClick={fetchCategories}
              className="ml-4 text-red-600 hover:text-red-800 underline"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Categories</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <Grid3X3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Food Categories</p>
              <p className="text-2xl font-bold text-gray-900">{foodCategories}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <span className="text-2xl">🥜</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Beauty Categories</p>
              <p className="text-2xl font-bold text-gray-900">{beautyCategories}</p>
            </div>
            <div className="p-3 rounded-lg bg-pink-100">
              <span className="text-2xl">💄</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Categories</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>

      {/* Categories Grid */}
      {loading ? (
        <div className="text-center py-8">
          <LoadingSpinner size="md" />
          <p className="text-gray-600 mt-2">Loading categories...</p>
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Grid3X3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'No categories match your search criteria.' : 'Get started by creating your first category.'}
          </p>
          {!searchTerm && (
            <button
              onClick={handleAddCategory}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              Add Category
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map(category => (
            <div key={category.id || category._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="relative">
                <img
                  src={getImageUrl(category.image)}
                  alt={category.title || 'Category'}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400';
                  }}
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id || category._id)}
                    className="p-1 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
                <div className="absolute top-2 left-2 bg-white rounded-full p-2 shadow-md">
                  {getIconUrl(category.icon) ? (
                    <img 
                      src={getIconUrl(category.icon)} 
                      alt={`${category.title} icon`}
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                  ) : null}
                  <span className="text-xl" style={{ display: getIconUrl(category.icon) ? 'none' : 'block' }}>
                    🏷️
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{category.title || 'Untitled'}</h3>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                    {category.category || 'uncategorized'}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {category.description || 'No description available'}
                </p>
                
                <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                  <span>Created: {category.createdAt ? new Date(category.createdAt).toLocaleDateString() : 'Unknown'}</span>
                  <span>Updated: {category.updatedAt ? new Date(category.updatedAt).toLocaleDateString() : 'Unknown'}</span>
                </div>
                
                <button 
                  onClick={() => handleViewProducts(category)}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:from-purple-600 hover:to-blue-700 transition-all duration-200"
                >
                  View Products
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
 
      {/* Category Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? 'Edit Category' : 'Add New Product Category'}
      >
        <ProductCategoryForm
          category={editingCategory}
          onSave={handleSaveCategory}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default ProductCategory;