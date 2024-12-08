'use client'

import React from 'react'
import cx from 'classnames'

import BlockContent from '@components/block-content'

interface FreeformProps {
  data: {
    maxWidth?: string
    textAlign?: string
    content?: any[] // Sanity block content
  }
}

const Freeform: React.FC<FreeformProps> = ({ data }) => {
  const { maxWidth, textAlign, content } = data

  return (
    <BlockContent className={cx(maxWidth, textAlign)} blocks={content ?? []} />
  )
}

export default Freeform
