// API utility functions for handling requests and errors

const API_BASE_URL = 'http://localhost:3000/api'

// Generic API request function
export const apiRequest = async (endpoint, options = {}) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    // Add auth token if available
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config)
    
    // Handle different response types
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`)
    }
    
    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// Specific API functions
export const api = {
  // Blog posts
  getBlogPosts: (page = 1, limit = 9) => 
    apiRequest(`/blog?page=${page}&limit=${limit}`),
  
  getBlogPost: (slug) => 
    apiRequest(`/blog/slug/${slug}`),
  
  getBlogPostsByYear: (year) => 
    apiRequest(`/blog/by-year${year ? `?year=${year}` : ''}`),
  
  searchPosts: (query) => 
    apiRequest(`/search/posts?q=${encodeURIComponent(query)}`),
  
  // Authentication
  login: (credentials) => 
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  
  register: (userData) => 
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  
  // User profile
  getProfile: () => 
    apiRequest('/auth/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }),
}

// Error handling utility
export const handleApiError = (error, fallbackMessage = 'An error occurred') => {
  console.error('API Error:', error)
  
  if (error.message.includes('Failed to fetch')) {
    return 'Network error - please check your connection'
  }
  
  if (error.message.includes('404')) {
    return 'Resource not found'
  }
  
  if (error.message.includes('401')) {
    return 'Please login to continue'
  }
  
  if (error.message.includes('500')) {
    return 'Server error - please try again later'
  }
  
  return error.message || fallbackMessage
}
