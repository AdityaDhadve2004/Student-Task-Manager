import { getAllUserTask, toggleUserTaskStatus } from "../api"
import { useLoaderData, useRevalidator } from "react-router-dom"

export async function loader() {
    const res = await getAllUserTask()
    return res
}



export default function Usertasks() {
    const res = useLoaderData()
    const tasks = res.data.tasks
    console.log(res.data);
    const { revalidate } = useRevalidator()

    async function toggleTask(id) {
        const updatedTask = await toggleUserTaskStatus(id)
        console.log(updatedTask);
        revalidate()
       
    }


    return (
        <>
            <div className="space-y-3">
                {tasks.map(task => (
                    <div
                        key={task._id}
                        className={`flex items-start justify-between p-4 rounded-xl border transition
        ${task.status !== "pending"
                                ? "bg-gray-50 border-gray-200 opacity-70"
                                : "bg-white border-gray-200 hover:shadow-sm"
                            }`}
                    >

                        <div className="flex gap-3">

                            <input
                                type="checkbox"
                                checked={task.status !== "pending"}
                                onChange={() => toggleTask(task._id)}
                                className="mt-1 h-4 w-4 accent-emerald-500 cursor-pointer"
                            />

                            <div>
                                <h3
                                    className={`font-semibold text-sm transition
              ${task.status !== "pending" ? "line-through text-gray-400" : "text-gray-800"}
            `}
                                >
                                    {task.title}
                                </h3>

                                <p
                                    className={`text-sm mt-1
              ${task.status !== "pending" ? "line-through text-gray-300" : "text-gray-500"}
            `}
                                >
                                    {task.description}
                                </p>
                            </div>
                        </div>


                        <div className="flex items-center gap-3">

                            <span
                                className={`text-xs px-3 py-1 rounded-full font-medium
            ${task.priority === "high"
                                        ? "bg-red-100 text-red-500"
                                        : task.priority === "medium"
                                            ? "bg-orange-100 text-orange-500"
                                            : "bg-emerald-100 text-emerald-500"
                                    }
          `}
                            >
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                            </span>


                            <span className="text-xs text-gray-400">
                                {task.time}
                            </span>
                        </div>
                    </div>
                ))}
            </div>


        </>

    )
}