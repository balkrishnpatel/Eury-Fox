


export const API_CONFIG = {
  baseURL: 'http://localhost:4000/eury/fox',
  timeout: 30000, // Increased timeout for file uploads
  headers: {
    'Content-Type': 'application/json',
  }
};

// Base fetch wrapper with error handling
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.baseURL}${endpoint}`;
  
  const config = {
    timeout: API_CONFIG.timeout,
    headers: {
      ...API_CONFIG.headers,
      ...options.headers,
    },
    ...options,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout);
    
    const response = await fetch(url, {
      ...config,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    // Log response for debugging
    console.log(`API Request: ${options.method || 'GET'} ${url}`);
    console.log(`Response Status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error Response: ${errorText}`);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('API Response Data:', data);
    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
};

// Helper for FormData requests (file uploads)
export const apiFormDataRequest = async (endpoint, formData, options = {}) => {
  const url = `${API_CONFIG.baseURL}${endpoint}`;
  
  const config = {
    method: 'POST',
    timeout: API_CONFIG.timeout,
    body: formData,
    ...options,
    headers: {
      // Don't set Content-Type for FormData, let browser set it with boundary
      ...options.headers,
    },
  };

  // Remove Content-Type header for FormData requests
  delete config.headers['Content-Type'];

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout);
    
    console.log(`FormData Request: ${config.method} ${url}`);
    console.log('FormData contents:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value instanceof File ? `File: ${value.name}` : value);
    }
    
    const response = await fetch(url, {
      ...config,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    console.log(`Response Status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error Response: ${errorText}`);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('API Response Data:', data);
    return data;
  } catch (error) {
    console.error('FormData Request Error:', error);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
};

// Categories API - Fixed to match your backend structure
export const categoriesAPI = {
  // Get all categories - using correct endpoint
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

  // Create new category - Fixed to properly handle categoryData object
  create: async (categoryData) => {
    // Validate required fields
    if (!categoryData.title || !categoryData.description) {
      throw new Error('Title and description are required');
    }

    const formData = new FormData();
    
    // Append text fields
    formData.append('title', categoryData.title.trim());
    formData.append('category', categoryData.category || categoryData.title.toLowerCase().replace(/\s+/g, '-'));
    formData.append('description', categoryData.description.trim());
    
    // Append files if they exist and are File objects
    if (categoryData.icon && categoryData.icon instanceof File) {
      formData.append('icon', categoryData.icon);
    }
    if (categoryData.image && categoryData.image instanceof File) {
      formData.append('image', categoryData.image);
    }

    return await apiFormDataRequest('/categories', formData);
  },

  // Update category - Fixed to handle partial updates properly
  update: async (categoryId, categoryData) => {
    if (!categoryId) {
      throw new Error('Category ID is required for update');
    }

    const formData = new FormData();
    
    // Append text fields only if they exist
    if (categoryData.title) formData.append('title', categoryData.title.trim());
    if (categoryData.category) formData.append('category', categoryData.category);
    if (categoryData.description) formData.append('description', categoryData.description.trim());
    
    // Append files if they exist and are File objects
    if (categoryData.icon && categoryData.icon instanceof File) {
      formData.append('icon', categoryData.icon);
    }
    if (categoryData.image && categoryData.image instanceof File) {
      formData.append('image', categoryData.image);
    }

    return await apiFormDataRequest(`/categories/${categoryId}`, formData, {
      method: 'PUT',
    });
  },

  // Delete category
  delete: async (categoryId) => {
    if (!categoryId) {
      throw new Error('Category ID is required for deletion');
    }

    return await apiRequest(`/categories/${categoryId}`, {
      method: 'DELETE',
    });
  },
};