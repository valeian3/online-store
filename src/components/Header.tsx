import { useNavigate } from 'react-router-dom'

import { useSidebar } from 'hooks/hooks'

import Search from 'components/Search'

import { User, Menu, X, ShoppingCart, Heart } from 'lucide-react'

function Header() {
  const navigate = useNavigate()
  const { toggleSidebar, isSidebarOpen } = useSidebar()

  const handleOpenLoginPage = () => {
    navigate(`login`)
  }

  const handleOpenCartPage = () => {
    navigate(`cart`)
  }

  const handleOpenWishlistPage = () => {
    navigate(`wishlist`)
  }

  return (
    <header className="h-24 z-10 px-6 py-4 shadow-md bg-white">
      <nav className="h-full flex justify-between items-center">
        <div className="tablet:hidden">
          {isSidebarOpen ? (
            <X
              onClick={() => toggleSidebar()}
              size={40}
              className="text-gray-400 rounded-md p-2 hover:text-primary-500 hover:bg-gray-100"
            />
          ) : (
            <Menu
              onClick={() => toggleSidebar()}
              size={40}
              className="text-gray-400 rounded-md p-2 hover:text-primary-500 hover:bg-gray-100"
            />
          )}
        </div>

        <div className="tablet:flex tablet:w-3/4 laptop:w-2/4">
          <a href="/" className="flex items-center tablet:w-52">
            <p className="pb-1 text-2xl font-normal tablet:pb-0 tablet:text-3xl tablet:font-semibold">
              Online Shop
            </p>
          </a>

          <Search className="hidden tablet:block tablet:grow" />
        </div>

        <div className="flex">
          <Heart
            onClick={handleOpenWishlistPage}
            size={40}
            className="text-gray-400 rounded-md p-2 hover:text-red-400 hover:bg-gray-100 tablet:block"
          />
          <ShoppingCart
            onClick={handleOpenCartPage}
            size={40}
            className="text-gray-400 rounded-md p-2 hover:text-yellow-500 hover:bg-gray-100 tablet:block"
          />
          <User
            onClick={handleOpenLoginPage}
            size={40}
            className="text-gray-400 rounded-md p-2 hover:text-primary-500 hover:bg-gray-100 tablet:block"
          />
        </div>
      </nav>
    </header>
  )
}

export default Header
