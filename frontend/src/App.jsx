import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Navbar from './layouts/Navbar'
import Dashboard from './views/Dashboard'
import CustomerList from './views/CustomerList'
import AddCustomer from './views/AddCustomer'
import EditCustomer from './views/EditCustomer'
import ViewCustomer from './views/ViewCustomer'
import Login from './views/Login'
import Signup from './views/Signup'
import ProtectedRoute from './components/ProtectedRoute'

function AppContent() {
  const location = useLocation()
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup'

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Routes */}
        <Route path="/customers" element={
          <ProtectedRoute>
            <CustomerList />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/add" element={
          <ProtectedRoute>
            <AddCustomer />
          </ProtectedRoute>
        } />
        <Route path="/edit/:id" element={
          <ProtectedRoute>
            <EditCustomer />
          </ProtectedRoute>
        } />
        <Route path="/view/:id" element={
          <ProtectedRoute>
            <ViewCustomer />
          </ProtectedRoute>
        } />
        
        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
