import { Routes, Route } from 'react-router-dom'

// layout
import MainLayout from 'layout/MainLayout'

// pages
import Landing from 'pages/Landing'
import Products from 'pages/Products'
import Product from 'pages/Product'
import SearchProducts from 'pages/SearchProducts'
import Login from 'pages/Login'
import Register from 'pages/Register'
import PageNotFound from 'pages/PageNotFound'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/:categoryName" element={<Products />} />
        <Route path="/:categoryName/:productName" element={<Product />} />
        <Route path="/search/:searchProduct" element={<SearchProducts />} />
        <Route path="/search/product/:productName" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  )
}

export default AppRoutes
