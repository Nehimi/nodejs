import React, { useState, useEffect } from 'react'

function ProfilePage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
      setLoading(false)
    } else {
      setError('No user logged in')
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="text-red-500 text-xl mb-4">Error: {error}</div>
        <a href="/login" className="btn btn-primary">
          Go to Login
        </a>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-500 text-xl mb-4">
          Please log in to view your profile
        </div>
        <a href="/login" className="btn btn-primary">
          Login
        </a>
      </div>
    )
  }

  return (
    <div className="fade-in">
      {/* Profile Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          My Profile
        </h1>
        <p className="text-gray-600">
          Manage your account and view your blog posts
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            
            {/* Avatar */}
            <div className="text-center mb-6">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.username}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-400 text-3xl">
                    {user.firstName?.[0] || user.username?.[0] || 'U'}
                  </span>
                </div>
              )}
              
              <h3 className="text-lg font-semibold">
                {user.firstName && user.lastName 
                  ? `${user.firstName} ${user.lastName}`
                  : user.username
                }
              </h3>
              <p className="text-gray-600">@{user.username}</p>
            </div>

            {/* User Details */}
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <p className="text-gray-900">{user.email}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Role</label>
                <p className="text-gray-900 capitalize">{user.role || 'User'}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Member Since</label>
                <p className="text-gray-900">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>

              {user.bio && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Bio</label>
                  <p className="text-gray-900">{user.bio}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <button className="btn btn-primary w-full">
                Edit Profile
              </button>
              <button className="btn btn-outline w-full">
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="lg:col-span-2">
          <div className="card mb-8">
            <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
                <p className="text-gray-600">Blog Posts</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">0</div>
                <p className="text-gray-600">Total Likes</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
                <p className="text-gray-600">Comments</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="text-center text-gray-500 py-8">
                <p>No recent activity</p>
                <p className="text-sm">Start creating blog posts to see your activity here</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <a href="/blog/new" className="btn btn-primary w-full">
                Create New Post
              </a>
              <a href="/blog/my" className="btn btn-outline w-full">
                My Blog Posts
              </a>
              <a href="/comments/my" className="btn btn-outline w-full">
                My Comments
              </a>
              <a href="/search" className="btn btn-outline w-full">
                Search Blog
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
