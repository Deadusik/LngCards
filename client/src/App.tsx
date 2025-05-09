import { useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Topbar from "./components/Topbar"
import AppRouter from "./router/AppRouter"
import { START } from "./router/paths"

function App() {
  const location = useLocation()
  const hiddenBarsPaths = [START]
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
