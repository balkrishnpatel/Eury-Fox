
import { apiRequest, apiFormDataRequest } from './config.js';

export const categoriesAPI = {
  // Get all categories
  getAll: async () => {
    return await apiRequest('/categories/getAll', {
      method: 'GET',
    });
  },

  // Get category by ID
  getById: async (categoryId) => {
    return await apiRequest(`/categories/${categoryId}`, {
      method: 'GET',
    });
  },

  // Create new category
  create: async (categoryData) => {
    const formData = new FormData();
    
    // Append text fields
    formData.append('title', categoryData.title);
    formData.append('category', categoryData.category);
    formData.append('description', categoryData.description);
    
    // Append files if they exist
    if (categoryData.icon) {
      formData.append('icon', categoryData.icon);
    }
    if (categoryData.image) {
      formData.append('image', categoryData.image);
    }

    return await apiFormDataRequest('/categories', formData);
  },

  // Update category - Fixed to always send image data
  update: async (categoryId, categoryData) => {
    const formData = new FormData();
    
    // Add the ID to FormData for identification
    formData.append('id', categoryId);
    
    // Append text fields
    if (categoryData.title) formData.append('title', categoryData.title);
    if (categoryData.category) formData.append('category', categoryData.category);
    if (categoryData.description) formData.append('description', categoryData.description);
    
    // Always append icon and image - whether File objects or existing URLs
    if (categoryData.icon) {
      formData.append('icon', categoryData.icon);
    }
    
    if (categoryData.image) {
      formData.append('image', categoryData.image);
    }

    // Use the same endpoint as create since that's what works
    return await apiFormDataRequest('/categories', formData, {
      method: 'POST',
    });
  },

  // Delete category
  delete: async (categoryId) => {
    return await apiRequest(`/categories/${categoryId}`, {
      method: 'DELETE',
    });
  },
};