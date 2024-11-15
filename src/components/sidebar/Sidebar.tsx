import { ReactNode } from 'react'

function Sidebar({ children }: { children: ReactNode }) {
  return (
    <aside className="hidden tablet:block">
      <nav className="h-[calc(100vh-64px)] w-56 flex flex-col bg-white border-r shadow-sm">
        <ul className="flex-1 py-3 px-3 overflow-y-auto">{children}</ul>
      </nav>
    </aside>
  )
}

export default Sidebar
