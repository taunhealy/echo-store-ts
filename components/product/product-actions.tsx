'use client'

import React, { useState } from 'react'
import { ProductVariantType } from '@/app/types/types-sanity'

import {
  ProductCounter,
  ProductAdd,
  ProductWaitlist,
} from '@components/product'

interface ProductActionsProps {
  activeVariant: ProductVariantType | null
  klaviyoAccountID?: string
}

const ProductActions: React.FC<ProductActionsProps> = ({
  activeVariant,
  klaviyoAccountID,
}) => {
  const [quantity, setQuantity] = useState(1)

  if (!activeVariant) return null

  return (
    <div className="product--actions">
      {activeVariant.inStock ? (
        <>
          <ProductCounter
            id={activeVariant.id}
            count={quantity}
            onUpdate={setQuantity}
          />
          <ProductAdd
            productID={activeVariant.id}
            quantity={quantity}
            className="btn is-primary is-large is-block"
          >
            Add To Cart
          </ProductAdd>
        </>
      ) : (
        <>
          {klaviyoAccountID ? (
            <ProductWaitlist
              productID={activeVariant.id}
              variantID={activeVariant.id}
              title
            />
          ) : (
            <ProductWaitlist
              productID={activeVariant.id}
              variantID={activeVariant.id}
              title
            />
          )}
        </>
      )}
    </div>
  )
}

export default ProductActions
