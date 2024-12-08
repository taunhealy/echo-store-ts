'use client'

import React, { ReactNode } from 'react'
import cx from 'classnames'

interface ChipProps {
  avatar?: ReactNode
  label: string
  icon?: ReactNode
  title?: string
  onClick?: () => void
  className?: string
  children?: ReactNode
}

const Chip: React.FC<ChipProps> = ({
  avatar,
  label,
  icon,
  title,
  onClick = () => {},
  className,
  children,
}) => {
  if (!children) return null

  const handleClick = () => {
    onClick()
  }

  return (
    <button
      onClick={handleClick}
      aria-label={label}
      title={title}
      className={cx('chip', className)}
    >
      {avatar && <span className="chip--avatar">{avatar}</span>}
      <span className="chip--label">{children}</span>
      {icon && <span className="chip--icon">{icon}</span>}
    </button>
  )
}

export default Chip
