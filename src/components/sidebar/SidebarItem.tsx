import { NavLink } from 'react-router-dom'

function SidebarItem({ text }: { text: string }) {
  const navigationPath = `/${text.toLowerCase()}`

  return (
    <NavLink
      to={navigationPath}
      className={({ isActive }) =>
        [
          ' relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group',
          isActive
            ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800'
            : 'hover:bg-indigo-50 text-gray-600',
        ].join(' ')
      }
    >
      <span className={'overflow-hidden w-52 ml-3'}>{text}</span>
    </NavLink>
  )
}

export default SidebarItem
