import { Routes, Route } from 'react-router-dom'

// layout
import AppLayout from 'layout/AppLayout'
import AuthLayout from 'layout/AuthLayout'
import UserAuthLayout from 'layout/UserAuthLayout'

// pages
import Dashboard from 'pages/Dashboard'
import Users from 'pages/Users'
import { Inventory, Item } from 'pages/inventory'
import Settings from 'pages/Settings'
import Help from 'pages/Help'
import Login from 'pages/Login'
import Register from 'pages/Register'
import ForgotPassword from 'pages/ForgotPassword'
import PageNotFound from 'pages/PageNotFound'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/item/:itemId" element={<Item />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
        </Route>
      </Route>
      <Route element={<UserAuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  )
}

export default AppRoutes
