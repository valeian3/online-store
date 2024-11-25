import { Outlet } from 'react-router-dom'

import Header from 'components/Header'

function MainLayout() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <Outlet />
    </div>
  )
}

export default MainLayout
