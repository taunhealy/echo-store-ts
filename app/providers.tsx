'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'

import { isBrowser } from '@lib/helpers'
import { pageTransitionSpeed } from '@lib/animate'
import { useSiteContext, useTogglePageTransition } from '@lib/context'

export function Providers({ children }) {
  const pathname = usePathname()
  const togglePageTransition = useTogglePageTransition()
  const { isPageTransition } = useSiteContext()

  // Handle page transitions
  useEffect(() => {
    togglePageTransition(true)
    setTimeout(() => togglePageTransition(false), pageTransitionSpeed)
  }, [pathname])

  // Handle loading class
  useEffect(() => {
    if (isBrowser) {
      document.documentElement.classList.toggle('is-loading', isPageTransition)
    }
  }, [isPageTransition])

  // Handle keyboard focus
  useEffect(() => {
    const handleFirstTab = (event) => {
      if (event.keyCode === 9) {
        if (isBrowser) {
          document.body.classList.add('is-tabbing')
          window.removeEventListener('keydown', handleFirstTab)
        }
      }
    }

    window.addEventListener('keydown', handleFirstTab)
    return () => {
      window.removeEventListener('keydown', handleFirstTab)
    }
  }, [])

  // Console Credits
  useEffect(() => {
    if (isBrowser) {
      console.groupCollapsed(
        '%c Site Credits',
        'display:block;padding:0.125em 1em;font-family:courier;font-size:14px;font-weight:bold;line-height:2;text-transform:uppercase;background:black;color:white;'
      )
      console.log(
        '%cDesign & Development by Taun Healy \n– https://circa9.co.za',
        'display:block;font-family:courier;font-size:12px;font-weight:bold;line-height:1;color:black;'
      )
      console.groupEnd()
    }
  }, [])

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        document.body.classList.remove('overflow-hidden')
      }}
    >
      {children}
    </AnimatePresence>
  )
}
