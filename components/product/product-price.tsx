'use client'

import React from 'react'

interface ProductPriceProps {
  price: number
  comparePrice?: number
}

const ProductPrice: React.FC<ProductPriceProps> = ({ price, comparePrice }) => {
  return (
    <div className="product-price">
      {comparePrice ? (
        <>
          <span className="product-price--original">${comparePrice}</span>
          <span className="product-price--discount">${price}</span>
        </>
      ) : (
        <span>${price}</span>
      )}
    </div>
  )
}

export default ProductPrice
