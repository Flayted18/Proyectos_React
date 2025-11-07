import './App.css'
import { Products } from './components/products'
import { products as initialProducts} from "./mocks/products.json"

import { useState } from 'react'


function App() {
  const [products] = useState(initialProducts)
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0
  })

  const filterProducts = (products) => {
    return products.filter(product => {
      return (
        product.price  >= filters.minPrice && 
        (
          filters.category === 'all' ||
          product.category === filters.category
        )
      )
    })
  }

  const handleFilter = (event) =>{
    console.log(event)
    // const newFilter = event.target.value
    // setFilters.category(newFilter)

  }
  const filteredProducts = filterProducts(products)

  return (
    <main>
      <div>
          <form className="filter">
              <input 
                  type="text" 
                  placeholder="Filtra aqui"
                  onSubmit={handleFilter}
              />
              <button type='submit' onSubmit={handleFilter}>
                Filtrar
              </button>
          </form>
      </div>    
      <Products products={filteredProducts}/>

    </main>
    
  )
}

export default App
