import { getAllUserTask, toggleUserTaskStatus, deleteUserTask } from "../api"
import { Form, useLoaderData, useRevalidator, useSearchParams, redirect } from "react-router-dom"
import { X } from "lucide-react"
import { updateUserTask } from "../api"



export async function loader() {
    const res = await getAllUserTask()
    return res
}

export async function updateAction({ request }) {
    const formData = await request.formData()
    const jsonData = Object.fromEntries(formData)
    console.log(jsonData)
    const url = new URL(request.url)
    const id = url.searchParams.get("edit");
    const res = await updateUserTask(id, jsonData);
    const data = await res.json()
    console.log(data);
    return redirect("/dashboard/tasks")
}



export default function Usertasks() {
    const res = useLoaderData()
    const [searchParams, setSearchParams] = useSearchParams()
    const tasks = res.data.tasks
    const editId = searchParams.get("edit")
    const isOpen = !!editId
    const selectedTask = tasks.find(t => t._id === editId)
    const { revalidate } = useRevalidator()

    const id = searchParams.get("edit");
    console.log(id);


    function handleTaskIdChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }



    async function toggleTask(id) {
        const updatedTask = await toggleUserTaskStatus(id)
        console.log(updatedTask);
        revalidate()

    }

    function openEditor(task) {
        handleTaskIdChange("edit", task._id)
    }
    function closeEditor() {
        setSearchParams({})
    }

    async function deleteTask(id) {
        const deletedTask = await deleteUserTask(id)
        console.log(deletedTask)
        revalidate()
    }


    return (
        <>
            <div className="space-y-3">
                {tasks.map(task => (
                    <div
                        onClick={() => openEditor(task)}
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
                                onClick={(e) => e.stopPropagation()}
                                className="mt-1 h-4 w-4 accent-emerald-500 cursor-pointer"
                            />

                            <div>
                                <h3
                                    className={`font-semibold text-sm transition
              ${task.status !== "pending"
                                            ? "line-through text-gray-400"
                                            : "text-gray-800"
                                        }`}
                                >
                                    {task.title}
                                </h3>

                                <p
                                    className={`text-sm mt-1
              ${task.status !== "pending"
                                            ? "line-through text-gray-300"
                                            : "text-gray-500"
                                        }`}
                                >
                                    {task.description}
                                </p>
                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="flex items-center gap-3">

                            <span
                                className={`text-xs px-3 py-1 rounded-full font-medium
            ${task.priority === "high"
                                        ? "bg-red-100 text-red-500"
                                        : task.priority === "medium"
                                            ? "bg-orange-100 text-orange-500"
                                            : "bg-emerald-100 text-emerald-500"
                                    }`}
                            >
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                            </span>

                            <span className="text-xs text-gray-400">
                                {task.time}
                            </span>

                            <span className="text-xs text-black-400">
                                {task.dueDate.toString().slice(0,10)}
                            </span>


                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    deleteTask(task._id)
                                }}

                                className="p-1.5 rounded-md hover:bg-red-50 active:scale-95 transition"
                                disabled={task.status === "completed"}
                            >
                                <X
                                    size={16}
                                    className="text-red-500 group-hover:text-red-600"
                                />
                            </button>

                        </div>
                    </div>
                ))}

                {isOpen && (
                    <div
                        onClick={closeEditor}
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"

                    />
                )}
                {
                    isOpen !== null ? <div
                        className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-2xl z-50
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
                    >
                        <div
                            className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-xl z-50
  transform transition-transform duration-300 ease-in-out
  ${isOpen ? "translate-x-0" : "translate-x-full"}`}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b">
                                <h2 className="font-semibold text-lg">Edit Task</h2>
                                <button onClick={closeEditor}>❌</button>
                            </div>

                            {/* Form */}
                            {selectedTask && (
                                <Form method="POST">
                                    <div className="p-4 space-y-4">

                                        {/* Title */}
                                        <input
                                            className="w-full border rounded-lg p-2"
                                            defaultValue={selectedTask.title}
                                            name="title"
                                        />

                                        {/* Description */}
                                        <textarea
                                            className="w-full border rounded-lg p-2"
                                            defaultValue={selectedTask.description}
                                            name="description"
                                        />

                                        {/* Time */}
                                        <input
                                            type="time"
                                            name="time"
                                            defaultValue={selectedTask.time}
                                            className="w-full border rounded-lg p-2"
                                        />

                                        {/* Priority */}
                                        <select
                                            name="priority"
                                            defaultValue={selectedTask.priority}
                                            className="w-full border rounded-lg p-2"
                                        >
                                            <option value="low">Low Priority</option>
                                            <option value="medium">Medium Priority</option>
                                            <option value="high">High Priority</option>
                                        </select>

                                        {/* Submit */}
                                        <button className="w-full bg-emerald-500 text-white py-2 rounded-lg">
                                            Save Changes
                                        </button>

                                    </div>
                                </Form>
                            )}
                        </div>
                    </div> : null
                }

            </div>


        </>

    )
}