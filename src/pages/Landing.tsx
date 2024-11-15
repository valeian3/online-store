import SidebarCategories from 'components/SidebarCategories'

import SidebarLayout from 'layout/SidebarLayout'

export default function Landing() {
  return (
    <SidebarLayout sidebar={<SidebarCategories />}>
      <div>Home page</div>
    </SidebarLayout>
  )
}
