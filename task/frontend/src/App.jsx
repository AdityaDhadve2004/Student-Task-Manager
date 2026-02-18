import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"
import LandingPage from "./pages/Landingpage"
import Login, { actionLogin } from "./pages/Login"
import Signup, { signUpAction } from "./pages/Signup"
import DashBoardLayout, { loader as dashBoardLoader } from "./layout/DashboardLayout"
import Home from "./pages/Home"
import RootLayout, { rootLoader } from "./layout/RootLayout"
import Taskform, { newTaskAction } from "./pages/Taskform"
import Usertasks, { loader as taskLoader } from "./pages/Usertasks"
import Profile from "./pages/Profile"
import NullLayout from "./layout/NullLayout"

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route element={<RootLayout />} loader={rootLoader}>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<Login />} action={actionLogin} />
        <Route path="/signup" element={<Signup />} action={signUpAction} />
        <Route path="/dashboard" element={<DashBoardLayout />} loader={dashBoardLoader}>
          <Route index element={<NullLayout />} />
          <Route path="/dashboard/tasks" element={<Usertasks />} loader={taskLoader} />
          <Route path="/dashboard/task-form" element={<Taskform />} action={newTaskAction} />
          <Route path="/dashboard/profile" element={<Profile />} />


        </Route>
      </Route>

    </>

  ))

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
