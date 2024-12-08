'use client'

import React from 'react'
import cx from 'classnames'

import { useSiteContext, useAddItem } from '@lib/context'

interface ProductAddProps {
  productID: string
  quantity?: number
  className?: string
  children?: React.ReactNode
}

const ProductAdd: React.FC<ProductAddProps> = ({
  productID,
  quantity = 1,
  className,
  children,
}) => {
  const addItemToCart = useAddItem()
  const { shopifyClient, isLoading, isAdding } = useSiteContext()

  if (!shopifyClient) {
    return (
      <span className={cx('is-disabled', className)} aria-disabled>
        Unavailable
      </span>
    )
  }

  return (
    <>
      {isLoading ? (
        <button className={cx('is-disabled', className)} disabled>
          Loading...
        </button>
      ) : (
        <button
          className={cx(className, { 'is-disabled': isAdding })}
          onClick={() => addItemToCart(productID, quantity)}
          disabled={isAdding}
        >
          {isAdding ? 'Adding...' : children || 'Add to Cart'}
        </button>
      )}
    </>
  )
}

export default ProductAdd
