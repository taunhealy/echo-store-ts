'use client'

import React from 'react'
import cx from 'classnames'

interface ProductCounterProps {
  id: string
  count: number
  onUpdate: (count: number) => void
  className?: string
}

const ProductCounter: React.FC<ProductCounterProps> = ({
  id,
  count,
  onUpdate,
  className,
}) => {
  return (
    <div className={cx('product-counter', className)}>
      <button
        onClick={() => onUpdate(Math.max(1, count - 1))}
        aria-label="Decrease quantity by 1"
        className="product-counter--btn is-decrement"
      >
        -
      </button>

      <input
        type="number"
        id={id}
        name={id}
        value={count}
        min="1"
        onChange={(e) => onUpdate(Number(e.target.value))}
        className="product-counter--input"
      />

      <button
        onClick={() => onUpdate(count + 1)}
        aria-label="Increase quantity by 1"
        className="product-counter--btn is-increment"
      >
        +
      </button>
    </div>
  )
}

export default ProductCounter
