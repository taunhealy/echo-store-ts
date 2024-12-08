import { domAnimation } from 'framer-motion'
import { SiteContextProvider } from '@/lib/context'
import { LazyMotion } from 'framer-motion'
import { ThemeProvider } from 'next-themes'
import { Providers } from './providers'
import { Cart } from '@/components/cart'

// app/layout.tsx
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider enableSystem={false} disableTransitionOnChange>
          <SiteContextProvider
            data={{
              shopifyClient: null, // Initialize with your Shopify client
              isLoading: false,
              isAdding: false,
              isUpdating: false,
              isCartOpen: false,
              checkout: {
                id: null,
                lineItems: [],
              },
              productCounts: [],
            }}
          >
            <Providers>{children}</Providers>
            <Cart
              data={{
                shop: {
                  storeURL: process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL,
                  cartMessage: 'Your cart message here',
                },
              }}
            />
          </SiteContextProvider>
        </ThemeProvider>
        <div id="drawer" />
      </body>
    </html>
  )
}
