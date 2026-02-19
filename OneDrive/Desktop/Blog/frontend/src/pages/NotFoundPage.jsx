import React from 'react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link 
            to="/" 
            className="btn btn-primary text-lg px-6 py-3"
          >
            Go Home
          </Link>
          
          <div className="text-gray-600">
            <p className="mb-2">You might be looking for:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/blog" className="btn btn-outline">
                Blog Posts
              </Link>
              <Link to="/blog/by-year" className="btn btn-outline">
                Browse by Year
              </Link>
              <Link to="/search" className="btn btn-outline">
                Search
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <img 
            src="https://picsum.photos/seed/404/400/300" 
            alt="404 illustration"
            className="mx-auto rounded-lg opacity-50"
          />
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
