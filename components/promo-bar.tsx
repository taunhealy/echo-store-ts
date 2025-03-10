'use client'

import React from 'react'
import { useRouter } from 'next/router'

import { ConditionalWrapper } from '@lib/helpers'
import CustomLink from '@components/link'

interface PromoBarProps {
  data?: {
    enabled: boolean
    display: string
    text: string
    link?: any // Sanity link type
  }
}

const PromoBar: React.FC<PromoBarProps> = React.memo(({ data = {} }) => {
  const { enabled, display, text, link } = data
  const router = useRouter()

  // bail if no display or text
  if (!enabled || !display || !display.trim() || !text) return null

  // bail if display set to homepage and we're not on the homepage
  if (display === 'home' && router.asPath !== '/') return null

  return (
    <div className="promo-bar is-inverted">
      <div className="promo-bar--content">
        <ConditionalWrapper
          condition={link}
          wrapper={(children: React.ReactNode) => (
            <CustomLink
              className="promo-bar--link"
              link={{ ...{ page: link } }}
            >
              {children}
            </CustomLink>
          )}
        >
          {text}
        </ConditionalWrapper>
      </div>
    </div>
  )
})

PromoBar.displayName = 'PromoBar'

export default PromoBar
