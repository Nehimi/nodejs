import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-900">
            Modern Blog
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Home
            </Link>
            <Link 
              to="/blog" 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Blog
            </Link>
            <Link 
              to="/blog/by-year" 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              By Year
            </Link>
            <Link 
              to="/search" 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Search
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/login" 
              className="btn btn-outline"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="btn btn-primary"
            >
              Register
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/blog" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/blog/by-year" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                By Year
              </Link>
              <Link 
                to="/search" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Search
              </Link>
              <div className="pt-4 pb-3 border-t">
                <Link 
                  to="/login" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
