import React, { useState, useEffect, useRef } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import FocusTrap from 'focus-trap-react'
import cx from 'classnames'

import RadioGroup from '@components/radio-group'
import RadioItem from '@components/radio-item'

interface ListboxProps {
  id: string
  name: string
  label: string
  defaultValue?: string | number
  value?: string | number
  values: Array<{
    title: string
    value: string | number
  }>
  onChange?: (value: string | number) => void
  className?: string
  before?: React.ReactNode
}

const listboxAnim = {
  initial: {
    opacity: 0,
    y: -4,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -4,
  },
}

const Listbox: React.FC<ListboxProps> = ({
  id,
  name,
  label,
  defaultValue,
  value: controlledValue,
  values,
  onChange,
  className,
  before,
}) => {
  const isControlled = controlledValue !== undefined
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(defaultValue || values[0]?.value)
  const listboxRef = useRef<HTMLDivElement>(null)

  const currentValue = isControlled ? controlledValue : selectedValue
  const currentLabel = values.find((v) => v.value === currentValue)?.title

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        listboxRef.current &&
        !listboxRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  const handleChange = (value: string | number) => {
    if (!isControlled) {
      setSelectedValue(value)
    }
    onChange?.(value)
    setIsOpen(false)
  }

  return (
    <div ref={listboxRef} className={cx('listbox', className)}>
      <button
        type="button"
        className="listbox--btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`listbox-${id}`}
      >
        <span className="listbox--btn-label">{label}</span>
        <span className="listbox--btn-value">{currentLabel}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <FocusTrap
            focusTrapOptions={{
              allowOutsideClick: true,
              clickOutsideDeactivates: true,
            }}
          >
            <m.div
              id={`listbox-${id}`}
              className="listbox--content"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={listboxAnim}
            >
              <RadioGroup className="listbox--options">
                {values.map((option, key) => (
                  <RadioItem
                    key={key}
                    id={`${id}-${key}`}
                    name={name}
                    value={option.value}
                    checked={option.value === currentValue}
                    onChange={handleChange}
                  >
                    {option.title}
                  </RadioItem>
                ))}
              </RadioGroup>
            </m.div>
          </FocusTrap>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Listbox 