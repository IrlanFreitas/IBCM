import { Outlet } from 'react-router'
import { Navigation } from '../components/Navigation'
import { Footer } from '../components/Footer'

export function RootLayout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navigation />
      <main style={{ flex: 1, paddingTop: '68px' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
