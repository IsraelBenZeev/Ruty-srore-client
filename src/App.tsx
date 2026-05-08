import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from './config/queryClient'
import { Header } from './Features/layout/Header'
import { Footer } from './Features/layout/Footer'
import { ProductsScreen } from './Features/products/ProductsScreen'

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1">
          <ProductsScreen />
        </main>
        <Footer />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
