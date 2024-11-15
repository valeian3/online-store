import { Outlet } from 'react-router-dom'

import Header from 'components/Header'

function AppLayout() {
  return (
    <main className="h-screen flex flex-col">
      <Header />
      <Outlet />
    </main>
  )
}

export default AppLayout
