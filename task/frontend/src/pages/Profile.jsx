export default function Profile() {
  return (
    <div className="flex gap-8 p-8 bg-gray-50 min-h-screen">

    
      <div className="w-80 space-y-6">


        <div className="bg-white rounded-2xl border p-6 text-center shadow-sm">
          <img
            src="https://i.pravatar.cc/100"
            alt="avatar"
            className="w-20 h-20 rounded-full mx-auto mb-3"
          />
          <h2 className="font-semibold text-lg">Alex Johnson</h2>
          <p className="text-gray-500 text-sm">alex.johnson@example.com</p>

          <div className="flex justify-center gap-2 mt-3">
            <span className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
              Pro plan
            </span>
            <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
              Member since 2022
            </span>
          </div>

          <button className="mt-4 w-full border rounded-lg py-2 text-sm hover:bg-gray-50">
            Change avatar
          </button>
        </div>

        <div className="bg-white rounded-xl border p-2">
          <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium">
            Account
          </div>
        </div>
      </div>


      <div className="flex-1 space-y-6">

        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Account details</h2>
          <p className="text-gray-500 text-sm mb-6">
            Update your personal information.
          </p>

          <div className="grid grid-cols-2 gap-4">
    
            <div>
              <label className="text-sm text-gray-500">Full name</label>
              <input
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                defaultValue="Alex Johnson"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <input
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                defaultValue="alex.johnson@example.com"
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm text-gray-500">Short bio</label>
              <textarea
                rows={4}
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                defaultValue="Product designer who loves clean to-do lists and clear calendars."
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border p-6 shadow-sm flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Logout</h3>
            <p className="text-sm text-gray-500">
              Sign out of your account on this device.
            </p>
          </div>

          <button className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
