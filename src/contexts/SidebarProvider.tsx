import { createContext, ReactNode, FC, useState, useMemo } from 'react'

interface SidebarContextProps {
  isSidebarOpen: boolean
  toggleSidebar: (isOpen?: boolean) => void
}

export const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
)

export const SidebarProvider: FC<{
  children: ReactNode
}> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = (isOpen?: boolean) => {
    if (isOpen) setIsSidebarOpen(isOpen)
    setIsSidebarOpen((prev) => !prev)
  }

  const contextValue = useMemo<SidebarContextProps>(
    () => ({
      isSidebarOpen,
      toggleSidebar,
    }),
    [isSidebarOpen]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  )
}
