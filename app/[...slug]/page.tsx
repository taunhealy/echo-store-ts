import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getPage, getAllDocSlugs } from '@data'
import { Module } from '@components/modules'
import { ModuleType, PageType } from '@/app/types/types-sanity'

type PageProps = {
  params: {
    slug: string[]
  }
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const pageData = await getPage(params.slug.join('/'))

  if (!pageData) return {}

  return {
    title: pageData.page.title,
    // Add other metadata as needed
  }
}

// Main page component
export default async function Page({ params }: PageProps) {
  const data = await getPage(params.slug.join('/'))

  if (!data) {
    notFound()
  }

  return (
    <>
      {data.page.modules?.map((moduleData: ModuleType, index: number) => (
        <Module key={index} index={index} data={moduleData} />
      ))}
    </>
  )
}

// Generate static paths
export async function generateStaticParams() {
  const allPages = await getAllDocSlugs('page')

  return (
    allPages?.map((page: PageType) => ({
      slug: page.slug?.split('/').filter(Boolean) || [],
    })) || []
  )
}
