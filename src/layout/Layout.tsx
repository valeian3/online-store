import { Outlet } from 'react-router-dom'

import Header from 'components/Header'

function Layout() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex flex-grow flex-row">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
