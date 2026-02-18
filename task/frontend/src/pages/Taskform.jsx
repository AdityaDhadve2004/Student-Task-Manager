import { useState } from "react"
import { Form,redirect } from "react-router-dom"
import { Calendar, Clock, ArrowLeft, Plus } from "lucide-react"
import { createUserTask } from "../api"

export async function newTaskAction({ request }) {
  const formData = await request.formData()
  const jsonData = Object.fromEntries(formData)
  console.log(jsonData)
  const res = await createUserTask(jsonData)
  if (!res.ok) {
    const error = await res.json()
    console.log("Signup failed:", error)
    return null
  }

  else {
    const result = await res.json()
    return redirect("/dashboard/tasks")
    
  }
}

export default function Taskform() {
  const [priority, setPriority] = useState("medium")

  const priorities = ["low", "medium", "high"]

  const getPriorityStyles = (value) => {
    const base =
      "flex-1 py-3 rounded-xl border text-sm font-medium transition"

    if (priority === value) {
      if (value === "low") return `${base} border-gray-300 bg-gray-100`
      if (value === "medium") return `${base} border-emerald-500 bg-emerald-50 text-emerald-600`
      if (value === "high") return `${base} border-red-500 bg-red-50 text-red-600`
    }

    return `${base} border-gray-200 text-gray-500 hover:bg-gray-50`
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg border">
          <ArrowLeft size={16} />
        </button>
        <h2 className="text-lg font-semibold">Add New Task</h2>
      </div>

      <Form method="post" className="space-y-5">

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Task Title
          </label>
          <input
            name="title"
            placeholder="e.g., Q3 Report Review"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            rows={4}
            placeholder="Add details, subtasks, or notes..."
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Due Date
          </label>
          <div className="relative">
            <input
              type="date"
              name="date"
              className="w-full border rounded-xl px-4 py-3 pr-10 outline-none"
            />
            <Calendar
              className="absolute right-3 top-3 text-gray-400"
              size={18}
            />
          </div>
        </div>


        {/* Priority */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Priority
          </label>

          <div className="flex gap-3">
            {priorities.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={getPriorityStyles(p)}
              >
                {{ low: "Low", medium: "Medium", high: "High" }[p]}

              </button>
            ))}
          </div>
          {/* Hidden input to submit priority */}
          <input type="hidden" name="priority" value={priority} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Time
          </label>
          <div className="relative">
            <input
              type="time"
              name="time"
              className="w-full border rounded-xl px-4 py-3 pr-10 outline-none"
            />
            <Clock
              className="absolute right-3 top-3 text-gray-400"
              size={18}
            />
          </div>
        </div>


        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-emerald-700 transition"
        >
          <Plus size={18} />
          Create Task
        </button>

      </Form>
    </div>
  )
}
