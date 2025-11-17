import './App.css'
import { Cart } from './components/Cart.jsx'
import { Footer } from './components/Footer.jsx'
import { Header } from './components/Header'
import { Products } from './components/Products.jsx'
import { CartProvider } from './contexts/cart.jsx'
import { useFilters } from './hooks/useFilters.jsx'
import { products as initialProducts} from "./mocks/products.json"

import { useState } from 'react'


function App() {
  const [products] = useState(initialProducts)
  const {filterProducts} = useFilters()

  const filteredProducts = filterProducts(products)

  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts}/>
      <Footer />

    </CartProvider>
    
  )
}

export default App
