import { useSearchParams } from 'react-router-dom'

const SidebarItemFilter = ({ text }: { text: string }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleClick = () => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('category', text)

    setSearchParams(newSearchParams)
  }

  return (
    <p
      className="flex py-3 px-4 cursor-pointer transition-colors border-t border-gray-300 hover:text-primary-600 text-gray-500"
      onClick={handleClick}
    >
      <span>{text.toUpperCase()}</span>
    </p>
  )
}

export default SidebarItemFilter
