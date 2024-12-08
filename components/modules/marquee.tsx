'use client'

import React from 'react'
import { useInView } from 'react-intersection-observer'
import { MarqueeProps } from '@/app/types/types-components'

import Photo from '@components/photo'
import ProductCard from '@components/product-card'

const Marquee: React.FC<MarqueeProps> = ({ data = {} }) => {
  const { items, speed = 0.5, reverse, pausable } = data

  if (!items?.length) return null

  const { observe, inView } = useInView({
    unobserveOnEnter: true,
    threshold: 0.1,
  })

  return (
    <div ref={observe} className="marquee-section">
      <div
        data-marqy
        data-direction={reverse ? 'right' : 'left'}
        data-pause-on-hover={pausable}
        className="marquee"
      >
        <div data-marqy-inner>
          <div
            data-marqy-content
            style={{ animationDuration: `${1 / speed}s` }}
          >
            <div className="marquee--item">
              {items.map((item, key) => {
                switch (item._type) {
                  case 'simple':
                    return (
                      <span key={key} className="marquee--text">
                        {item.text}
                      </span>
                    )
                  case 'photo':
                    return (
                      <div
                        key={key}
                        className="marquee--photo"
                        style={{ flex: item.photo.aspectRatio }}
                      >
                        <Photo
                          photo={item.photo}
                          hasPlaceholder={false}
                          forceLoad={inView}
                        />
                      </div>
                    )
                  case 'product':
                    return (
                      <div key={key} className="marquee--product">
                        <ProductCard
                          key={key}
                          product={item.product}
                          hasVisuals
                          showThumbs
                          showPrice
                          showQuickAdd
                        />
                      </div>
                    )
                  default:
                    return null
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Marquee
