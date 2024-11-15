import { Routes, Route } from 'react-router-dom'

// layout
import AppLayout from 'layout/AppLayout'

// pages
import Home from 'pages/Home'
import Products from 'pages/Products'
import Product from 'pages/Product'
import Login from 'pages/Login'
import Register from 'pages/Register'
import PageNotFound from 'pages/PageNotFound'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/:categoryName" element={<Products />} />
        <Route path="/:categoryName/:productName" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  )
}

export default AppRoutes
