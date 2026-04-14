import { Link, useRouteLoaderData } from "react-router-dom";
import { Bell, Plus, CheckCircle2, Clock, TrendingUp } from "lucide-react"




export default function Home(prop) {
    const { taskJsonData, userJsonData } = useRouteLoaderData("dashboard")
    console.log(taskJsonData.data)

    return (
        <>

            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-900">
                            Good morning, {userJsonData.data.username}!
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Here's what you need to focus on today.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-3 rounded-full border hover:bg-gray-100 transition">
                            <Bell size={18} />
                        </button>

                        <Link to="/dashboard/task-form">
                            <button className="flex items-center gap-2 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow hover:bg-emerald-600 transition">
                                <Plus size={18} />
                                Add New Task
                            </button>
                        </Link>
                    </div>
                </div>




                <div className="grid grid-cols-3 gap-6">

                    <div className="bg-white rounded-2xl p-6 shadow-sm border flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 text-sm">Tasks Completed</p>
                            <h2 className="text-3xl font-semibold mt-2">{taskJsonData.data.completed}</h2>
                        </div>
                        <CheckCircle2 className="text-emerald-500" size={26} />
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 text-sm">Pending Today</p>
                            <h2 className="text-3xl font-semibold mt-2">{taskJsonData.data.pending}</h2>
                        </div>
                        <Clock className="text-amber-500" size={26} />
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 text-sm">Productivity</p>
                            <h2 className="text-3xl font-semibold mt-2">
                                {(Number(taskJsonData.data.completed) === 0 && Number(taskJsonData.data.totalTasks) === 0) ? "0" : (Number(taskJsonData.data.completed) / Number(taskJsonData.data.totalTasks)) * 100}</h2>
                        </div>
                        <TrendingUp className="text-emerald-500" size={26} />
                    </div>

                </div>

            </div>


        </>
    )
}