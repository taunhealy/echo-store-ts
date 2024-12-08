'use client'

import React from 'react'
import cx from 'classnames'
import { ProductType, ProductVariantType } from '@/app/types/types-sanity'
import { ProductOption } from '@components/product'

interface ProductFormProps {
  product: ProductType
  activeVariant: ProductVariantType | null
  onVariantChange: (variant: ProductVariantType) => void
  className?: string
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  activeVariant,
  onVariantChange,
  className,
}) => {
  if (!product?.options?.length) return null

  return (
    <div className={cx('product--options', className)}>
      {product.options?.map(
        (option, key) =>
          option.values?.length > 0 && (
            <ProductOption
              key={key}
              position={key}
              option={option}
              optionSettings={product.optionSettings}
              variants={product.variants}
              activeVariant={activeVariant}
              onChange={onVariantChange}
            />
          )
      )}
    </div>
  )
}

export default ProductForm
