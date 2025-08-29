// import React, { useState, useEffect } from 'react';
// import { Plus, Search, Filter, Edit, Trash2, Eye, Package, ArrowLeft } from 'lucide-react';
// import { Link, useLocation } from 'react-router-dom';
// import ProductDetailModal from '../../components/modals/ProductDetailModal';

// const Products = () => {
//   const location = useLocation();
  
//   // Initialize with default products and merge with localStorage
//   const [products, setProducts] = useState(() => {
//     const defaultProducts = [
//       {
//         id: 1,
//         name: 'Organic Mixed Nuts',
//         price: '1899',
//         originalPrice: '2199',
//         unit: 'kg',
//         categoryId: 1,
//         categoryName: 'Healthy Snacks',
//         images: ['https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400'],
//         rating: 4.8,
//         reviews: 124,
//         inStock: true,
//         stockCount: 150,
//         discount: '14%',
//         description: 'Premium quality organic mixed nuts',
//         longDescription: 'Our organic mixed nuts are carefully selected from the finest sources...',
//         features: ['Organic', 'No preservatives', 'Rich in protein'],
//         specifications: { weight: '1kg', origin: 'India', shelf_life: '12 months' },
//         benefits: ['Heart healthy', 'Rich in antioxidants', 'Good source of protein']
//       },
//       {
//         id: 2,
//         name: 'Premium Saffron',
//         price: '15999',
//         originalPrice: '17999',
//         unit: '100g',
//         categoryId: 2,
//         categoryName: 'Spices & Herbs',
//         images: ['https://images.pexels.com/photos/4198024/pexels-photo-4198024.jpeg?auto=compress&cs=tinysrgb&w=400'],
//         rating: 5.0,
//         reviews: 43,
//         inStock: true,
//         stockCount: 25,
//         discount: '11%',
//         description: 'Authentic Kashmir saffron',
//         longDescription: 'Premium quality Kashmir saffron with authentic aroma and color...',
//         features: ['Grade A', 'Kashmir origin', 'Lab tested'],
//         specifications: { weight: '100g', origin: 'Kashmir', grade: 'A+' },
//         benefits: ['Natural antioxidant', 'Enhances flavor', 'Traditional medicine']
//       }
//     ];

//     try {
//       const storedProducts = localStorage.getItem('products');
//       if (storedProducts) {
//         const parsedProducts = JSON.parse(storedProducts);
//         // Merge with default products (avoid duplicates by ID)
//         const existingIds = defaultProducts.map(p => p.id);
//         const newProducts = parsedProducts.filter(p => !existingIds.includes(p.id));
//         return [...defaultProducts, ...newProducts];
//       }
//       return defaultProducts;
//     } catch (error) {
//       console.error('Error loading products from localStorage:', error);
//       return defaultProducts;
//     }
//   });

//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [isFromCategoryPage, setIsFromCategoryPage] = useState(false);

//   const categories = ['All', 'Healthy Snacks', 'Spices & Herbs', 'Dry Fruits & Nuts', 'Beauty & Skin Care'];

//   // Listen for localStorage changes to update products list
//   useEffect(() => {
//     const handleStorageChange = () => {
//       try {
//         const storedProducts = localStorage.getItem('products');
//         if (storedProducts) {
//           const parsedProducts = JSON.parse(storedProducts);
//           setProducts(prevProducts => {
//             // Keep default products and merge with stored products
//             const defaultProducts = prevProducts.filter(p => p.id <= 2); // Assuming first 2 are default
//             const existingIds = defaultProducts.map(p => p.id);
//             const newProducts = parsedProducts.filter(p => !existingIds.includes(p.id));
//             return [...defaultProducts, ...newProducts];
//           });
//         }
//       } catch (error) {
//         console.error('Error updating products from localStorage:', error);
//       }
//     };

//     // Listen for storage events (when localStorage is updated in another tab/component)
//     window.addEventListener('storage', handleStorageChange);
    
//     // Also check for updates on component mount and periodically
//     const interval = setInterval(() => {
//       handleStorageChange();
//     }, 1000); // Check every second for demo purposes

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       clearInterval(interval);
//     };
//   }, []);

//   // Check if we came from category page with a specific category
//   useEffect(() => {
//     if (location.state && location.state.selectedCategory) {
//       setSelectedCategory(location.state.selectedCategory);
//       setIsFromCategoryPage(true);
//     }
//   }, [location]);

