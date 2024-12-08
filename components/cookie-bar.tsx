'use client'

import React from 'react'
import { m, AnimatePresence } from 'framer-motion'
import FocusTrap from 'focus-trap-react'

import { useHasMounted } from '@lib/helpers'
import { useAcceptCookies } from '@/app/hooks/Cookies'

import CustomLink from '@components/link'

interface CookieBarProps {
  data: {
    enabled: boolean
    message: string
    link?: any // Sanity link type
  } | null
}

const barAnim = {
  show: {
    y: '0%',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  hide: {
    y: '100%',
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
}

const CookieBar: React.FC<CookieBarProps> = React.memo(({ data }) => {
  if (!data) return null

  const { enabled, message, link } = data

  if (!enabled) return null

  const hasMounted = useHasMounted()
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()

  if (!hasMounted || !message) return null

  return (
    <AnimatePresence>
      {!acceptedCookies && (
        <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
          <m.div
            initial="hide"
            animate="show"
            exit="hide"
            variants={barAnim}
            role="dialog"
            aria-live="polite"
            className="cookie-bar"
          >
            <div className="cookie-bar--content is-inverted">
              <div className="cookie-bar--message">
                <p>
                  {message.split('\n').map((text, i) => (
                    <React.Fragment key={i}>
                      {text}
                      {message.split('\n')[i + 1] && <br />}
                    </React.Fragment>
                  ))}
                </p>
              </div>

              <div className="cookie-bar--actions">
                {link && (
                  <CustomLink
                    className="btn is-text"
                    link={{ ...{ page: link }, ...{ title: 'Learn More' } }}
                  />
                )}
                <button
                  onClick={() => onAcceptCookies()}
                  className="btn is-primary"
                >
                  Accept
                </button>
              </div>
            </div>
          </m.div>
        </FocusTrap>
      )}
    </AnimatePresence>
  )
})

CookieBar.displayName = 'CookieBar'

export default CookieBar
