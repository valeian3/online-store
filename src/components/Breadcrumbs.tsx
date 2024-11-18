import React, { useMemo } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
          </svg>
        </Link>
      )}
      {breadcrumbs.map((breadcrumb, index) => {
        let isLastBreadcrumb: boolean = false

        if (index === breadcrumbs.length - 1) isLastBreadcrumb = true

        return (
          <React.Fragment key={index}>
            <span className="text-gray-500">{'>'}</span>
            {isLastBreadcrumb ? (
              <span className="text-gray-400">{breadcrumb.label}</span>
            ) : (
              <Link
                to={breadcrumb.path}
                className="text-blue-500 hover:text-blue-700"
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
