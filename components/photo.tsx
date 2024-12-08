'use client'

import React from 'react'
import Image from 'next/image'
import cx from 'classnames'
import { imageBuilder } from '@lib/sanity'

interface PhotoProps {
  photo: {
    asset?: {
      _ref: string
    }
    crop?: {
      top: number
      left: number
      bottom: number
      right: number
    }
    hotspot?: {
      x: number
      y: number
    }
    alt?: string
  }
  width?: number
  height?: number
  sizes?: string
  layout?: 'fill' | 'responsive'
  quality?: number
  className?: string
  hasPlaceholder?: boolean
  priority?: boolean
}

const Photo: React.FC<PhotoProps> = ({
  photo,
  width = 2400,
  height = 1600,
  sizes,
  layout = 'responsive',
  quality = 80,
  className,
  hasPlaceholder = true,
  priority = false,
}) => {
  if (!photo?.asset?._ref) return null

  // Build image URL using Sanity's imageBuilder
  const imageProps = imageBuilder.image(photo.asset._ref)
  
  if (photo.crop) {
    imageProps.crop({
      top: photo.crop.top,
      left: photo.crop.left,
      bottom: photo.crop.bottom,
      right: photo.crop.right
    })
  }

  if (photo.hotspot) {
    imageProps.hotspot({
      x: photo.hotspot.x,
      y: photo.hotspot.y
    })
  }

  const commonProps = {
    src: imageProps.url(),
    alt: photo.alt || '',
    quality: quality,
    sizes: sizes,
    className: cx('photo', className),
    priority: priority,
  }

  return (
    <div className={cx('photo-wrapper', { 'has-placeholder': hasPlaceholder })}>
      {layout === 'fill' ? (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image
            {...commonProps}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      ) : (
        <Image
          {...commonProps}
          width={width}
          height={height}
        />
      )}
    </div>
  )
}

export default Photo
