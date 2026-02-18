import { NavLink, useRouteLoaderData } from "react-router-dom"
import MainLogo from "../images/MainLogo.jpg"

export default function Navbar(prop) {
    const { userJsonData } = useRouteLoaderData("dashboard")
    
    return (
        <div className="w-64 h-screen bg-white border-r flex flex-col justify-between p-5">

            <div>
                <div className="flex items-center gap-2 mb-10">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg"><img src={MainLogo} alt="" /></div>
                    <h1 className="text-xl font-semibold">TaskEasy</h1>
                </div>
                <nav className="space-y-2">

                    <NavLink
                        to="."
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all
              ${isActive
                                ? "bg-emerald-500 text-white"
                                : "text-gray-600 hover:bg-emerald-50"}`
                        }
                    >

                        Home
                    </NavLink>

                    <NavLink
                        to="/dashboard/tasks"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all
              ${isActive
                                ? "bg-emerald-500 text-white"
                                : "text-gray-600 hover:bg-emerald-50"}`
                        }
                    >

                        My Tasks
                    </NavLink>

                    <NavLink
                        to="/dashboard/profile"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all
              ${isActive
                                ? "bg-emerald-500 text-white"
                                : "text-gray-600 hover:bg-emerald-50"}`
                        }
                    >

                        Profile
                    </NavLink>

                </nav>
            </div>

            {/* Bottom User Section */}
            <div className="flex items-center gap-3 p-3 border-t">
                <img
                    src={userJsonData.data.avatar}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                />
                <div>
                    <p className="text-sm font-medium">{userJsonData.data.username}</p>
                    <p className="text-xs text-gray-500">Pro Plan</p>
                </div>
            </div>

        </div>
    )
}
