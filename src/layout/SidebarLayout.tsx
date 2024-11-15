import { ReactNode, FC } from 'react'

import Breadcrumbs from 'components/Breadcrumbs'

type SidebarLayoutProps = {
  sidebar: ReactNode
  children: ReactNode
}

const SidebarLayout: FC<SidebarLayoutProps> = ({ sidebar, children }) => {
  return (
    <div className="h-full flex flex-row">
      {sidebar}
      <section className="grow tablet:px-8 tablet:py-4 overflow-y-auto max-h-[calc(100vh-96px)]">
        <Breadcrumbs />
        {children}
      </section>
    </div>
  )
}

export default SidebarLayout
