'use client'

import React from 'react'
import { GridProps } from '@/app/types/types-components'
import cx from 'classnames'

import ProductCard from '@components/product-card'
import Freeform from '@components/freeform'
import AccordionList from '@components/accordion-list'

const Grid: React.FC<GridProps> = ({ data = {} }) => {
  const { size = 12, columns = [] } = data

  return (
    <section className="grid">
      <div className={`grid--${size}`}>
        {columns.map((column, key) => (
          <div
            key={key}
            className={cx(
              'grid--item',
              column.sizes?.map(
                (size) => size.breakpoint && `${size.breakpoint}-${size.width}`
              )
            )}
          >
            {column.blocks?.map((block, key) => {
              switch (block._type) {
                case 'freeform':
                  return <Freeform key={key} data={block} />
                case 'accordions':
                  return <AccordionList key={key} data={block} />
                case 'productCard':
                  return (
                    <ProductCard
                      key={key}
                      product={block.product}
                      hasVisuals
                      showThumbs
                    />
                  )
                default:
                  return null
              }
            })}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Grid
