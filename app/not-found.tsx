import { Metadata } from 'next'
import { getStaticPage, queries } from '@data'
import Layout from '@components/layout'
import { Module } from '@components/modules'

export const metadata: Metadata = {
  title: 'Page Not Found',
}

export default async function NotFound() {
  // Fetch error page data from Sanity
  const pageData = await getStaticPage(
    `*[_type == "page" && _id == ${queries.errorID}] | order(_updatedAt desc)[0]`
  )

  if (!pageData?.page) {
    return (
      <div className="error-page">
        <h1>404 - Page Not Found</h1>
        <p>The "Error Page (404)" is not set in Sanity, or the page data is missing</p>
      </div>
    )
  }

  return (
    <Layout site={pageData.site} page={pageData.page}>
      {pageData.page.modules?.map((module, key) => (
        <Module key={key} index={key} data={module} />
      ))}
    </Layout>
  )
}
