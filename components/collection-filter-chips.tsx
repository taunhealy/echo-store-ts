'use client'

import React, { useMemo } from 'react'

import Accordion from '@components/accordion'
import Chip from '@components/chip'
import Icon from '@components/icon'

interface FilterOption {
  slug: string
  title: string
}

interface FilterGroup {
  slug: string
  options: FilterOption[]
}

interface ActiveFilter {
  name: string
  values: string[]
}

interface FilterUpdate {
  name: string
  value: string | null
}

interface CollectionFilterChipsProps {
  id: string
  filterGroups: FilterGroup[]
  activeFilters: ActiveFilter[]
  filtersTotal: number
  onClick?: (updates: FilterUpdate[]) => void
}

const CollectionFilterChips = ({
  id,
  filterGroups,
  activeFilters,
  filtersTotal,
  onClick = () => {},
}: CollectionFilterChipsProps) => {
  const activeFilterValues =
    activeFilters.flatMap((f) =>
      f.values.map((v) => ({
        name: f.name,
        value: v,
      }))
    ) || []

  const isOpen = useMemo(
    () => (filtersTotal > 0 ? true : false),
    [filtersTotal]
  )

  return (
    <div className="collection--filter-chips is-inverted">
      <Accordion id={id} isOpen={isOpen} isControlled>
        <div className="chip-group">
          <ul className="chip-group--list">
            {activeFilterValues.map((filter, key) => {
              const currentValues =
                activeFilters.find((f) => f.name === filter.name)?.values || []

              const newValues = currentValues
                .filter((v) => v !== filter.value)
                .join()

              const option = filterGroups
                .find((f) => f.slug === filter.name)
                .options.find((o) => o.slug === filter.value)

              return (
                <Chip
                  key={key}
                  label={`Remove filter: ${option.title}`}
                  title={`Remove filter: ${option.title}`}
                  onClick={() =>
                    onClick([
                      {
                        name: filter.name,
                        value: newValues || null,
                      },
                    ])
                  }
                  icon={
                    <Icon
                      name="Plus"
                      id={option.slug}
                      className="remove-chip"
                    />
                  }
                >
                  {option.title}
                </Chip>
              )
            })}
          </ul>
        </div>
      </Accordion>
    </div>
  )
}

export default CollectionFilterChips
