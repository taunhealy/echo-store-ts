import { ModuleType, ProductType, ProductVariantType } from './types-sanity'

export interface DefaultModuleProps {
  index: number
  data: ModuleType
  product?: ProductType | null
  activeVariant?: ProductVariantType | null
  onVariantChange?: (variant: ProductVariantType) => void
}

export interface ProductModuleProps extends DefaultModuleProps {
  product: ProductType | null
  activeVariant: ProductVariantType | null
  onVariantChange: (variant: ProductVariantType) => void
}

export interface ProductGalleryProps {
  photosets: Array<{
    forOption?: string
    photos: Array<{
      id: string
      [key: string]: any
    }>
  }>
  activeVariant: ProductVariantType | null
  hasArrows?: boolean
  hasDots?: boolean
  hasDrag?: boolean
  hasCounter?: boolean
}

// You can add other frontend-specific types here

// Carousel Props
interface CarouselProps {
  id: string
  hasArrows?: boolean
  hasDots?: boolean
  hasCounter?: boolean
  hasDrag?: boolean
  className?: string
  children: React.ReactNode
}

// Accordion Props
interface AccordionProps {
  id: string | number
  title: string
  isOpen?: boolean
  isControlled?: boolean
  onToggle?: (id: string | number, isOpen: boolean) => void
  className?: string
  children: React.ReactNode
}

// AccordionList Props
interface AccordionListProps {
  data: {
    items: Array<{
      id: string | number
      title: string
      content: any[] // BlockContent type from Sanity
    }>
  }
}

// Footer Props
interface FooterProps {
  data?: {
    blocks: Array<{
      title?: string
      menu?: {
        items: any[] // Menu items from Sanity
      }
      newsletter?: any // Newsletter data from Sanity
      social?: Array<{
        url: string
        icon: string
      }>
    }>
  }
}

// Hero Props
interface HeroProps {
  data?: {
    content?: any[] // BlockContent type from Sanity
    bgType?: 'video' | 'photo'
    photos?: {
      desktopPhoto?: any // Sanity image type
      mobilePhoto?: any // Sanity image type
    }
    video?: {
      title: string
      id: string
    }
  }
}

// Icon Props
interface IconProps {
  id?: string
  name: string
  color?: string
  viewBox?: string
  className?: string
}

// Marquee Props
interface MarqueeProps {
  data?: {
    items?: Array<{
      _type: 'simple' | 'photo' | 'product'
      text?: string
      photo?: any // Sanity image type
      product?: any // Sanity product type
    }>
    speed?: number
    reverse?: boolean
    pausable?: boolean
  }
}

// ProductCard Props
interface ProductCardProps {
  product: any // Sanity product type
  hasVisuals?: boolean
  showGallery?: boolean
  showThumbs?: boolean
  showPrice?: boolean
  showOption?: boolean
  showQuickAdd?: boolean
  activeFilters?: any
  className?: string
  onClick?: () => void
}

// Grid Props
interface GridProps {
  data?: {
    size?: number
    columns?: Array<{
      sizes: Array<{
        breakpoint?: string
        width: number
        justify?: string
        align?: string
        start?: number
      }>
      blocks?: any[] // Grid block content from Sanity
    }>
  }
}

export type {
  CarouselProps,
  AccordionProps,
  AccordionListProps,
  FooterProps,
  HeroProps,
  IconProps,
  MarqueeProps,
  ProductCardProps,
  GridProps
}
