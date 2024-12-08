'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface CustomLinkProps {
  link: {
    title?: string
    url?: string
    page?: {
      slug?: string
    }
    isExternal?: boolean
    _type?: string
  }
  className?: string
  onClick?: () => void
  children?: React.ReactNode
}

const CustomLink: React.FC<CustomLinkProps> = ({
  link,
  className,
  onClick,
  children,
}) => {
  const router = useRouter()

  if (!link) return null

  // External Link
  if (link.url) {
    return (
      <a
        href={link.url}
        className={className}
        target={link.isExternal ? '_blank' : '_self'}
        rel={link.isExternal ? 'noopener noreferrer' : ''}
        onClick={onClick}
      >
        {children ? children : link.title}
      </a>
    )
  }

  // Internal Page Link
  const isActive = router.asPath === `/${link.page?.slug}`

  return (
    <Link
      href={`/${link.page?.slug}`}
      className={className}
      data-active={isActive}
      onClick={onClick}
    >
      {children ? children : link.title}
    </Link>
  )
}

export default CustomLink
