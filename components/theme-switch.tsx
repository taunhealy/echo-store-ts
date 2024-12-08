'use client'

import React from 'react'
import { useTheme } from 'next-themes'

const ThemeSwitch: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <button
      className="theme-switch"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle Dark Mode"
    >
      <div className="theme-switch--icon">
        <div className="theme-switch--icon-sun" />
        <div className="theme-switch--icon-moon" />
      </div>
    </button>
  )
}

export default ThemeSwitch
