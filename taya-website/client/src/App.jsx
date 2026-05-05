import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import ScrollToTop from './components/ScrollToTop'
import SearchModal from './components/SearchModal'
import Newsletter from './components/Newsletter'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Product from './pages/Product'
import Account from './pages/Account'
import ShoppingCheckout from './pages/shopping-view/checkout'
import Register from './pages/auth/register'
import Login from './pages/auth/login'
import AdminDashboard from './pages/admin-view/dashboard'

import { AuthProvider } from './context/AuthContext';
import AdminProducts from './pages/admin-view/products';
import AdminOrders from './pages/admin-view/orders';
import ProtectedRoute from './components/auth/ProtectedRoute';

function AppContent() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const location = useLocation()
  const showNewsletter = location.pathname === '/' || location.pathname === '/shop/home'

  return (
    <CartProvider>
      <ScrollToTop />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <div className="min-h-screen flex flex-col">
        <Header onSearchClick={() => setIsSearchOpen(true)} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop/home" element={<Home />} />
            <Route path="/collection/:category" element={<Collection />} />
            <Route path="/collection/:category/:subcategory" element={<Collection />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/account" element={<Account />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute adminOnly>
                  <AdminProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute adminOnly>
                  <AdminOrders />
                </ProtectedRoute>
              }
            />
            <Route path="/shop/checkout" element={<ShoppingCheckout />} />
          </Routes>
        </main>
        {showNewsletter ? <Newsletter /> : null}
        <CartDrawer />
        <Footer />
      </div>
    </CartProvider>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App