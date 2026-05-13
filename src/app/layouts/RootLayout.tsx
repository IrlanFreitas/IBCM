import { Outlet } from 'react-router'
import { Navigation } from '../components/Navigation/Navigation'
import { Footer } from '../components/Footer/Footer'

export function RootLayout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navigation />
      <main style={{ flex: 1, paddingTop: '100px' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
