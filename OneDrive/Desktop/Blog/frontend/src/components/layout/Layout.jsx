import React from 'react'
import Header from './Header'
import Footer from './Footer'

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
