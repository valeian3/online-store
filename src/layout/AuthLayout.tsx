import { Navigate, useLocation, Outlet } from 'react-router-dom'

import { useAuth } from 'lib/hooks'

export default function AuthLayout() {
  let { user, isLoading } = useAuth()
  let location = useLocation()

  if (isLoading) <>loading user details...</>

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
