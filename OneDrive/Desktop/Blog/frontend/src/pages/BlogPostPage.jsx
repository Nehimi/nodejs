import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (slug) {
      fetchBlogPost(slug)
    }
  }, [slug])

  const fetchBlogPost = async (postSlug) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/blog/slug/${postSlug}`)
      
      if (!response.ok) {
        throw new Error('Blog post not found')
      }
      
      const data = await response.json()
      setPost(data.blogPost)
      setError(null)
    } catch (err) {
      setError(err.message)
      setPost(null)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog post...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="text-red-500 text-xl mb-4">Error: {error}</div>
        <a href="/blog" className="btn btn-primary">
          Back to Blog
        </a>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-500 text-xl mb-4">
          Blog post not found
        </div>
        <a href="/blog" className="btn btn-primary">
          Back to Blog
        </a>
      </div>
    )
  }

  return (
    <div className="fade-in">
      {/* Back Button */}
      <div className="mb-6">
        <a href="/blog" className="btn btn-outline">
          ← Back to Blog
        </a>
      </div>

      {/* Blog Post Header */}
      <header className="mb-8">
        <div className="mb-4">
          <span className="text-sm text-blue-600 font-medium">
            {post.category}
          </span>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="mb-6">
            <img 
              src={post.featuredImage} 
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Post Meta */}
        <div className="flex items-center justify-between text-gray-600 mb-6">
          <div className="flex items-center space-x-4">
            {post.author?.avatar && (
              <img 
                src={post.author.avatar} 
                alt={post.author.username}
                className="w-10 h-10 rounded-full"
              />
            )}
            <div>
              <div className="font-medium">
                {post.author?.username || 'Anonymous'}
              </div>
              <div className="text-sm">
                {post.author?.firstName && post.author?.lastName 
                  ? `${post.author.firstName} ${post.author.lastName}`
                  : ''
                }
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            <div>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="flex items-center space-x-4 mt-1">
              <span>{post.readTime || 5} min read</span>
              <span>{post.views || 0} views</span>
              <span>{post.likesCount || 0} likes</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span 
                key={index}
                className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Blog Post Content */}
      <article className="prose prose-lg max-w-none">
        <div 
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Post Footer */}
      <footer className="mt-12 pt-8 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="btn btn-primary">
              Like Post ({post.likesCount || 0})
            </button>
            <button className="btn btn-outline">
              Share
            </button>
          </div>
          <div className="text-sm text-gray-500">
            Published on {new Date(post.publishedAt).toLocaleDateString()}
          </div>
        </div>
      </footer>

      {/* Related Posts */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Related Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((relatedPost) => (
            <div key={relatedPost} className="card">
              <div className="mb-4">
                <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">Related Post Image</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                <a href="/blog/related-post" className="text-gray-900 hover:text-blue-600">
                  Related Blog Post Title
                </a>
              </h3>
              <p className="text-gray-600 text-sm">
                Brief description of related blog post...
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default BlogPostPage
