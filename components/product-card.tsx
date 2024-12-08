'use client'

import React, { useState } from 'react'
import { m } from 'framer-motion'
import Link from 'next/link'
import cx from 'classnames'
import { ProductCardProps } from '@/app/types/types-components'

import { hasObject } from '@lib/helpers'

import {
  ProductGallery,
  ProductThumbnail,
  ProductPrice,
  ProductOption,
  ProductAdd,
} from '@components/product'

interface ProductThumbnailProps {
  photos: any // replace 'any' with your photo type
  activeVariant: any // replace 'any' with your variant type
}

const itemAnim = {
  show: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'linear',
    },
  },
  hide: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'linear',
    },
  },
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      product,
      hasVisuals,
      showGallery,
      showThumbs,
      showPrice,
      showOption,
      showQuickAdd,
      activeFilters,
      className,
      onClick,
    },
    ref
  ) => {
    const [activeVariant, setActiveVariant] = useState(
      product.variants ? product.variants[0] : null
    )

    const activeVariantIndex = product.variants?.findIndex(
      (v) => v.id === activeVariant?.id
    )

    const onVariantChange = (variant: any) => {
      setActiveVariant(variant)
    }

    const hasVisibleVariant =
      !activeFilters ||
      (activeFilters?.length === 0 && activeVariantIndex === 0) ||
      hasObject(activeFilters, 'isActive', true)

    if (!hasVisibleVariant) return null

    return (
      <m.div
        ref={ref}
        className={cx('product-card', className)}
        initial="hide"
        animate="show"
        exit="hide"
        variants={itemAnim}
      >
        <div className="product-card--content">
          {hasVisuals && (
            <div className="product-card--photos">
              {showGallery ? (
                <ProductGallery
                  photosets={product.photos.main}
                  activeVariant={activeVariant}
                  hasArrows
                  hasDots
                />
              ) : (
                <ProductThumbnail
                  thumbnails={product.photos.main}
                  activeVariant={activeVariant}
                />
              )}
            </div>
          )}
        </div>
      </m.div>
    )
  }
)

ProductCard.displayName = 'ProductCard'
export default ProductCard