//   // Save products to localStorage whenever products state changes
//   useEffect(() => {
//     try {
//       localStorage.setItem('products', JSON.stringify(products));
//     } catch (error) {
//       console.error('Error saving products to localStorage:', error);
//     }
//   }, [products]);

//   const filteredProducts = products.filter(product => {
//     const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === 'All' || product.categoryName === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const handleViewProduct = (product) => {
//     setSelectedProduct(product);
//     setIsDetailModalOpen(true);
//   };

//   const handleDeleteProduct = (productId) => {
//     const updatedProducts = products.filter(p => p.id !== productId);
//     setProducts(updatedProducts);
    
//     // Update localStorage
//     try {
//       localStorage.setItem('products', JSON.stringify(updatedProducts));
//     } catch (error) {
//       console.error('Error updating localStorage after delete:', error);
//     }
//   };

//   const handleUpdateProduct = (updatedProduct) => {
//     const updatedProducts = products.map(p => 
//       p.id === updatedProduct.id ? updatedProduct : p
//     );
//     setProducts(updatedProducts);
    
//     // Update localStorage
//     try {
//       localStorage.setItem('products', JSON.stringify(updatedProducts));
//     } catch (error) {
//       console.error('Error updating localStorage after update:', error);
//     }
    
//     setIsDetailModalOpen(false);
//   };

//   const handleClearFilter = () => {
//     setSelectedCategory('All');
//     setIsFromCategoryPage(false);
//     setSearchTerm('');
//   };

//   // Function to manually refresh products from localStorage (for debugging)
//   const refreshProducts = () => {
//     try {
//       const storedProducts = localStorage.getItem('products');
//       if (storedProducts) {
//         const parsedProducts = JSON.parse(storedProducts);
//         setProducts(parsedProducts);
//       }
//     } catch (error) {
//       console.error('Error refreshing products:', error);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <div className="flex items-center space-x-2">
//             <h1 className="text-3xl font-bold text-gray-900">Products</h1>
//             {isFromCategoryPage && (
//               <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
//                 Filtered by: {selectedCategory}
//               </span>
//             )}
//           </div>
//           <p className="text-gray-600 mt-1">
//             {isFromCategoryPage 
//               ? `Showing products in ${selectedCategory} category`
//               : 'Manage your product inventory'
//             }
//           </p>
//           {isFromCategoryPage && (
//             <button
//               onClick={handleClearFilter}
//               className="mt-2 text-purple-600 hover:text-purple-800 text-sm flex items-center space-x-1"
//             >
//               <ArrowLeft className="w-4 h-4" />
//               <span>Back to all products</span>
//             </button>
//           )}
//         </div>
//         <div className="flex items-center space-x-3">
//           {/* Refresh button for debugging */}
//           <button
//             onClick={refreshProducts}
//             className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
//             title="Refresh products from storage"
//           >
//             🔄 Refresh
//           </button>
//           <Link
//             to="/admin/add-product"
//             className="mt-4 sm:mt-0 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
//           >
//             <Plus className="w-4 h-4" />
//             <span>Add Product</span>
//           </Link>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">
//                 {selectedCategory === 'All' ? 'Total Products' : `Products in ${selectedCategory}`}
//               </p>
//               <p className="text-2xl font-bold text-gray-900">{filteredProducts.length}</p>
//             </div>
//             <div className="p-3 rounded-lg bg-blue-100">
//               <Package className="w-6 h-6 text-blue-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">In Stock</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {filteredProducts.filter(p => p.inStock).length}
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
//               <p className="text-sm font-medium text-gray-500">Low Stock</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {filteredProducts.filter(p => p.stockCount < 50).length}
//               </p>
//             </div>
//             <div className="p-3 rounded-lg bg-orange-100">
//               <Filter className="w-6 h-6 text-orange-600" />
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
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
//           <div className="relative flex-1 max-w-md">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//             />
//           </div>

