import { Outlet } from 'react-router-dom'

import {
  Boxes,
  LayoutDashboard,
  LifeBuoy,
  Settings,
  UserCircle,
} from 'lucide-react'

import Sidebar from '../components/sidebar/Sidebar'
import SidebarItem from '../components/sidebar/SidebarItem'

function AppLayout() {
  return (
    <main className="flex flex-row h-screen">
      <Sidebar>
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" />
        <SidebarItem icon={<UserCircle size={20} />} text="Users" />
        <SidebarItem icon={<Boxes size={20} />} text="Inventory" alert />
        <hr className="my-3" />
        <SidebarItem icon={<Settings size={20} />} text="Settings" />
        <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
      </Sidebar>

      <section className="grow px-8 pt-16 pb-8">
        <Outlet />
      </section>
    </main>
  )
}

export default AppLayout
