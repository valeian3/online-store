import { ReactNode, FC } from 'react'

import { useSidebar } from 'lib/hooks'

import Breadcrumbs from 'components/Breadcrumbs'

type SidebarLayoutProps = {
  sidebar: ReactNode
  children: ReactNode
}

const SidebarLayout: FC<SidebarLayoutProps> = ({ sidebar, children }) => {
  const { isSidebarOpen } = useSidebar()
  return (
    <main className="flex flex-row grow">
      {sidebar}
      <section
        className={`max-h-[calc(100vh-96px)] w-full flex flex-col overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? 'hidden' : 'block'
        } p-8  tablet:px-8 tablet:py-4 tablet:block tablet:w-full`}
      >
        <Breadcrumbs />
        {children}
      </section>
    </main>
  )
}

export default SidebarLayout
