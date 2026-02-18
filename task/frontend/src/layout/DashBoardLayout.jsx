import { Outlet, useLoaderData } from "react-router-dom"
import Navbar from "../pages/Navbar"
import { authUser, getDashBoardTasks } from "../api"
import { redirect } from "react-router-dom"
import Home from "../pages/Home"



export async function loader() {
  const userData = await authUser()
  const taskData = await getDashBoardTasks()
  if (!userData.ok) {
    return redirect("/", { replace: true })
  }

  const userJsonData = await userData.json();
  const taskJsonData = await taskData.json()

  return { userJsonData, taskJsonData }
}


export default function DashboardLayout() {
  const { userJsonData, taskJsonData } = useLoaderData()
  console.log(userJsonData, taskJsonData)


  return (
    <div className="flex min-h-screen">
      <Navbar user={userJsonData} />

      <div className="flex-1 bg-gray-50 p-8">
        <Home task={taskJsonData} user={userJsonData}  />
        <div className="mt-6">
          <Outlet/>
        </div>
      </div>
    </div>
  )
}
