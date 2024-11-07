import React from 'react'
import {products} from '../data/products'
import ProductDetails from './ProductDetails'
const Home = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {
      products.map((product, i) => (
        <ProductDetails key={i} product={product} />
      ))
      }
    </div>
  )
}

export default Home