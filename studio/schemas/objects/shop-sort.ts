'use client'

import { ShoppingCart } from 'phosphor-react'
import { sortTypes } from './sort-types'
import type { ShopSortSchema } from '../types'

export default {
  title: 'Shop Sort',
  name: 'shopSort',
  type: 'object',
  icon: ShoppingCart,
  description: 'Display a sort dropdown on shop collection pages',
  options: {
    collapsible: true,
  },
  fields: [
    {
      title: 'Enable Sorting?',
      name: 'isActive',
      type: 'boolean',
      initialValue: false,
    },
    {
      title: 'Sort Options',
      name: 'options',
      type: 'array',
      of: [
        {
          title: 'Option',
          name: 'option',
          type: 'object',
          fields: [
            {
              title: 'Type',
              name: 'type',
              type: 'string',
              options: {
                list: sortTypes,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              title: 'Custom Title',
              name: 'title',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'title',
              type: 'type',
            },
            prepare({ title, type }: { title?: string; type: string }) {
              const sortTitle = sortTypes.find((t) => t.value === type)?.title

              return {
                title: title || sortTitle,
                subtitle: title ? sortTitle : '',
              }
            },
          },
        },
      ],
    },
  ],
} as ShopSortSchema
