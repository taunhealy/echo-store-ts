'use client'

import React from 'react'

interface RadioGroupProps {
  children: React.ReactNode
  className?: string
}

const RadioGroup: React.FC<RadioGroupProps> = ({ children, className }) => {
  return (
    <div role="radiogroup" className={className}>
      {children}
    </div>
  )
}

export default RadioGroup
