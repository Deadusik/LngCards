import { useLocation } from "react-router-dom"
// router
import AppRouter from "./router/AppRouter"
import { REGISTRATION, SIGNIN, START } from "./router/paths"
// components 
import Navbar from "./components/Navbar"
import Topbar from "./components/Topbar"

function App() {
  const location = useLocation()
  const hiddenBarsPaths = [START, SIGNIN, REGISTRATION]
  const isHiddenBars = !!hiddenBarsPaths.includes(location.pathname)

  return (
    <>
      {!isHiddenBars && <Topbar />}
      <AppRouter />
      {!isHiddenBars && <Navbar />}
    </>
  )
}

export default App
