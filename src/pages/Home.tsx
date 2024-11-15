import SidebarCategories from 'components/SidebarCategories'

export default function Home() {
  return (
    <div className="h-full flex flex-row">
      <SidebarCategories />
      <section className="grow tablet:px-8 tablet:py-4 overflow-y-auto max-h-[calc(100vh-96px)]">
        Home page
      </section>
    </div>
  )
}
