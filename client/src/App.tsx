import Navbar from "./components/Navbar"
import Topbar from "./components/Topbar"
import AppRouter from "./router/AppRouter"

function App() {
  return (
    <>
      <Topbar />
      <AppRouter />
      <Navbar />
    </>
  )
}

export default App
