import { lazy, Suspense } from 'react'
import type { RouteObject } from 'react-router'
import { RootLayout } from './layouts/RootLayout'

const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })))
const QuemSomosPage = lazy(() =>
  import('./pages/QuemSomosPage').then((m) => ({ default: m.QuemSomosPage }))
)
const ProjetosPage = lazy(() =>
  import('./pages/ProjetosPage').then((m) => ({ default: m.ProjetosPage }))
)
const DoeAgoraPage = lazy(() =>
  import('./pages/DoeAgoraPage').then((m) => ({ default: m.DoeAgoraPage }))
)
const TransparenciaPage = lazy(() =>
  import('./pages/TransparenciaPage').then((m) => ({ default: m.TransparenciaPage }))
)

function PageLoader() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '2px solid var(--ink-12)',
          borderTopColor: 'var(--terra)',
          animation: 'spin 0.7s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

function withSuspense(Component: React.ComponentType) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  )
}

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: withSuspense(Home) },
      { path: '/quem-somos', element: withSuspense(QuemSomosPage) },
      { path: '/projetos', element: withSuspense(ProjetosPage) },
      { path: '/doe-agora', element: withSuspense(DoeAgoraPage) },
      { path: '/transparencia', element: withSuspense(TransparenciaPage) },
    ],
  },
]
