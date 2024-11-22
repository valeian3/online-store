import { Link } from 'react-router-dom'

function SidebarItem({
  label,
  numOfItems,
  handleClick,
}: {
  label: string
  numOfItems?: number
  handleClick?: (label: string) => void
}) {
  const handleItemClick = () => {
    if (handleClick) {
      handleClick(label)
    }
  }

  return (
    <div
      className="relative flex py-3 px-4 cursor-pointer transition-colors border-t border-gray-300 hover:text-primary-600 text-gray-500"
      onClick={numOfItems ? handleItemClick : undefined}
    >
      <Link
        to={numOfItems ? '#' : `/${label.toLowerCase()}`}
        className="flex-grow"
      >
        <span>{label.toUpperCase()}</span>
      </Link>
      {numOfItems && (
        <span className="absolute flex items-center justify-center right-2">
          {numOfItems}
        </span>
      )}
    </div>
  )
}

export default SidebarItem
