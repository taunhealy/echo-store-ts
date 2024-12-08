'use client'

import React from 'react'

import Listbox from '@components/listbox'

interface SortOption {
  title: string
  value: string
  icon?: string
  iconPosition?: 'left' | 'right'
}

interface CollectionSortProps {
  sortOptions: SortOption[]
  activeSort: SortOption
  onChange: (option: SortOption) => void
}

const CollectionSort: React.FC<CollectionSortProps> = ({
  sortOptions,
  activeSort,
  onChange,
}) => {
  return (
    <div className="collection-sort is-right">
      <Listbox
        id="collection-sort"
        label="Select sorting order"
        name="sort"
        values={sortOptions}
        activeOption={activeSort}
        onChange={(value) =>
          onChange(sortOptions.find((opt) => opt.value === value) as SortOption)
        }
        before={
          <>
            <span className="collection-sort--icon"></span>
            <span className="collection-sort--title">Sort:</span>
          </>
        }
      />
    </div>
  )
}

export default CollectionSort