//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2">
//               <Filter className="w-4 h-4 text-gray-400" />
//               <span className="text-sm text-gray-600">Category:</span>
//             </div>
//             <select
//               value={selectedCategory}
//               onChange={(e) => {
//                 setSelectedCategory(e.target.value);
//                 setIsFromCategoryPage(false);
//               }}
//               className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//             >
//               {categories.map(category => (
//                 <option key={category} value={category}>{category}</option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Products Grid */}
//       {filteredProducts.length === 0 ? (
//         <div className="bg-white rounded-lg shadow-md p-12 text-center">
//           <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
//           <p className="text-gray-600 mb-4">
//             {selectedCategory === 'All' 
//               ? "There are no products matching your search criteria."
//               : `No products found in the "${selectedCategory}" category.`
//             }
//           </p>
//           {isFromCategoryPage && (
//             <button
//               onClick={handleClearFilter}
//               className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
//             >
//               View All Products
//             </button>
//           )}
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {filteredProducts.map(product => (
//             <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
//               <div className="relative">
//                 <img
//                   src={product.images[0]}
//                   alt={product.name}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="absolute top-2 right-2 flex space-x-1">
//                   <button
//                     onClick={() => handleViewProduct(product)}
//                     className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
//                   >
//                     <Eye className="w-4 h-4 text-gray-600" />
//                   </button>
//                   <button
//                     onClick={() => handleDeleteProduct(product.id)}
//                     className="p-1 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
//                   >
//                     <Trash2 className="w-4 h-4 text-red-600" />
//                   </button>
//                 </div>
//                 {product.discount && (
//                   <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
//                     {product.discount} OFF
//                   </div>
//                 )}
//                 <div className={`absolute bottom-2 left-2 px-2 py-1 rounded text-xs font-semibold ${
//                   product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                 }`}>
//                   {product.inStock ? 'In Stock' : 'Out of Stock'}
//                 </div>
//               </div>
              
//               <div className="p-4">
//                 <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
//                 <p className="text-sm text-gray-600 mb-2">{product.categoryName}</p>
                
//                 <div className="flex items-center space-x-1 mb-2">
//                   <div className="flex items-center">
//                     {[...Array(5)].map((_, i) => (
//                       <span
//                         key={i}
//                         className={`text-sm ${
//                           i < Math.floor(product.rating) 
//                             ? 'text-yellow-400' 
//                             : 'text-gray-300'
//                         }`}
//                       >
//                         ★
//                       </span>
//                     ))}
//                   </div>
//                   <span className="text-sm text-gray-600">
//                     {product.rating} ({product.reviews})
//                   </span>
//                 </div>
                
//                 <div className="flex items-center justify-between mb-2">
//                   <div className="flex items-center space-x-2">
//                     <span className="text-lg font-bold text-purple-600">₹{parseInt(product.price).toLocaleString()}</span>
//                     {product.originalPrice && (
//                       <span className="text-sm text-gray-500 line-through">₹{parseInt(product.originalPrice).toLocaleString()}</span>
//                     )}
//                   </div>
//                   <span className="text-sm text-gray-500">/{product.unit}</span>
//                 </div>
                
//                 <div className="flex items-center justify-between">
//                   <span className={`text-sm ${product.stockCount > 50 ? 'text-green-600' : 'text-orange-600'}`}>
//                     Stock: {product.stockCount}
//                   </span>
//                   <button
//                     onClick={() => handleViewProduct(product)}
//                     className="text-purple-600 hover:text-purple-800 transition-colors text-sm font-medium"
//                   >
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Product Detail Modal */}
//       <ProductDetailModal
//         isOpen={isDetailModalOpen}
//         onClose={() => setIsDetailModalOpen(false)}
//         product={selectedProduct}
//         onUpdate={handleUpdateProduct}
//         onDelete={handleDeleteProduct}
//       />
//     </div>
//   );
// };

// export default Products;




// import React, { useState, useEffect } from 'react';
// import { Plus, Search, Filter, Edit, Trash2, Eye, Package, ArrowLeft } from 'lucide-react';
// import { Link, useLocation } from 'react-router-dom';
// import { productsAPI } from '../../lib/api/products.js';
// import { categoriesAPI } from '../../lib/api/productcategories.js';
// import ProductDetailModal from '../../components/modals/ProductDetailModal';
// import LoadingSpinner from '../../components/LoadingSpinner.jsx';

// const Products = () => {
//   const location = useLocation();
  
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [isFromCategoryPage, setIsFromCategoryPage] = useState(false);

//   // Fetch products from API
//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       let response;

//       if (searchTerm) {
//         response = await productsAPI.search(searchTerm);
//       } else if (selectedCategory && selectedCategory !== 'All') {
//         response = await productsAPI.getByCategory(selectedCategory);
//       } else {
//         response = await productsAPI.getAll();
//       }

//       if (response.success) {
//         setProducts(response.data || []);
//       } else {
//         setError('Failed to fetch products');
//       }
//     } catch (err) {
//       setError('Failed to fetch products: ' + err.message);
//       console.error('Error fetching products:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch categories for filter dropdown
//   const fetchCategories = async () => {
//     try {
//       const response = await categoriesAPI.getAll();
//       if (response.success) {
//         setCategories(response.data || []);
//       }
//     } catch (err) {
//       console.error('Error fetching categories:', err);
//     }
//   };

//   // Load data on component mount
//   useEffect(() => {
//     fetchCategories();
//     fetchProducts();
//   }, []);

//   // Refetch products when search term or category changes
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       fetchProducts();
//     }, 300); // Debounce search

//     return () => clearTimeout(timeoutId);
//   }, [searchTerm, selectedCategory]);

//   // Check if we came from category page with a specific category
//   useEffect(() => {
//     if (location.state && location.state.selectedCategory) {
//       setSelectedCategory(location.state.selectedCategory);
//       setIsFromCategoryPage(true);
//     }
//   }, [location]);

//   const handleViewProduct = (product) => {
//     setSelectedProduct(product);
//     setIsDetailModalOpen(true);
//   };

//   const handleDeleteProduct = async (productId) => {
//     if (!window.confirm('Are you sure you want to delete this product?')) {
//       return;
//     }

//     try {
//       const response = await productsAPI.delete(productId);
//       if (response.success) {
//         setProducts(products.filter(p => p.id !== productId));
//         alert('Product deleted successfully!');
//       } else {
//         alert('Failed to delete product');
//       }
//     } catch (err) {
//       alert('Failed to delete product: ' + err.message);
//       console.error('Error deleting product:', err);
//     }
//   };

//   const handleUpdateProduct = async (updatedProduct) => {
//     try {
//       const response = await productsAPI.update(updatedProduct.id, updatedProduct);
//       if (response.success) {
//         setProducts(products.map(p => 
//           p.id === updatedProduct.id ? { ...p, ...response.data } : p
//         ));
//         setIsDetailModalOpen(false);
//         alert('Product updated successfully!');
//       } else {
//         alert('Failed to update product');
//       }
//     } catch (err) {
//       alert('Failed to update product: ' + err.message);
//       console.error('Error updating product:', err);
//     }
//   };

//   const handleClearFilter = () => {
//     setSelectedCategory('All');
//     setIsFromCategoryPage(false);
//     setSearchTerm('');
//   };

//   // Get image URL with fallback
//   const getImageUrl = (images) => {
//     if (!images || images.length === 0) {
//       return 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400';
//     }
//     const imagePath = images[0];
//     return imagePath.startsWith('http') ? imagePath : `http://localhost:4000${imagePath}`;
//   };

//   // Format price
//   const formatPrice = (price) => {
//     const numPrice = typeof price === 'string' ? parseInt(price) : price;
//     return numPrice.toLocaleString();
//   };

//   // Get category name by ID
//   const getCategoryName = (categoryId) => {
//     const category = categories.find(c => c.id === categoryId);
//     return category ? category.title : 'Unknown Category';
//   };

//   // Create category options for filter
//   const categoryOptions = ['All', ...categories.map(cat => cat.category)];

//   if (loading && products.length === 0) {
//     return (
//       <div className="flex justify-center items-center min-h-96">
//         <LoadingSpinner size="lg" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <div className="flex items-center space-x-2">
//             <h1 className="text-3xl font-bold text-gray-900">Products</h1>
//             {isFromCategoryPage && (
//               <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
//                 Filtered by: {selectedCategory}
//               </span>
//             )}
//           </div>
//           <p className="text-gray-600 mt-1">
//             {isFromCategoryPage 
//               ? `Showing products in ${selectedCategory} category`
//               : 'Manage your product inventory'
//             }
//           </p>
//           {isFromCategoryPage && (
//             <button
//               onClick={handleClearFilter}
//               className="mt-2 text-purple-600 hover:text-purple-800 text-sm flex items-center space-x-1"
//             >
//               <ArrowLeft className="w-4 h-4" />
//               <span>Back to all products</span>
//             </button>
//           )}
//         </div>
//         <div className="flex items-center space-x-3">
//           <button
//             onClick={fetchProducts}
//             className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
//             title="Refresh products"
//             disabled={loading}
//           >
//             {loading ? '🔄' : '🔄'} Refresh
//           </button>
//           <Link
//             to="/admin/add-product"
//             className="mt-4 sm:mt-0 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
//           >
//             <Plus className="w-4 h-4" />
//             <span>Add Product</span>
//           </Link>
//         </div>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//           <div className="flex items-center">
//             <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//             </svg>
//             <span className="text-red-700">{error}</span>
//             <button
//               onClick={fetchProducts}
//               className="ml-4 text-red-600 hover:text-red-800 underline"
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">
//                 {selectedCategory === 'All' ? 'Total Products' : `Products in ${selectedCategory}`}
//               </p>
//               <p className="text-2xl font-bold text-gray-900">{products.length}</p>
//             </div>
//             <div className="p-3 rounded-lg bg-blue-100">
//               <Package className="w-6 h-6 text-blue-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">In Stock</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {products.filter(p => p.inStock).length}
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
//               <p className="text-sm font-medium text-gray-500">Low Stock</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {products.filter(p => p.stockCount < 50).length}
//               </p>
//             </div>
//             <div className="p-3 rounded-lg bg-orange-100">
//               <Filter className="w-6 h-6 text-orange-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Categories</p>
//               <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
//             </div>
//             <div className="p-3 rounded-lg bg-purple-100">
//               <Search className="w-6 h-6 text-purple-600" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
//           <div className="relative flex-1 max-w-md">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//             />
//           </div>

//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2">
//               <Filter className="w-4 h-4 text-gray-400" />
//               <span className="text-sm text-gray-600">Category:</span>
//             </div>
//             <select
//               value={selectedCategory}
//               onChange={(e) => {
//                 setSelectedCategory(e.target.value);
//                 setIsFromCategoryPage(false);
//               }}
//               className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//             >
//               {categoryOptions.map(category => (
//                 <option key={category} value={category}>{category}</option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Products Grid */}
//       {loading ? (
//         <div className="text-center py-8">
//           <LoadingSpinner size="md" />
//           <p className="text-gray-600 mt-2">Loading products...</p>
//         </div>
//       ) : products.length === 0 ? (
//         <div className="bg-white rounded-lg shadow-md p-12 text-center">
//           <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
//           <p className="text-gray-600 mb-4">
//             {selectedCategory === 'All' 
//               ? "There are no products matching your search criteria."
//               : `No products found in the "${selectedCategory}" category.`
//             }
//           </p>
//           {isFromCategoryPage && (
//             <button
//               onClick={handleClearFilter}
//               className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
//             >
//               View All Products
//             </button>
//           )}
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {products.map(product => (
//             <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
//               <div className="relative">
//                 <img
//                   src={getImageUrl(product.images)}
//                   alt={product.name}
//                   className="w-full h-48 object-cover"
//                   onError={(e) => {
//                     e.target.src = 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400';
//                   }}
//                 />
//                 <div className="absolute top-2 right-2 flex space-x-1">
//                   <button
//                     onClick={() => handleViewProduct(product)}
//                     className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
//                   >
//                     <Eye className="w-4 h-4 text-gray-600" />
//                   </button>
//                   <button
//                     onClick={() => handleDeleteProduct(product.id)}
//                     className="p-1 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
//                   >
//                     <Trash2 className="w-4 h-4 text-red-600" />
//                   </button>
//                 </div>
//                 {product.discount && (
//                   <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
//                     {product.discount} OFF
//                   </div>
//                 )}
//                 <div className={`absolute bottom-2 left-2 px-2 py-1 rounded text-xs font-semibold ${
//                   product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                 }`}>
//                   {product.inStock ? 'In Stock' : 'Out of Stock'}
//                 </div>
//               </div>
              
//               <div className="p-4">
//                 <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
//                 <p className="text-sm text-gray-600 mb-2">{getCategoryName(product.categoryId)}</p>
                
//                 <div className="flex items-center space-x-1 mb-2">
//                   <div className="flex items-center">
//                     {[...Array(5)].map((_, i) => (
//                       <span
//                         key={i}
//                         className={`text-sm ${
//                           i < Math.floor(product.rating) 
//                             ? 'text-yellow-400' 
//                             : 'text-gray-300'
//                         }`}
//                       >
//                         ★
//                       </span>
//                     ))}
//                   </div>
//                   <span className="text-sm text-gray-600">
//                     {product.rating} ({product.reviews})
//                   </span>
//                 </div>
                
//                 <div className="flex items-center justify-between mb-2">
//                   <div className="flex items-center space-x-2">
//                     <span className="text-lg font-bold text-purple-600">₹{formatPrice(product.price)}</span>
//                     {product.originalPrice && (
//                       <span className="text-sm text-gray-500 line-through">₹{formatPrice(product.originalPrice)}</span>
//                     )}
//                   </div>
//                   <span className="text-sm text-gray-500">/{product.unit}</span>
//                 </div>
                
//                 <div className="flex items-center justify-between">
//                   <span className={`text-sm ${product.stockCount > 50 ? 'text-green-600' : 'text-orange-600'}`}>
//                     Stock: {product.stockCount}
//                   </span>
//                   <button
//                     onClick={() => handleViewProduct(product)}
//                     className="text-purple-600 hover:text-purple-800 transition-colors text-sm font-medium"
//                   >
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Product Detail Modal */}
//       <ProductDetailModal
//         isOpen={isDetailModalOpen}
//         onClose={() => setIsDetailModalOpen(false)}
//         product={selectedProduct}
//         onUpdate={handleUpdateProduct}
//         onDelete={handleDeleteProduct}
//       />
//     </div>
//   );
// };

// export default Products;


import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Package, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { productsAPI } from '../../lib/api/products.js';
import { categoriesAPI } from '../../lib/api/productcategories.js';
import ProductDetailModal from '../../components/modals/ProductDetailModal';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';

const Products = () => {
  const location = useLocation();
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFromCategoryPage, setIsFromCategoryPage] = useState(false);

  // Fetch products function
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let response;

      if (searchTerm) {
        response = await productsAPI.search(searchTerm);
      } else if (selectedCategory && selectedCategory !== 'All') {
        response = await productsAPI.getByCategory(selectedCategory);
      } else {
        response = await productsAPI.getAll();
      }

      // Handle multiple possible response formats
      let productsData = [];
      
      if (response && response.success && response.result) {
        // Check if result contains the products array directly or nested
        if (Array.isArray(response.result)) {
          productsData = response.result;
        } else if (response.result.products && Array.isArray(response.result.products)) {
          productsData = response.result.products;
        } else if (response.result.data && Array.isArray(response.result.data)) {
          productsData = response.result.data;
        } else if (response.result.items && Array.isArray(response.result.items)) {
          productsData = response.result.items;
        } else {
          // Try to find array properties in result
          const arrayKeys = Object.keys(response.result).filter(key => 
            Array.isArray(response.result[key])
          );
          if (arrayKeys.length > 0) {
            productsData = response.result[arrayKeys[0]]; // Use first array found
          } else {
            productsData = [response.result]; // Wrap single item in array
          }
        }
      } else if (response && response.success && response.data) {
        productsData = response.data;
      } else if (response && response.success && response.products) {
        productsData = response.products;
      } else if (response && Array.isArray(response)) {
        productsData = response;
      } else if (response && response.data && Array.isArray(response.data)) {
        productsData = response.data;
      } else if (response && response.results && Array.isArray(response.results)) {
        productsData = response.results;
      } else if (response && response.success === false) {
        setError(response.message || response.error || 'Failed to fetch products');
        return;
      } else {
        setError('Unexpected response format from server');
        return;
      }

      // Ensure we have a valid array
      if (!Array.isArray(productsData)) {
        setError('Invalid data format: expected array of products');
        return;
      }

      setProducts(productsData);
      
    } catch (err) {
      setError('Failed to fetch products: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories function
  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      
      if (response && response.success && response.result) {
        if (Array.isArray(response.result)) {
          setCategories(response.result);
        } else if (response.result.data && Array.isArray(response.result.data)) {
          setCategories(response.result.data);
        } else if (response.result.categories && Array.isArray(response.result.categories)) {
          setCategories(response.result.categories);
        }
      } else if (response && response.success && response.data) {
        setCategories(response.data || []);
      } else if (response && Array.isArray(response)) {
        setCategories(response);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Refetch products when search term or category changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCategory]);

  // Check if we came from category page with a specific category
  useEffect(() => {
    if (location.state && location.state.selectedCategory) {
      setSelectedCategory(location.state.selectedCategory);
      setIsFromCategoryPage(true);
    }
  }, [location]);

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await productsAPI.delete(productId);
      if (response.success) {
        setProducts(products.filter(p => p.id !== productId));
        alert('Product deleted successfully!');
      } else {
        alert('Failed to delete product');
      }
    } catch (err) {
      alert('Failed to delete product: ' + err.message);
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const response = await productsAPI.update(updatedProduct.id, updatedProduct);
      if (response.success) {
        setProducts(products.map(p => 
          p.id === updatedProduct.id ? { ...p, ...response.data } : p
        ));
        setIsDetailModalOpen(false);
        alert('Product updated successfully!');
      } else {
        alert('Failed to update product');
      }
    } catch (err) {
      alert('Failed to update product: ' + err.message);
    }
  };

  const handleClearFilter = () => {
    setSelectedCategory('All');
    setIsFromCategoryPage(false);
    setSearchTerm('');
  };

  // Get image URL with fallback
  const getImageUrl = (images) => {
    if (!images || images.length === 0) {
      return 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400';
    }
    const imagePath = images[0];
    return imagePath.startsWith('http') ? imagePath : `http://localhost:4000${imagePath}`;
  };

  // Format price
  const formatPrice = (price) => {
    const numPrice = typeof price === 'string' ? parseInt(price) : price;
    return numPrice.toLocaleString();
  };

  // Get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.title : 'Unknown Category';
  };

  // Create category options for filter
  const categoryOptions = ['All', ...categories.map(cat => cat.category)];

  if (loading && products.length === 0) {
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
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            {isFromCategoryPage && (
              <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
                Filtered by: {selectedCategory}
              </span>
            )}
          </div>
          <p className="text-gray-600 mt-1">
            {isFromCategoryPage 
              ? `Showing products in ${selectedCategory} category`
              : 'Manage your product inventory'
            }
          </p>
          {isFromCategoryPage && (
            <button
              onClick={handleClearFilter}
              className="mt-2 text-purple-600 hover:text-purple-800 text-sm flex items-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all products</span>
            </button>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={fetchProducts}
            className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
            title="Refresh products"
            disabled={loading}
          >
            Refresh
          </button>
          <Link
            to="/admin/add-product"
            className="mt-4 sm:mt-0 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
        </div>
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
              onClick={fetchProducts}
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
              <p className="text-sm font-medium text-gray-500">
                {selectedCategory === 'All' ? 'Total Products' : `Products in ${selectedCategory}`}
              </p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">In Stock</p>
              <p className="text-2xl font-bold text-gray-900">
                {products.filter(p => p.inStock).length}
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
              <p className="text-sm font-medium text-gray-500">Low Stock</p>
              <p className="text-2xl font-bold text-gray-900">
                {products.filter(p => p.stockCount < 50).length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-orange-100">
              <Filter className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Categories</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100">
              <Search className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Category:</span>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setIsFromCategoryPage(false);
              }}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            >
              {categoryOptions.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-8">
          <LoadingSpinner size="md" />
          <p className="text-gray-600 mt-2">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-4">
            {selectedCategory === 'All' 
              ? "There are no products matching your search criteria."
              : `No products found in the "${selectedCategory}" category.`
            }
          </p>
          {isFromCategoryPage && (
            <button
              onClick={handleClearFilter}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              View All Products
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="relative">
                <img
                  src={getImageUrl(product.images)}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400';
                  }}
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <button
                    onClick={() => handleViewProduct(product)}
                    className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="p-1 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
                {product.discount && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    {product.discount} OFF
                  </div>
                )}
                <div className={`absolute bottom-2 left-2 px-2 py-1 rounded text-xs font-semibold ${
                  product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{getCategoryName(product.categoryId)}</p>
                
                <div className="flex items-center space-x-1 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400' 
                            : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-purple-600">₹{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">₹{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">/{product.unit}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${product.stockCount > 50 ? 'text-green-600' : 'text-orange-600'}`}>
                    Stock: {product.stockCount}
                  </span>
                  <button
                    onClick={() => handleViewProduct(product)}
                    className="text-purple-600 hover:text-purple-800 transition-colors text-sm font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        product={selectedProduct}
        onUpdate={handleUpdateProduct}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
};

export default Products;