import { useAuth, usePageTitle } from 'lib/hooks'

export default function Dashboard() {
  const { user } = useAuth()
  usePageTitle('Dashboard')

  return (
    <>
      <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Welcome back {user?.username}
      </h2>
    </>
  )
}
