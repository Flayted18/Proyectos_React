import './App.css'
import { Footer } from './components/Footer.jsx'
import { Header } from './components/Header'
import { Products } from './components/Products.jsx'
import { FiltersContext } from './contexts/filters.jsx'
import { products as initialProducts} from "./mocks/products.json"

import { useContext, useState } from 'react'


function useFilters () {
  const {filters, setFilters} = useContext(FiltersContext)

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
  return { filters, filterProducts, setFilters}
}

function App() {
  const [products] = useState(initialProducts)
  const {filters, filterProducts, setFilters} = useFilters()

  const filteredProducts = filterProducts(products)

  return (
    <>
      <Header setFilters={setFilters}/>
      <Products products={filteredProducts}/>
      <Footer filters={filters}/>

    </>
    
  )
}

export default App
