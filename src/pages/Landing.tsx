import { useNavigate } from 'react-router-dom'

import { Laptop, CarFront, Tablet, Flower } from 'lucide-react'

const popularCategories = [
  {
    name: 'Laptops',
    icon: <Laptop size={24} className="text-primary-600" />,
  },
  {
    name: 'Vehicle',
    icon: <CarFront size={24} className="text-primary-600" />,
  },
  {
    name: 'Tablets',
    icon: <Tablet size={24} className="text-primary-600" />,
  },
  {
    name: 'Beauty',
    icon: <Flower size={24} className="text-primary-600" />,
  },
]

export default function Landing() {
  const navigate = useNavigate()

  const handleSelectCategory = (categoryName: string) => {
    navigate(`/${categoryName.toLowerCase()}`)
  }

  return (
    <div className="container">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold">Welcome to Our Online Shop</h1>
        <p className="text-xl text-gray-600">
          Find the best deals on popular products
        </p>
      </div>

      <section aria-label="popular categories section">
        <h2 className="mb-6 text-center text-3xl font-semibold">
          Popular Categories
        </h2>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {popularCategories.map((category) => (
            <div
              key={category.name}
              className="flex flex-col items-center text-center"
              onClick={() => handleSelectCategory(category.name)}
            >
              <div className="mb-4 rounded-full bg-gray-200 p-4 hover:cursor-pointer">
                {category.icon}
              </div>
              <p className="text-lg font-medium">{category.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
