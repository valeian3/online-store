import { Routes, Route } from 'react-router-dom'

// layout
import MainLayout from 'layout/MainLayout'

// pages
import Landing from 'pages/Landing'
import CategoryProducts from 'pages/CategoryProducts'
import Product from 'pages/Product'
import SearchProducts from 'pages/SearchProducts'
import Cart from 'pages/Cart'
import Wishlist from 'pages/Wishlist'
import Login from 'pages/Login'
import Register from 'pages/Register'
import PageNotFound from 'pages/PageNotFound'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Landing />} />

        <Route path="/search" element={<SearchProducts />} />
        <Route path="/search/:productName" element={<Product />} />

        <Route path="/:categoryName" element={<CategoryProducts />} />
        <Route path="/:categoryName/:productName" element={<Product />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  )
}

export default AppRoutes
