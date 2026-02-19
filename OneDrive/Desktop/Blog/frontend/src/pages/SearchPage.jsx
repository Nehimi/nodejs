import React, { useState, useEffect } from 'react'

function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    try {
      setLoading(true)
      setSearched(true)
      const response = await fetch(`/api/search/posts?q=${encodeURIComponent(query)}`)
      
      if (!response.ok) {
        throw new Error('Search failed')
      }
      
      const data = await response.json()
      setResults(data.blogPosts || [])
      setError(null)
    } catch (err) {
      setError(err.message)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setQuery(e.target.value)
    if (!e.target.value.trim()) {
      setResults([])
      setSearched(false)
      setError(null)
    }
  }

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Search Blog Posts
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find exactly what you're looking for in our blog
        </p>
      </div>

      {/* Search Form */}
      <div className="max-w-2xl mx-auto mb-12">
        <form onSubmit={handleSearch} className="flex gap-4">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search for blog posts..."
            className="input flex-1"
          />
          <button 
            type="submit" 
            disabled={!query.trim() || loading}
            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p className="text-gray-600">Searching...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-8">
          <div className="text-red-500 mb-4">Error: {error}</div>
          <button onClick={() => setQuery('')} className="btn btn-primary">
            Try Again
          </button>
        </div>
      )}

      {/* No Results */}
      {searched && !loading && !error && results.length === 0 && (
        <div className="text-center py-16">
          <div className="text-gray-500 text-xl mb-4">
            No results found for "{query}"
          </div>
          <p className="text-gray-600 mb-6">
            Try searching with different keywords or browse our blog posts
          </p>
          <a href="/blog" className="btn btn-primary">
            Browse All Posts
          </a>
        </div>
      )}

      {/* Search Results */}
      {searched && !loading && !error && results.length > 0 && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((post) => (
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
      )}

      {/* Search Tips */}
      {!searched && (
        <div className="card max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold mb-4">Search Tips</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Use specific keywords for better results
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Search by author name, category, or tags
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Try different combinations of words
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Browse by year if you're looking for posts from a specific time period
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchPage
