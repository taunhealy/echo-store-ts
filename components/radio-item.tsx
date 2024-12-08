'use client'

import React from 'react'
import cx from 'classnames'

interface RadioItemProps {
  id: string
  name: string
  value: string | number
  checked?: boolean
  onChange?: (value: string | number) => void
  className?: string
  children?: React.ReactNode
}

const RadioItem: React.FC<RadioItemProps> = ({
  id,
  name,
  value,
  checked,
  onChange,
  className,
  children,
}) => {
  return (
    <div className={cx('radio', className)}>
      <input
        className="radio--input"
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange?.(e.target.value)}
      />
      <label className="radio--label" htmlFor={id}>
        {children}
      </label>
    </div>
  )
}

export default RadioItem
