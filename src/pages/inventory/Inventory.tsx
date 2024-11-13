import { usePageTitle } from 'lib/hooks'

import { Items } from 'pages/inventory'

function Inventory() {
  usePageTitle('Inventory')
  return (
    <>
      <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
        Inventory
      </h2>
      <Items />
    </>
  )
}

export default Inventory
