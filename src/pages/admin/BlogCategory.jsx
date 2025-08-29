


import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Layers } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import BlogCategoryForm from '../../components/forms/BlogCategoryForm';

const BlogCategory = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      category: 'Industry',
      name: 'Industry Insights',
      title: 'Latest Industry Trends and Analysis',
      isActive: true,
      date: new Date('2025-01-15'),
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      category: 'Quality',
      name: 'Quality Control',
      title: 'Quality Standards and Best Practices',
      isActive: true,
      date: new Date('2025-01-14'),
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      category: 'Environment',
      name: 'Sustainability',
      title: 'Environmental and Sustainable Practices',
      isActive: true,
      date: new Date('2025-01-13'),
      image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      category: 'Health',
      name: 'Health & Nutrition',
      title: 'Health Benefits and Nutritional Information',
      isActive: false,
      date: new Date('2025-01-12'),
      image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // New states for viewing category blogs
  const [viewingCategoryBlogs, setViewingCategoryBlogs] = useState(null);
  const [isBlogsModalOpen, setIsBlogsModalOpen] = useState(false);

  // Sample blogs data for demonstration
  const sampleBlogs = [
    {
      id: 1,
      title: 'The Future of Global Trade: Trends and Innovations',
      categoryName: 'Industry Insights',
      views: 1250,
      likes: 89,
      comments: 23,
      date: new Date('2025-01-15'),
      isActive: true
    },
    {
      id: 2,
      title: 'Quality Control Standards in Food Industry',
      categoryName: 'Quality Control',
      views: 890,
      likes: 67,
      comments: 15,
      date: new Date('2025-01-14'),
      isActive: true
    },
    {
      id: 3,
      title: 'Sustainable Packaging Solutions for Food Products',
      categoryName: 'Sustainability',
      views: 450,
      likes: 32,
      comments: 8,
      date: new Date('2025-01-13'),
      isActive: false
    }
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = (categoryId) => {
    setCategories(categories.filter(c => c.id !== categoryId));
  };

  const handleSaveCategory = (categoryData) => {
    if (editingCategory) {
      setCategories(categories.map(c => 
        c.id === editingCategory.id ? { ...c, ...categoryData } : c
      ));
    } else {
      const newCategory = {
        ...categoryData,
        id: Math.max(...categories.map(c => c.id)) + 1,
        date: new Date()
      };
      setCategories([...categories, newCategory]);
    }
    setIsModalOpen(false);
  };

  const toggleCategoryStatus = (categoryId) => {
    setCategories(categories.map(c => 
      c.id === categoryId ? { ...c, isActive: !c.isActive } : c
    ));
  };

  // New function to handle viewing blogs for a category
  const handleViewBlogs = (category) => {
    setViewingCategoryBlogs(category);
    setIsBlogsModalOpen(true);
  };

  // Filter blogs by category
  const getCategoryBlogs = (categoryName) => {
    return sampleBlogs.filter(blog => blog.categoryName === categoryName);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Categories</h1>
          <p className="text-gray-600 mt-1">Manage your blog categories</p>
        </div>
        <button
          onClick={handleAddCategory}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Blog Category</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Categories</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <Layers className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Categories</p>
              <p className="text-2xl font-bold text-gray-900">
                {categories.filter(c => c.isActive).length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Inactive Categories</p>
              <p className="text-2xl font-bold text-gray-900">
                {categories.filter(c => !c.isActive).length}
              </p>
            </div>
            {/* <div className="p-3 rounded-lg bg-red-100">
              <X className="w-6 h-6 text-red-600" />
            </div> */}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Recent Categories</p>
              <p className="text-2xl font-bold text-gray-900">
                {categories.filter(c => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return c.date > weekAgo;
                }).length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100">
              <Plus className="w-6 h-6 text-purple-600" />
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map(category => (
          <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <div className="relative">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-1">
                <button
                  onClick={() => handleEditCategory(category)}
                  className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <Edit className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="p-1 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
              <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-semibold ${
                category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {category.isActive ? 'Active' : 'Inactive'}
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                  {category.category}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {category.title}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>Created: {category.date.toLocaleDateString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => toggleCategoryStatus(category.id)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    category.isActive 
                      ? 'bg-red-100 text-red-800 hover:bg-red-200'
                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                  }`}
                >
                  {category.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button 
                  onClick={() => handleViewBlogs(category)}
                  className="text-purple-600 hover:text-purple-800 transition-colors text-sm font-medium"
                >
                  View Blogs
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Blog Category Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? 'Edit Blog Category' : 'Add New Blog Category'}
      >
        <BlogCategoryForm
          category={editingCategory}
          onSave={handleSaveCategory}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      {/* Category Blogs View Modal */}
      <Modal
        isOpen={isBlogsModalOpen}
        onClose={() => setIsBlogsModalOpen(false)}
        title={`Blogs in ${viewingCategoryBlogs?.name || ''} Category`}
      >
        {viewingCategoryBlogs && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{viewingCategoryBlogs.name}</h3>
                <p className="text-sm text-gray-600">{viewingCategoryBlogs.title}</p>
              </div>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                {getCategoryBlogs(viewingCategoryBlogs.name).length} Blog{getCategoryBlogs(viewingCategoryBlogs.name).length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="space-y-3">
              {getCategoryBlogs(viewingCategoryBlogs.name).length > 0 ? (
                getCategoryBlogs(viewingCategoryBlogs.name).map(blog => (
                  <div key={blog.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-2">{blog.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{blog.views}</span>
                          </span>
                          <span>❤️ {blog.likes}</span>
                          <span>💬 {blog.comments}</span>
                          <span>{blog.date.toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          blog.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {blog.isActive ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-2">
                    <Eye className="w-12 h-12 mx-auto" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h4>
                  <p className="text-gray-500">There are no blogs in this category yet.</p>
                </div>
              )}
            </div>

            {getCategoryBlogs(viewingCategoryBlogs.name).length > 0 && (
              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Total blogs: {getCategoryBlogs(viewingCategoryBlogs.name).length}</span>
                  <span>Published: {getCategoryBlogs(viewingCategoryBlogs.name).filter(b => b.isActive).length}</span>
                  <span>Drafts: {getCategoryBlogs(viewingCategoryBlogs.name).filter(b => !b.isActive).length}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BlogCategory;












