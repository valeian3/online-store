import { useSidebar } from 'hooks/hooks'
import { ReactNode } from 'react'

function Sidebar({ children }: { children: ReactNode }) {
  const { isSidebarOpen } = useSidebar()
  return (
    <aside
      className={`transition-all duration-300 ${
        isSidebarOpen ? 'block w-full' : 'hidden'
      } tablet:block tablet:w-56`}
    >
      <nav
        className={`h-[calc(100vh-96px)] tablet:w-56 flex flex-col bg-white border-r`}
      >
        <div className="flex-1 overflow-y-auto">{children}</div>
      </nav>
    </aside>
  )
}

export default Sidebar
