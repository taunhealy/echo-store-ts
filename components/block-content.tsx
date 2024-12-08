'use client'

import React from 'react'
import cx from 'classnames'
import PortableText, { blockContentToPlainText } from 'react-portable-text'

import { blockSerializers } from '@components/block-serializers'

interface BlockContentProps {
  blocks: any[] // Sanity Portable Text type
  className?: string
}

const Content: React.FC<BlockContentProps> = ({ blocks, className }) => {
  if (!blocks) return null

  return (
    <div className={cx('rc', className)}>
      <PortableText content={blocks} serializers={blockSerializers} />
    </div>
  )
}

export default Content
