import { Link } from 'react-router-dom'

function SidebarItem({ text }: { text: string }) {
  const navigationPath = `/${text.toLowerCase()}`

  return (
    <Link
      to={navigationPath}
      className="flex py-3 px-4 cursor-pointer transition-colors border-t border-gray-300 hover:text-primary-600 text-gray-500"
    >
      <span>{text.toUpperCase()}</span>
    </Link>
  )
}

export default SidebarItem
