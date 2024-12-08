'use client'

import React from 'react'
import cx from 'classnames'

import { hasObject } from '@lib/helpers'

import RadioGroup from '@components/radio-group'
import RadioItem from '@components/radio-item'
import Swatch from '@components/swatch'

interface ProductOptionProps {
  position: number
  option: {
    name: string
    values: string[]
  }
  optionSettings?: Array<{
    forOption: string
    color?: {
      hex: string
    }
  }>
  variants: Array<{
    id: string
    title: string
    options: string[]
    inStock?: boolean
  }>
  activeVariant: {
    id: string
    title: string
    options: string[]
  } | null
  onChange: (variant: any) => void
}

const ProductOption: React.FC<ProductOptionProps> = ({
  position,
  option,
  optionSettings,
  variants,
  activeVariant,
  onChange,
}) => {
  const isColor = option.name.toLowerCase().includes('color')

  // get active option value
  const activeValue = activeVariant?.options[position]

  // build variant map for easier reference
  const variantMap = variants.reduce((acc, variant) => {
    const value = variant.options[position]
    if (!acc[value]) acc[value] = []
    acc[value].push(variant)
    return acc
  }, {} as Record<string, typeof variants>)

  // find options that are available for sale
  const activeOptions = option.values.filter((value) => {
    const variants = variantMap[value]
    if (!variants) return false
    return variants.some((variant) => variant.inStock)
  })

  // find the matching variant when an option is selected
  const getVariant = (value: string) => {
    if (!activeVariant) return null
    const newOptions = [...activeVariant.options]
    newOptions[position] = value

    const newVariant = variants.find((variant) =>
      variant.options.every((opt, i) => opt === newOptions[i])
    )

    return newVariant
  }

  return (
    <div className={cx('product-option', { 'is-color': isColor })}>
      <div className="product-option--title">{option.name}</div>

      <RadioGroup className="product-option--values">
        {option.values.map((value, key) => {
          const isActive = activeValue === value
          const isAvailable = activeOptions.includes(value)
          const matchingVariant = getVariant(value)

          // build swatch value if available
          const optionSwatch = optionSettings?.find((opt) =>
            opt.forOption.includes(value)
          )

          return (
            <RadioItem
              key={key}
              id={`option-${position}-${key}`}
              name={option.name}
              value={value}
              checked={isActive}
              onChange={() => matchingVariant && onChange(matchingVariant)}
              className={cx({
                'is-active': isActive,
                'is-unavailable': !isAvailable,
              })}
            >
              {isColor ? (
                <Swatch
                  label={value}
                  color={optionSwatch?.color?.hex}
                  active={isActive}
                />
              ) : (
                value
              )}
            </RadioItem>
          )
        })}
      </RadioGroup>
    </div>
  )
}

export default ProductOption
