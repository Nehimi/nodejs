// Simple connection test to debug API issues
export const testBackendConnection = async () => {
  console.log('🔍 Testing backend connection...')
  
  try {
    // Test 1: Basic connectivity
    console.log('📍 Testing basic connectivity to http://localhost:3000/api/blog/by-year')
    
    const response = await fetch('http://localhost:3000/api/blog/by-year', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      'Accept': 'application/json'
      }
    })

    console.log('📊 Response status:', response.status)
    console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()))
    
    if (!response.ok) {
      const errorText = await response.text()
      console.log('❌ Error response:', errorText)
      return {
        success: false,
        error: errorText,
        status: response.status
      }
    }

    const data = await response.json()
    console.log('✅ Success! Response data:', data)
    
    return {
      success: true,
      data,
      status: response.status
    }

  } catch (error) {
    console.error('💥 Connection failed:', error)
    
    // Determine error type
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      return {
        success: false,
        error: 'Network error - backend may not be running',
        type: 'NETWORK_ERROR',
        suggestion: 'Make sure backend server is running on port 3000'
      }
    }
    
    if (error.name === 'AbortError') {
      return {
        success: false,
        error: 'Request timeout',
        type: 'TIMEOUT_ERROR',
        suggestion: 'Check if backend is responding slowly'
      }
    }
    
    return {
      success: false,
      error: error.message,
      type: 'UNKNOWN_ERROR'
    }
  }
}

// Test function to run in browser console
export const runConnectionTest = async () => {
  console.log('🚀 Starting backend connection test...')
  console.log('📝 Open browser console (F12) and run: runConnectionTest()')
  
  const result = await testBackendConnection()
  
  if (result.success) {
    console.log('🎉 Backend is connected and working!')
    console.log('📊 Data received:', result.data)
  } else {
    console.log('❌ Backend connection failed!')
    console.log('🔧 Error:', result.error)
    console.log('💡 Suggestion:', result.suggestion)
    console.log('🔍 Type:', result.type)
  }
  
  return result
}

// Auto-run test if in development
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  console.log('🔧 Auto-running connection test in development...')
  setTimeout(runConnectionTest, 1000) // Wait 1 second for page to load
}
