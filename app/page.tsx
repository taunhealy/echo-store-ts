import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getStaticPage, queries } from '@data'
import { Module } from '@components/modules'
import type { PageData } from '@/app/types/types-sanity'

interface PageProps {
  data: {
    site: any // Replace with proper site type
    page: PageData
  }
}

// Generate metadata for the page
export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getStaticPage(
    `*[_type == "page" && _id == ${queries.homeID}] | order(_updatedAt desc)[0]`
  )

  if (!pageData?.page) return {}

  return {
    title: pageData.page.title,
    // Add other metadata as needed
  }
}

// Main page component
export default async function HomePage() {
  const pageData = await getStaticPage(
    `
    *[_type == "page" && _id == ${queries.homeID}] | order(_updatedAt desc)[0]{
      "id": _id,
      hasTransparentHeader,
      modules[]{
        defined(_ref) => { ...@->content[0] {
          ${queries.modules}
        }},
        !defined(_ref) => {
          ${queries.modules},
        }
      },
      title,
      seo
    }
  `
  )

  if (!pageData?.page) {
    notFound()
  }

  return (
    <>
      {pageData.page.modules?.map((module, key) => (
        <Module key={key} index={key} data={module} />
      ))}
    </>
  )
}
