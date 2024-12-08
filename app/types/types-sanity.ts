interface SEO {
  title?: string
  description?: string
}

interface SiteConfigType {
  title: string
  rootDomain: string
  seo?: SEO
}

interface ProductType {
  _key: string
  _type: string
  _ref?: string
  content?: any[]
  products?: any[]
  [key: string]: any
}

interface ProductVariantType {
  _key: string
  _type: string
  [key: string]: any
}

interface ModuleType {
  index: number
  _key: string
  _type: string
  _ref?: string
  content?: any[]
  products?: any[]
  [key: string]: any
}

interface PageType {
  id: string
  title: string
  slug?: string
  seo?: SEO
  modules?: ModuleType[]
  hasTransparentHeader?: boolean
}

interface SanityDataType {
  site: SiteConfigType
  page: PageType
  menus?: any // Define menu structure if needed
}

export type {
  SEO,
  SiteConfigType,
  ModuleType,
  PageType,
  SanityDataType,
  ProductType,
  ProductVariantType,
}
