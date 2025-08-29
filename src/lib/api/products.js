import { apiRequest, apiFormDataRequest } from './config.js';

export const productsAPI = {
  // Get all products
  getAll: async () => {
    return await apiRequest('/products/getAll', {
      method: 'GET',
    });
  },

  // Get products with pagination
  getPaginated: async (page = 1, limit = 10) => {
    return await apiRequest(`/products?page=${page}&limit=${limit}`, {
      method: 'GET',
    });
  },

  // Search products
  search: async (searchTerm) => {
    return await apiRequest(`/products?search=${encodeURIComponent(searchTerm)}`, {
      method: 'GET',
    });
  },
 
  // Filter products by category
  getByCategory: async (categorySlug) => {
    return await apiRequest(`/products?category=${categorySlug}`, {
      method: 'GET',
    });
  },

  // Get categories with their products
  getCategoriesWithProducts: async () => {
    return await apiRequest('/products/categories-by-products', {
      method: 'GET',
    });
  },

  // Get product by ID
  getById: async (productId) => {
    return await apiRequest(`/products/${productId}`, {
      method: 'GET',
    });
  },

  // Create new product
  create: async (productData) => {
    const formData = new FormData();
    
    // Append text fields
    Object.keys(productData).forEach(key => {
      if (key === 'images') {
        // Handle multiple images
        if (productData.images && productData.images.length > 0) {
          productData.images.forEach((image, index) => {
            formData.append(`images`, image);
          });
        }
      } else if (key === 'features' || key === 'benefits') {
        // Handle arrays
        if (Array.isArray(productData[key])) {
          formData.append(key, JSON.stringify(productData[key]));
        }
      } else if (key === 'specifications') {
        // Handle object
        if (typeof productData[key] === 'object') {
          formData.append(key, JSON.stringify(productData[key]));
        }
      } else {
        // Handle regular fields
        formData.append(key, productData[key]);
      }
    });

    return await apiFormDataRequest('/products', formData);
  },

  // Update product
  update: async (productId, productData) => {
    const formData = new FormData();
    
    // Append updated fields
    Object.keys(productData).forEach(key => {
      if (key === 'images') {
        // Handle multiple images
        if (productData.images && productData.images.length > 0) {
          productData.images.forEach((image, index) => {
            formData.append(`images`, image);
          });
        }
      } else if (key === 'features' || key === 'benefits') {
        // Handle arrays
        if (Array.isArray(productData[key])) {
          formData.append(key, JSON.stringify(productData[key]));
        }
      } else if (key === 'specifications') {
        // Handle object
        if (typeof productData[key] === 'object') {
          formData.append(key, JSON.stringify(productData[key]));
        }
      } else {
        // Handle regular fields
        formData.append(key, productData[key]);
      }
    });

    return await apiFormDataRequest(`/products/${productId}`, formData, {
      method: 'PUT',
    });
  },

  // Delete product
  delete: async (productId) => {
    return await apiRequest(`/products/${productId}`, {
      method: 'DELETE',
    });
  },
};