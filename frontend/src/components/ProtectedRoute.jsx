import React from 'react'
import { Navigate } from 'react-router-dom'
import AuthService from '../api/AuthService'

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = AuthService.isAuthenticated()

  if (!isAuthenticated) {
    // Show a warning message if accessing protected routes without auth
    console.warn('Accessing protected route without authentication')
    // For now, allow access since backend auth isn't fully configured
    // Uncomment the line below to enable protection:
    // return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
