'use client'

import React from 'react'
import cx from 'classnames'

interface SwatchProps {
  label: string
  color?: string
  active?: boolean
  className?: string
  onClick?: () => void
}

const Swatch: React.FC<SwatchProps> = ({
  label,
  color,
  active,
  className,
  onClick,
}) => {
  return (
    <button
      className={cx('swatch', className, { 'is-active': active })}
      onClick={onClick}
      style={color ? { backgroundColor: color } : undefined}
      title={label}
      aria-label={label}
    />
  )
}

export default Swatch
