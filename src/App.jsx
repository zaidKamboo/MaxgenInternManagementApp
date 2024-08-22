import AllRoutes from "./AllRoutes/AllRoutes"
import { BrowserRouter } from "react-router-dom"
import Navbar from "./Components/Common/Navbar"
import Alert from "./Components/Common/Alert"
const App = () => {
  return (
    <BrowserRouter>
      <div className='bg-slate-950 max-w-screen min-h-screen overflow-x-hidden '>
        <Alert />
        <Navbar />
        <AllRoutes />
      </div>
    </BrowserRouter>
  )
}

export default App
