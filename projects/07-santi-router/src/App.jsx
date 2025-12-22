import { lazy, Suspense } from "react"
import "./App.css"

// import HomePage from "./pages/Home"
// import AboutPage from "./pages/About"
import { Page404 } from "./pages/404"
import SearchPage from "./pages/Search"

import { Router } from "./Router"
import { Route } from "./pages/Route"

const HomePage = lazy(() => import('./pages/Home.jsx'))
const AboutPage = lazy(() => import('./pages/About.jsx'))



const routes = [
  {
    path: '/search/:query',
    Component: SearchPage
  }
]


function App() {
  return (
    <main>
      <Suspense fallback={null}>
        <Router routes={routes} defaultComponent={Page404}>
          <Route path='/' Component={HomePage} />
          <Route path='/about' Component={AboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
