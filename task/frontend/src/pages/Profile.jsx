import { useLoaderData } from "react-router-dom";
import { getCurrentUser } from "../api"
export async function loader() {
  const res = await getCurrentUser();
  return res

}

export default function Profile() {
  const res = useLoaderData();
  console.log(res.data);
  return (
    <div className="flex gap-8 p-8 bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div className="w-80 space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border p-6 text-center shadow-sm">
          <img
            src={res.data.avatar}
            alt="avatar"
            className="w-20 h-20 rounded-full mx-auto mb-3"
          />
          <h2 className="font-semibold text-lg">{res.data.username}</h2>
          <p className="text-gray-500 text-sm">{res.data.email}</p>

          <button className="mt-4 w-full border rounded-lg py-2 text-sm hover:bg-gray-100">
            Change avatar
          </button>
        </div>

        {/* Sidebar Menu (ONLY ACCOUNT) */}
        <div className="bg-white rounded-2xl border p-4 shadow-sm">
          <div className="px-3 py-2 rounded-lg bg-blue-100 text-blue-600 font-medium">
            Account
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Account Details */}
        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Account details</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
              Save changes
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="text-sm text-gray-500">Full name</label>
              <input
                type="text"
                defaultValue={res.data.username}
                className="w-full mt-1 border rounded-lg px-3 py-2"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <input
                type="email"
                defaultValue={res.data.email}
                className="w-full mt-1 border rounded-lg px-3 py-2"
              />
            </div>

            {/* Short Bio (Full Width) */}
            <div className="col-span-2">
              <label className="text-sm text-gray-500">Short bio</label>
              <textarea
                rows="3"
                placeholder="Write something about yourself..."
                className="w-full mt-1 border rounded-lg px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Session Section (Simplified) */}
        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Session</h2>

          <div className="flex justify-between items-center border rounded-lg px-4 py-3">
            <div>
              <p className="font-medium">Password</p>
              <p className="text-sm text-gray-500">••••••••</p>
            </div>
            <button className="text-blue-600 text-sm font-medium">
              Change
            </button>
          </div>

          {/* Logout */}
          <div className="mt-6 flex justify-end">
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
