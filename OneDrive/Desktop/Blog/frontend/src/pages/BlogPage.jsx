import React, { useState, useEffect } from 'react'

function BlogPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    fetchBlogPosts()
  }, [currentPage])

  const fetchBlogPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/blog?page=${currentPage}&limit=9`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts')
      }
      
      const data = await response.json()
      setPosts(data.blogPosts || [])
      setTotalPages(data.pagination?.pages || 0)
      setError(null)
    } catch (err) {
      setError(err.message)
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
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
        <button onClick={fetchBlogPosts} className="btn btn-primary">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Blog Posts
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover the latest stories, insights, and ideas from our community
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-500 text-xl mb-4">
            No blog posts found
          </div>
          <a href="/blog/by-year" className="btn btn-primary">
            Browse by Year
          </a>
        </div>
      ) : (
        <>
          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map((post) => (
              <article key={post._id} className="card hover:shadow-lg transition-shadow">
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
                
                <h3 className="text-xl font-semibold mb-2">
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
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
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
                  <div className="flex flex-wrap gap-2">
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`btn ${currentPage === page ? 'btn-primary' : 'btn-outline'}`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default BlogPage
