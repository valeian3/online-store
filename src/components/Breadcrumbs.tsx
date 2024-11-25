import React, { useMemo } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

import { House, ArrowRight } from 'lucide-react'

const Breadcrumbs: React.FC = () => {
  const location = useLocation()
  const { categoryName, productName } = useParams()
  const isNotLandingPage = useMemo(() => {
    if (location.pathname !== '/') return true
  }, [location])

  const pathSegments = location.pathname
    .split('/')
    .filter((segment) => segment !== '')

  const breadcrumbs = pathSegments
    .filter((segment) => segment !== 'search' && segment !== 'product')
    .map((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join('/')}`
      let label = segment.replace(/-/g, ' ').toUpperCase()

      if (segment === categoryName) {
        label = categoryName
          ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
          : 'Category'
      } else if (segment === productName) {
        label = productName
          ? productName.charAt(0).toUpperCase() + productName.slice(1)
          : 'Product'
      }

      return { label, path }
    })

  return (
    <nav className="flex items-center space-x-2 text-sm">
      {isNotLandingPage && (
        <Link to="/" className="text-blue-500 hover:text-blue-700">
          <House
            size={34}
            className="text-gray-400 rounded-md p-2 hover:text-primary-500 hover:bg-gray-100"
          />
        </Link>
      )}
      {breadcrumbs.map((breadcrumb, index) => {
        let isLastBreadcrumb: boolean = false

        if (index === breadcrumbs.length - 1) isLastBreadcrumb = true

        return (
          <React.Fragment key={index}>
            <ArrowRight size={30} className="text-gray-400 rounded-md p-2" />
            {isLastBreadcrumb ? (
              <span className="text-gray-400">{breadcrumb.label}</span>
            ) : (
              <Link
                to={breadcrumb.path}
                className="text-primary-500 p-2 rounded-md hover:text-primary-700 hover:bg-gray-100"
              >
                {breadcrumb.label}
              </Link>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}

export default Breadcrumbs
