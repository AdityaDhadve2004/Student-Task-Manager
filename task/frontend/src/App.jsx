import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup,{ActionLogin} from "./pages/Signup"

function App() {
 const router = createBrowserRouter(createRoutesFromElements(
  <>
  <Route path="/" element={<Home/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/signup" element={<Signup/>} action={ActionLogin}/>
  </>

 ))

  return (
    <>
     <RouterProvider router={router}/> 
    </>
  )
}

export default App
