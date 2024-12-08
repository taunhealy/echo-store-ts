'use client'

import React, { useState, useCallback } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import cx from 'classnames'

import { AccordionProps } from '@/app/types/types-components'

const Accordion: React.FC<AccordionProps> = ({
  id,
  title,
  isOpen = false,
  isControlled = true,
  onToggle,
  className,
  children,
}) => {
  const [isActive, setIsActive] = useState(isOpen)

  const handleToggle = useCallback(() => {
    if (isControlled && onToggle) {
      onToggle(id, !isActive)
    }
    setIsActive(!isActive)
  }, [id, isActive, isControlled, onToggle])

  const activeState = isControlled ? isOpen : isActive

  return (
    <div className={cx('accordion', className, { 'is-active': activeState })}>
      <button className="accordion--toggle" onClick={handleToggle}>
        <div className="accordion--title">{title}</div>
      </button>

      <AnimatePresence initial={false}>
        {activeState && (
          <m.div
            initial="hide"
            animate="show"
            exit="hide"
            className="accordion--content"
          >
            {children}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Accordion
