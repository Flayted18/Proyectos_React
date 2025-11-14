import './App.css'
import { Footer } from './components/Footer.jsx'
import { Header } from './components/Header'
import { Products } from './components/Products.jsx'
import { useFilters } from './hooks/useFilters.jsx'
import { products as initialProducts} from "./mocks/products.json"

import { useState } from 'react'


function App() {
  const [products] = useState(initialProducts)
  const {filters, filterProducts} = useFilters()

  const filteredProducts = filterProducts(products)

  return (
    <>
      <Header />
      <Products products={filteredProducts}/>
      <Footer filters={filters}/>

    </>
    
  )
}

export default App
