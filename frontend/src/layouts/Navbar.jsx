import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthService from '../api/AuthService'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    setIsAuthenticated(AuthService.isAuthenticated())
    setUser(AuthService.getUser())
  }, [location])

  const handleLogout = () => {
    AuthService.removeToken()
    AuthService.removeUser()
    setIsAuthenticated(false)
    setUser(null)
    navigate('/login')
  }

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 shadow-2xl sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">C</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Customer <span className="font-light">Manager</span>
            </h1>
          </div>
          
          <div className="flex space-x-2">
            <Link
              to="/customers"
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center ${
                location.pathname === '/customers'
                  ? 'bg-white text-indigo-600 shadow-lg'
                  : 'text-white hover:bg-white hover:bg-opacity-20'
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              All Customers
            </Link>
            <Link
              to="/dashboard"
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center ${
                location.pathname === '/dashboard'
                  ? 'bg-white text-indigo-600 shadow-lg'
                  : 'text-white hover:bg-white hover:bg-opacity-20'
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Dashboard
            </Link>
            <Link
              to="/add"
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center ${
                location.pathname === '/add'
                  ? 'bg-white text-indigo-600 shadow-lg'
                  : 'text-white hover:bg-white hover:bg-opacity-20'
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Customer
            </Link>

            {/* Authentication Links */}
            <div className="flex items-center space-x-2 ml-4 border-l border-white border-opacity-30 pl-4">
              {isAuthenticated ? (
                <>
                  {user && (
                    <span className="text-white text-sm mr-2 px-3 py-1 bg-white bg-opacity-20 rounded-lg">
                      Welcome, {user.firstName || user.name || 'User'}
                    </span>
                  )}
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center text-white hover:bg-white hover:bg-opacity-20"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-6 py-2.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center text-white hover:bg-white hover:bg-opacity-20"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-6 py-2.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center bg-white text-indigo-600 shadow-lg"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
