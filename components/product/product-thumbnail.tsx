'use client'

import React from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { ProductVariantType } from '@/app/types/types-sanity'

import { hasObject } from '@lib/helpers'
import Photo from '@components/photo'

interface PhotoType {
  id?: string
  asset?: { _ref: string }
  crop?: { top: number; left: number; bottom: number; right: number }
  hotspot?: { x: number; y: number }
  alt?: string
}

interface ProductThumbnailProps {
  thumbnails?: Array<{
    forOption?: string
    photos: PhotoType[]
  }>
  activeVariant: ProductVariantType | null
}

const thumbAnim = {
  show: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'linear',
      when: 'beforeChildren',
    },
  },
  hide: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'linear',
      when: 'afterChildren',
    },
  },
}

const ProductThumbnail: React.FC<ProductThumbnailProps> = ({
  thumbnails = [],
  activeVariant,
}) => {
  if (!activeVariant || !thumbnails) return null

  const { options } = activeVariant

  const defaultThumbnails = thumbnails?.find((set) => !set.forOption)
  const variantThumbnails = thumbnails?.find((set) => {
    const option = set.forOption
      ? {
          name: set.forOption.split(':')[0],
          value: set.forOption.split(':')[1],
        }
      : {}
    return option.value && hasObject(options, option)
  })

  const photos = variantThumbnails ? variantThumbnails : defaultThumbnails

  console.log('Photo data:', photos?.photos?.[0])

  const id = (photos?.photos?.[0]?.id ?? '') + (photos?.photos?.[1]?.id ?? '')

  return (
    <AnimatePresence mode="wait">
      <m.div
        key={id}
        initial="hide"
        animate="show"
        exit="hide"
        variants={thumbAnim}
        className="product-card--photo"
      >
        {photos?.photos?.[0] && (
          <Photo
            photo={photos.photos[0]}
            width={1000}
            sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
        )}
      </m.div>
    </AnimatePresence>
  )
}

export default ProductThumbnail
