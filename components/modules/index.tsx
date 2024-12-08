'use client'

import React from 'react'

import Grid from './grid'
import Hero from './hero'
import Marquee from './marquee'
import DividerPhoto from './divider-photo'
import ProductHero from './product-hero'
import Collection from './collection-grid'
import { DefaultModuleProps } from '@/app/types/types-components'

const MODULES = {
  grid: Grid,
  hero: Hero,
  marquee: Marquee,
  dividerPhoto: DividerPhoto,
  productHero: ProductHero,
  collectionGrid: Collection,
} satisfies Record<string, React.ComponentType<DefaultModuleProps>>

// Derive the ModuleKeys type from the MODULES object
export type ModuleKeys = keyof typeof MODULES

export const Module = ({
  index,
  data,
  product = null,
  activeVariant = null,
  onVariantChange = () => {},
}: DefaultModuleProps) => {
  // Add type assertion to ensure moduleType is a valid key
  const moduleType = data?._type as keyof typeof MODULES
  const ModuleComponent = moduleType ? MODULES[moduleType] : null

  if (!ModuleComponent) return null

  return (
    <ModuleComponent
      index={index}
      data={data}
      product={product}
      activeVariant={activeVariant}
      onVariantChange={onVariantChange}
    />
  )
}
