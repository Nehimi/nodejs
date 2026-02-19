import React, { useState, useEffect } from 'react'
import { api, handleApiError } from '../utils/api'

function BlogByYearPage() {
  const [blogPostsByYear, setBlogPostsByYear] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedYear, setSelectedYear] = useState('')

  useEffect(() => {
    fetchBlogPostsByYear()
  }, [])

  const fetchBlogPostsByYear = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await api.getBlogPostsByYear()
      setBlogPostsByYear(data.blogPostsByYear || [])
    } catch (err) {
      const errorMessage = handleApiError(err, 'Failed to fetch blog posts')
      setError(errorMessage)
      setBlogPostsByYear([])
    } finally {
      setLoading(false)
    }
  }

  const fetchBlogPostsBySpecificYear = async (year) => {
    try {
      setLoading(true)
      setError(null)
      const data = await api.getBlogPostsByYear(year)
      setBlogPostsByYear(data.blogPostsByYear || [])
      setSelectedYear(year)
    } catch (err) {
      const errorMessage = handleApiError(err, 'Failed to fetch blog posts for this year')
      setError(errorMessage)
      setBlogPostsByYear([])
    } finally {
      setLoading(false)
    }
  }

  const getAllYears = () => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let year = currentYear; year >= 2020; year--) {
      years.push(year)
    }
    return years
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="text-red-500 text-xl mb-4">Error: {error}</div>
        <div className="space-y-4">
          <button 
            onClick={fetchBlogPostsByYear}
            className="btn btn-primary"
          >
            Try Again
          </button>
          <div className="text-sm text-gray-600">
            <p>Troubleshooting tips:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Make sure the backend server is running on port 3000</li>
              <li>Check your internet connection</li>
              <li>Try refreshing the page</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Blog Posts by Year
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Browse through our blog posts organized chronologically by year
        </p>
      </div>

      {/* Year Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => {
              setSelectedYear('')
              fetchBlogPostsByYear()
            }}
            className={`btn ${!selectedYear ? 'btn-primary' : 'btn-outline'}`}
          >
            All Years
          </button>
          {getAllYears().map((year) => (
            <button
              key={year}
              onClick={() => fetchBlogPostsBySpecificYear(year)}
              className={`btn ${selectedYear === year ? 'btn-primary' : 'btn-outline'}`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts by Year */}
      {blogPostsByYear.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-500 text-xl mb-4">
            {selectedYear 
              ? `No blog posts found for ${selectedYear}` 
              : 'No blog posts found'}
          </div>
          <button 
            onClick={() => {
              setSelectedYear('')
              fetchBlogPostsByYear()
            }}
            className="btn btn-primary"
          >
            View All Years
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {blogPostsByYear.map((yearData) => (
            <div key={yearData.year} className="card">
              {/* Year Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b">
                <h2 className="text-2xl font-bold text-gray-900">
                  {yearData.year}
                </h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {yearData.count} post{yearData.count !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {yearData.posts.map((post) => (
                  <article key={post._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    {/* Post Image */}
                    {post.featuredImage && (
                      <div className="mb-4">
                        <img 
                          src={post.featuredImage} 
                          alt={post.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}

                    {/* Post Content */}
                    <div className="mb-2">
                      <span className="text-sm text-blue-600 font-medium">
                        {post.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2">
                      <a 
                        href={`/blog/${post.slug}`}
                        className="text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {post.title}
                      </a>
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt || post.content?.substring(0, 150) + '...'}
                    </p>

                    {/* Post Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        {post.author?.avatar && (
                          <img 
                            src={post.author.avatar} 
                            alt={post.author.username}
                            className="w-6 h-6 rounded-full"
                          />
                        )}
                        <span>{post.author?.username || 'Anonymous'}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span>{post.readTime || 5} min read</span>
                        <span>{post.views || 0} views</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      {blogPostsByYear.length > 0 && (
        <div className="mt-12 text-center">
          <div className="card inline-block">
            <h3 className="text-lg font-semibold mb-2">Summary</h3>
            <div className="text-gray-600">
              <p>Total Years: {blogPostsByYear.length}</p>
              <p>Total Posts: {blogPostsByYear.reduce((sum, year) => sum + year.count, 0)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogByYearPage
