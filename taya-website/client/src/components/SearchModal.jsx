import { useState } from 'react'
import { X, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'

export default function SearchModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={onClose}>
      <div className="flex justify-center pt-20" onClick={(e) => e.stopPropagation()}>
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl">
          <div className="flex items-center border-b px-4 py-4">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 ml-3 outline-none text-lg"
              autoFocus
            />
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X size={20} />
            </button>
          </div>

          {searchQuery.length > 0 && (
            <div className="max-h-96 overflow-y-auto">
              {filteredProducts.length > 0 ? (
                <div className="p-4 space-y-2">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      onClick={onClose}
                      className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded transition-colors"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.category}</p>
                        <p className="text-sm font-semibold text-gray-900">LKR {product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No products found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
