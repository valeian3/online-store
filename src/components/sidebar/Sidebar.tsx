import { createContext, useState, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from 'lib/hooks'

import { ChevronFirst, ChevronLast, MoreVertical, LogOut } from 'lucide-react'

export const SidebarContext = createContext({ expanded: false })

function Sidebar({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const { user, signout } = useAuth()
  const [expanded, setExpanded] = useState(true)

  return (
    <aside className="w-fit">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? 'w-32' : 'w-0'
            }`}
            alt=""
            onClick={() => navigate('/', { replace: true })}
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
                flex justify-between items-center
                overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}
            `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{user?.username}</h4>
              <span className="text-xs text-gray-600">
                {user?.roles?.[0] ?? 'Default'}
              </span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
        <div className="p-3">
          <button
            type="button"
            onClick={() =>
              signout().then(() => {
                navigate('/login')
              })
            }
            className={`w-full text-indigo-800 hover:text-indigo-800 border border-indigo-800 hover:border-indigo-200 hover:bg-indigo-200 font-medium rounded-lg text-sm ${expanded ? 'px-5 py-2.5' : 'px-3 py-1.5'} text-center`}
          >
            {expanded ? 'SIGN OUT' : <LogOut size={16} />}
          </button>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
