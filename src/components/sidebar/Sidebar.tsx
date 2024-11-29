import { ReactNode } from 'react'

function Sidebar({ children }: { children: ReactNode }) {
  return (
    <aside className="z-50 hidden h-[calc(100vh-96px)] w-56 flex-none overflow-y-auto border-r bg-white tablet:block">
      {children}
    </aside>
  )
}

export default Sidebar
