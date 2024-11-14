import { Outlet } from 'react-router-dom'

import Header from 'components/Header'
import Sidebar from 'components/sidebar/Sidebar'

function AppLayout() {
  return (
    <main className="h-screen flex flex-col">
      <Header />
      <div className="h-full flex flex-row">
        <Sidebar />
        <section className="grow tablet:px-8 tablet:py-4 overflow-y-auto max-h-[calc(100vh-64px)]">
          <Outlet />
        </section>
      </div>
    </main>
  )
}

export default AppLayout
