export interface SortType {
  title: string
  value: string
}

export interface ShopSortField {
  title: string
  name: string
  type: string
  options?: {
    list: SortType[]
  }
  validation?: (Rule: any) => any
}

export interface ShopSortSchema {
  title: string
  name: string
  type: string
  icon: any
  description: string
  options: {
    collapsible: boolean
  }
  fields: ShopSortField[]
} 