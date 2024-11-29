import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Search from 'components/Search'
import Modal from 'components/Modal'
import Categories from 'components/sidebar/Categories'

import { User, Menu, ShoppingCart, Heart } from 'lucide-react'

function Header() {
  const navigate = useNavigate()

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false)

  const handleOpenLoginPage = () => {
    navigate(`login`)
  }

  const handleOpenCartPage = () => {
    navigate(`cart`)
  }

  const handleOpenWishlistPage = () => {
    navigate(`wishlist`)
  }

  const handleOpenMobileSidebar = () => {
    setIsMobileSidebarOpen(true)
  }

  const handleCloseMobileSidebar = () => {
    setIsMobileSidebarOpen(false)
  }

  return (
    <>
      <header className="z-10 h-24 bg-white px-6 py-4 shadow-md">
        <nav className="flex h-full items-center justify-between">
          <div className="tablet:hidden">
            <Menu
              onClick={handleOpenMobileSidebar}
              size={40}
              className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-primary-500"
            />
          </div>

          <div className="tablet:flex tablet:w-3/4 laptop:w-2/4">
            <a href="/" className="flex items-center tablet:w-52">
              <p className="text-2xl font-normal tablet:pb-0 tablet:text-3xl tablet:font-semibold">
                Online Shop
              </p>
            </a>

            <Search className="hidden tablet:block tablet:grow" />
          </div>

          <div className="flex">
            <Heart
              onClick={handleOpenWishlistPage}
              size={40}
              className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-red-400 tablet:block"
            />
            <ShoppingCart
              onClick={handleOpenCartPage}
              size={40}
              className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-yellow-500 tablet:block"
            />
            <User
              onClick={handleOpenLoginPage}
              size={40}
              className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-primary-500 tablet:block"
            />
          </div>
        </nav>
      </header>

      <Modal
        title="Online shop"
        position="left"
        open={isMobileSidebarOpen}
        onClose={handleCloseMobileSidebar}
      >
        <Categories />
      </Modal>
    </>
  )
}

export default Header
