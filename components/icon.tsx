import React from 'react'
import { IconProps } from '@/app/types/types-components'

const getIcon = (name: string, color?: string) => {
  switch (name.toLowerCase()) {
    case 'arrow':
      return <path fill={color} d="M50 75L25 50L75 50L50 75Z" />
    // add more icon cases as needed
    default:
      return null
  }
}

const Icon: React.FC<IconProps> = ({
  id = '',
  name,
  color,
  viewBox = '0 0 100 100',
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      aria-labelledby={`${name.replace(/\s/g, '').toLowerCase()}-${id}`}
      className={className || 'icon'}
    >
      <title id={`${name.replace(/\s/g, '').toLowerCase()}-${id}`}>
        {name}
      </title>
      {getIcon(name, color)}
    </svg>
  )
}

export default Icon
