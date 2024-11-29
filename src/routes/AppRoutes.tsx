import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

// layout
import Layout from 'layout/Layout'
import SidebarLayout from 'layout/SidebarLayout'

// pages
const Landing = lazy(() => import('pages/Landing'))
const CategoryProducts = lazy(() => import('pages/CategoryProducts'))
const Product = lazy(() => import('pages/Product'))
const SearchProducts = lazy(() => import('pages/SearchProducts'))
const Cart = lazy(() => import('pages/Cart'))
const Wishlist = lazy(() => import('pages/Wishlist'))
const Login = lazy(() => import('pages/Login'))
const Register = lazy(() => import('pages/Register'))
const PageNotFound = lazy(() => import('pages/PageNotFound'))

// component
import Loading from 'components/Loading'

function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<SidebarLayout sidebar="category" />}>
            <Route path="/" element={<Landing />} />
          </Route>

          <Route element={<SidebarLayout sidebar="filter" />}>
            <Route path="/search" element={<SearchProducts />} />

            <Route path="/:categoryName" element={<CategoryProducts />} />
          </Route>

          <Route element={<SidebarLayout />}>
            <Route path="/search/:productName" element={<Product />} />
            <Route path="/:categoryName/:productName" element={<Product />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
