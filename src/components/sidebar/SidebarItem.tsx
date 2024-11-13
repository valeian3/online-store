import { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { SidebarContext } from './Sidebar'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SidebarItem({ icon, text, alert }: any) {
  const { expanded } = useContext(SidebarContext)

  const navigationPath = text === 'Dashboard' ? '' : `/${text.toLowerCase()}`

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
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? 'w-52 ml-3' : 'w-0'
        }`}
      >
        {text}
      </span>

      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? '' : 'top-2'
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
             bg-indigo-100 text-indigo-800 text-sm
             invisible opacity-20 -translate-x-3 transition-all
             group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
         `}
        >
          {text}
        </div>
      )}
    </NavLink>
  )
}

export default SidebarItem
