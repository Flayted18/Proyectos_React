import "./App.css"
import { EVENTS } from "./consts"
import HomePage from "./pages/Home"
import AboutPage from "./pages/About"
import { Router } from "./Router"

const routes = [
  {
    path: '/',
    Component : HomePage
  },
  {
    path: '/about',
    Component: AboutPage
  },
  {
    path: '/search/:query',
    Component: ({routeParams}) => <h4>Has buscado {routeParams.query}</h4>
  }
]


function App() {


  return (
    <main>
      <Router routes={routes}/>
    </main>
  )
}

export default App
