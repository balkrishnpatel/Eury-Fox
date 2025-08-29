

import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, BookOpen, Calendar, User, Tag, Heart, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blogs = () => {
  // Initialize with default blogs and merge with localStorage
  const [blogs, setBlogs] = useState(() => {
    const defaultBlogs = [
      {
        id: 1,
        slug: 'future-of-global-trade',
        title: 'The Future of Global Trade: Trends and Innovations',
        excerpt: 'Exploring how technology and sustainability are reshaping international commerce and creating new opportunities for businesses worldwide.',
        content: 'The global trade landscape is undergoing unprecedented transformation...',
        author: 'Admin',
        authorRole: 'Administrator',
        authorImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
        date: new Date('2025-01-15'),
        publishedAt: new Date('2025-01-15'),
        readTime: '8 min read',
        categoryId: 1,
        categoryName: 'Industry Insights',
        tags: ['Trade', 'Technology', 'Innovation'],
        image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400',
        views: 1247,
        likes: 89,
        comments: 23,
        isActive: true,
        featured: true
      },
      {
        id: 2,
        slug: 'quality-control-standards',
        title: 'Quality Control Standards in Food Industry',
        excerpt: 'Understanding the importance of maintaining high quality standards in food production and distribution.',
        content: 'Quality control in the food industry is paramount for consumer safety...',
        author: 'Admin',
        authorRole: 'Quality Manager',
        authorImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
        date: new Date('2025-01-14'),
        publishedAt: new Date('2025-01-14'),
        readTime: '6 min read',
        categoryId: 2,
        categoryName: 'Quality Control',
        tags: ['Quality', 'Food Safety', 'Standards'],
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
        views: 892,
        likes: 67,
        comments: 15,
        isActive: true,
        featured: false
      },
      {
        id: 3,
        slug: 'sustainable-packaging-solutions',
        title: 'Sustainable Packaging Solutions',
        excerpt: 'Innovative approaches to eco-friendly packaging that reduce environmental impact while maintaining product quality.',
        content: 'Sustainable packaging is becoming increasingly important...',
        author: 'Admin',
        authorRole: 'Sustainability Officer',
        authorImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
        date: new Date('2025-01-13'),
        publishedAt: null,
        readTime: '5 min read',
        categoryId: 3,
        categoryName: 'Sustainability',
        tags: ['Sustainability', 'Packaging', 'Environment'],
        image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400',
        views: 634,
        likes: 45,
        comments: 8,
        isActive: false,
        featured: false
      },
      {
        id: 4,
        slug: 'health-benefits-organic-nuts',
        title: 'Health Benefits of Organic Nuts',
        excerpt: 'Discover the nutritional advantages and health benefits of incorporating organic nuts into your daily diet.',
        content: 'Organic nuts are packed with essential nutrients...',
        author: 'Admin',
        authorRole: 'Nutrition Expert',
        authorImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
        date: new Date('2025-01-12'),
        publishedAt: new Date('2025-01-12'),
        readTime: '7 min read',
        categoryId: 4,
        categoryName: 'Health & Nutrition',
        tags: ['Health', 'Nutrition', 'Organic'],
        image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400',
        views: 1156,
        likes: 78,
        comments: 19,
        isActive: true,
        featured: true
      }
    ];

    try {
      const storedBlogs = localStorage.getItem('blogs');
      if (storedBlogs) {
        const parsedBlogs = JSON.parse(storedBlogs);
        // Merge with default blogs (avoid duplicates by ID)
        const existingIds = defaultBlogs.map(b => b.id);
        const newBlogs = parsedBlogs.filter(b => !existingIds.includes(b.id));
        return [...defaultBlogs, ...newBlogs];
      }
      return defaultBlogs;
    } catch (error) {
      console.error('Error loading blogs from localStorage:', error);
      return defaultBlogs;
    }
  });

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const categories = ['All', 'Industry Insights', 'Quality Control', 'Sustainability', 'Health & Nutrition'];
  const statusOptions = ['All', 'Published', 'Draft', 'Inactive'];

  // Listen for localStorage changes to update blogs list
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const storedBlogs = localStorage.getItem('blogs');
        if (storedBlogs) {
          const parsedBlogs = JSON.parse(storedBlogs);
          setBlogs(prevBlogs => {
            // Keep default blogs and merge with stored blogs
            const defaultBlogs = prevBlogs.filter(b => b.id <= 4); // Assuming first 4 are default
            const existingIds = defaultBlogs.map(b => b.id);
            const newBlogs = parsedBlogs.filter(b => !existingIds.includes(b.id));
            return [...defaultBlogs, ...newBlogs];
          });
        }
      } catch (error) {
        console.error('Error updating blogs from localStorage:', error);
      }
    };

    // Listen for storage events (when localStorage is updated in another tab/component)
    window.addEventListener('storage', handleStorageChange);
    
    // Also check for updates on component mount and periodically
    const interval = setInterval(() => {
      handleStorageChange();
    }, 1000); // Check every second for demo purposes

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Save blogs to localStorage whenever blogs state changes
  useEffect(() => {
    try {
      localStorage.setItem('blogs', JSON.stringify(blogs));
    } catch (error) {
      console.error('Error saving blogs to localStorage:', error);
    }
  }, [blogs]);

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.categoryName === selectedCategory;
    
    let matchesStatus = true;
    if (statusFilter === 'Published') {
      matchesStatus = blog.isActive && blog.publishedAt;
    } else if (statusFilter === 'Draft') {
      matchesStatus = !blog.publishedAt;
    } else if (statusFilter === 'Inactive') {
      matchesStatus = !blog.isActive;
    }
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleViewBlog = (blog) => {
    setSelectedBlog(blog);
    setIsViewModalOpen(true);
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setIsEditModalOpen(true);
  };

  const handleDeleteBlog = (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      const updatedBlogs = blogs.filter(b => b.id !== blogId);
      setBlogs(updatedBlogs);
      
      // Update localStorage
      try {
        localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
      } catch (error) {
        console.error('Error updating localStorage after delete:', error);
      }
    }
  };

  const handleSaveBlog = (blogData) => {
    const updatedBlogs = blogs.map(b => 
      b.id === editingBlog.id ? { ...b, ...blogData } : b
    );
    setBlogs(updatedBlogs);
    
    // Update localStorage
    try {
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    } catch (error) {
      console.error('Error updating localStorage after update:', error);
    }
    
    setIsEditModalOpen(false);
    setEditingBlog(null);
  };

  const getStatusColor = (blog) => {
    if (blog.isActive && blog.publishedAt) return 'bg-green-100 text-green-800';
    if (!blog.publishedAt) return 'bg-yellow-100 text-yellow-800';
    if (!blog.isActive) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (blog) => {
    if (blog.isActive && blog.publishedAt) return 'Published';
    if (!blog.publishedAt) return 'Draft';
    if (!blog.isActive) return 'Inactive';
    return 'Unknown';
  };

  const formatDate = (date) => {
    if (!date) return 'Not set';
    return new Date(date).toLocaleDateString();
  };

  // Function to manually refresh blogs from localStorage (for debugging)
  const refreshBlogs = () => {
    try {
      const storedBlogs = localStorage.getItem('blogs');
      if (storedBlogs) {
        const parsedBlogs = JSON.parse(storedBlogs);
        setBlogs(parsedBlogs);
      }
    } catch (error) {
      console.error('Error refreshing blogs:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600 mt-1">Create and manage your blog content</p>
        </div>
        <div className="flex items-center space-x-3">
          {/* Refresh button for debugging */}
          <button
            onClick={refreshBlogs}
            className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
            title="Refresh blogs from storage"
          >
            🔄 Refresh
          </button>
          <Link
            to="/admin/add-blog"
            className="mt-4 sm:mt-0 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Blog</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Articles</p>
              <p className="text-2xl font-bold text-gray-900">{blogs.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Published</p>
              <p className="text-2xl font-bold text-gray-900">
                {blogs.filter(b => b.isActive && b.publishedAt).length}
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
              <p className="text-sm font-medium text-gray-500">Drafts</p>
              <p className="text-2xl font-bold text-gray-900">
                {blogs.filter(b => !b.publishedAt).length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-100">
              <Edit className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Featured</p>
              <p className="text-2xl font-bold text-gray-900">
                {blogs.filter(b => b.featured).length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100">
              <Filter className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Cards */}
      {filteredBlogs.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
          <p className="text-gray-600 mb-4">
            There are no blogs matching your search criteria.
          </p>
          <Link
            to="/admin/add-blog"
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Create Your First Blog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map(blog => (
            <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <button
                    onClick={() => handleViewBlog(blog)}
                    className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    title="View blog"
                  >
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleEditBlog(blog)}
                    className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    title="Edit blog"
                  >
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteBlog(blog.id)}
                    className="p-1 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                    title="Delete blog"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
                <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-semibold ${getStatusColor(blog)}`}>
                  {getStatusText(blog)}
                </div>
                {blog.featured && (
                  <div className="absolute bottom-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    Featured
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-purple-600 font-medium">{blog.categoryName}</span>
                  <span className="text-xs text-gray-500">{blog.readTime}</span>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{blog.title}</h3>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{blog.excerpt}</p>
                
                <div className="flex items-center space-x-4 mb-3 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{blog.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-3 h-3" />
                    <span>{blog.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>{blog.comments}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-2">
                    <img
                      src={blog.authorImage}
                      alt={blog.author}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>By {blog.author}</span>
                  </div>
                  <span>{formatDate(blog.date)}</span>
                </div>

                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {blog.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                      >
                        <Tag className="w-2 h-2 mr-1" />
                        {tag}
                      </span>
                    ))}
                    {blog.tags.length > 3 && (
                      <span className="text-xs text-gray-500">+{blog.tags.length - 3} more</span>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleViewBlog(blog)}
                    className="text-purple-600 hover:text-purple-800 transition-colors flex items-center space-x-1"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">Read More</span>
                  </button>
                  <button
                    // onClick={() => handleEditBlog(blog)}
                    onClick={() => handleViewBlog(blog)}
                    className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Blog View Modal */}
      {/* {isViewModalOpen && selectedBlog && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsViewModalOpen(false)}></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Blog Details</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setIsViewModalOpen(false);
                        handleEditBlog(selectedBlog);
                      }}
                      className="text-purple-600 hover:text-purple-800 transition-colors p-2"
                      title="Edit blog"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        setIsViewModalOpen(false);
                        handleDeleteBlog(selectedBlog.id);
                      }}
                      className="text-red-600 hover:text-red-800 transition-colors p-2"
                      title="Delete blog"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setIsViewModalOpen(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-2"
                    >
                      ×
                    </button>
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  <div className="space-y-4">
                    <img
                      src={selectedBlog.image}
                      alt={selectedBlog.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedBlog)}`}>
                        {getStatusText(selectedBlog)}
                      </span>
                      {selectedBlog.featured && (
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                      )}
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedBlog.title}</h2>
                      <p className="text-purple-600 font-medium">{selectedBlog.categoryName}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <img
                            src={selectedBlog.authorImage}
                            alt={selectedBlog.author}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="font-medium">{selectedBlog.author}</p>
                            <p className="text-xs text-gray-500">{selectedBlog.authorRole}</p>
                          </div>
                        </div>
                        <span>{selectedBlog.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{selectedBlog.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{selectedBlog.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{selectedBlog.comments}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Excerpt</h3>
                      <p className="text-gray-600">{selectedBlog.excerpt}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Content</h3>
                      <div className="text-gray-600 whitespace-pre-wrap">{selectedBlog.content}</div>
                    </div>

                    {selectedBlog.tags && selectedBlog.tags.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedBlog.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                            >
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Created:</span>
                        <p className="text-gray-600">{formatDate(selectedBlog.date)}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Published:</span>
                        <p className="text-gray-600">{formatDate(selectedBlog.publishedAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
      {/* Improved Blog View Modal */}
{isViewModalOpen && selectedBlog && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    {/* Backdrop */}
    <div 
      className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
      onClick={() => setIsViewModalOpen(false)}
    />
    
    {/* Modal Content */}
    <div className="relative bg-white rounded-2xl shadow-2xl w-2/5 max-h-[90vh] overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b px-6 py-4 flex items-center justify-between z-10">
        <h2 className="text-xl font-semibold text-gray-900">Blog Details</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsViewModalOpen(false);
              handleEditBlog(selectedBlog);
            }}
            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            title="Edit blog"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => {
              setIsViewModalOpen(false);
              handleDeleteBlog(selectedBlog.id);
            }}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete blog"
          >
            <Trash2 size={18} />
          </button>
          <button
            onClick={() => setIsViewModalOpen(false)}
            className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="overflow-y-auto max-h-[calc(90vh-80px)] px-6 pb-6">
        {/* Hero Image */}
        <div className="relative mb-6 -mx-6">
          <img
            src={selectedBlog.image}
            alt={selectedBlog.title}
            className="w-full h-64 sm:h-72 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Status & Featured Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedBlog)}`}>
            {getStatusText(selectedBlog)}
          </span>
          {selectedBlog.featured && (
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              ⭐ Featured
            </span>
          )}
        </div>

        {/* Title & Category */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">
            {selectedBlog.title}
          </h1>
          <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
            {selectedBlog.categoryName}
          </span>
        </div>

        {/* Author & Meta Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl mb-6">
          <div className="flex items-center gap-3">
            <img
              src={selectedBlog.authorImage}
              alt={selectedBlog.author}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-100"
            />
            <div>
              <p className="font-semibold text-gray-900">{selectedBlog.author}</p>
              <p className="text-sm text-gray-600">{selectedBlog.authorRole}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="bg-white px-3 py-1 rounded-lg">📖 {selectedBlog.readTime}</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Eye size={16} />
                {selectedBlog.views}
              </span>
              <span className="flex items-center gap-1">
                <Heart size={16} />
                {selectedBlog.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle size={16} />
                {selectedBlog.comments}
              </span>
            </div>
          </div>
        </div>

        {/* Excerpt */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Summary</h3>
          <p className="text-gray-600 leading-relaxed bg-blue-50 p-4 rounded-xl border-l-4 border-blue-400">
            {selectedBlog.excerpt}
          </p>
        </div>

        {/* Content */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Content</h3>
          <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
            {selectedBlog.content}
          </div>
        </div>

        {/* Tags */}
        {selectedBlog.tags && selectedBlog.tags.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {selectedBlog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-medium hover:from-purple-200 hover:to-pink-200 transition-colors"
                >
                  <Tag size={14} />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
          <div className="text-center sm:text-left">
            <span className="block text-sm font-medium text-gray-500">Created</span>
            <p className="text-gray-900 font-semibold">{formatDate(selectedBlog.date)}</p>
          </div>
          <div className="text-center sm:text-left">
            <span className="block text-sm font-medium text-gray-500">Published</span>
            <p className="text-gray-900 font-semibold">{formatDate(selectedBlog.publishedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

      {/* Blog Edit Modal */}
      {isEditModalOpen && editingBlog && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsEditModalOpen(false)}></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Blog</h3>
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={editingBlog.title}
                      onChange={(e) => setEditingBlog({...editingBlog, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                    <textarea
                      value={editingBlog.excerpt}
                      onChange={(e) => setEditingBlog({...editingBlog, excerpt: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <textarea
                      value={editingBlog.content}
                      onChange={(e) => setEditingBlog({...editingBlog, content: e.target.value})}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editingBlog.isActive}
                        onChange={(e) => setEditingBlog({...editingBlog, isActive: e.target.checked})}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Active</span>
                    </label>

                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editingBlog.featured}
                        onChange={(e) => setEditingBlog({...editingBlog, featured: e.target.checked})}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Featured</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSaveBlog(editingBlog)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-md hover:from-purple-600 hover:to-blue-700 transition-all duration-200"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;