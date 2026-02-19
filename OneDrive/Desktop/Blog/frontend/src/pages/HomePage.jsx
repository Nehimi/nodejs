import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to Modern Blog
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover amazing stories, insights, and ideas from our community of writers
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/blog" className="btn btn-primary text-lg px-6 py-3">
            Read Blog Posts
          </Link>
          <Link to="/blog/by-year" className="btn btn-outline text-lg px-6 py-3">
            Browse by Year
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose Our Blog Platform?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="mb-4">
              <svg className="h-12 w-12 text-blue-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Rich Content</h3>
            <p className="text-gray-600">
              Support for markdown, images, and code snippets to create engaging blog posts
            </p>
          </div>

          <div className="card text-center">
            <div className="mb-4">
              <svg className="h-12 w-12 text-blue-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Powerful Search</h3>
            <p className="text-gray-600">
              Find exactly what you're looking for with our advanced search functionality
            </p>
          </div>

          <div className="card text-center">
            <div className="mb-4">
              <svg className="h-12 w-12 text-blue-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Organized by Time</h3>
            <p className="text-gray-600">
              Browse posts chronologically with our year-based organization system
            </p>
          </div>
        </div>
      </section>

      {/* Recent Posts Preview */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Latest Blog Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((post) => (
            <div key={post} className="card hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">Featured Image</span>
                </div>
              </div>
              <div className="mb-2">
                <span className="text-sm text-blue-600 font-medium">Technology</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                <Link to="/blog/sample-post" className="text-gray-900 hover:text-blue-600">
                  Getting Started with Modern Web Development
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">
                Learn the fundamentals of modern web development with React, Node.js, and more...
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <span>John Doe</span>
                <span className="mx-2">•</span>
                <span>5 min read</span>
                <span className="mx-2">•</span>
                <span>2 days ago</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/blog" className="btn btn-primary">
            View All Posts
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-50 rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Start Your Blogging Journey
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our community and share your stories with the world
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn btn-primary text-lg px-6 py-3">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-outline text-lg px-6 py-3">
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
