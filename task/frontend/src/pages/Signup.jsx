import { Form, Link } from "react-router-dom"
import MainLogo from "../images/MainLogo.jpg"
import MockImage from "../images/MockImage.png"
import {createUser} from "../api"
import {redirect} from "react-router-dom"
export async function signUpAction({ request }) {
    const formData = await request.formData()
    const data = new FormData()
    data.append('username', formData.get('username'))
    data.append('email', formData.get('email'))
    data.append('password', formData.get('password'))
    data.append('avatar', formData.get('avatar'))  
    
    const res = await createUser(data)

    if (!res.ok) {
        const error = await res.json()
        console.log("Signup failed:", error)
        return null
    }
    else {
        const result = await res.json()
        console.log("Signup success:", result)
        return redirect("/login",{replace:true})
    }
}


export default function SignupPage() {
    return (
        <div className="min-h-screen grid md:grid-cols-2">


            <div className="flex flex-col justify-center px-10 md:px-20">


                <div className="flex items-center gap-2 mb-10">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg"><img src={MainLogo} alt=""/></div>
                    <h1 className="text-xl font-semibold">DayTask</h1>
                </div>

                <h2 className="text-3xl font-bold mb-2">Create an account</h2>
                <p className="text-gray-500 mb-8">
                    Start managing your tasks effectively today.
                </p>


                <Form method="post" encType="multipart/form-data" className="space-y-5">

                    <div>
                        <label className="block mb-2 font-medium">User Name</label>
                        <input
                            type="text"
                            name="username"
                            required
                            placeholder="Enter your name"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="Create a password"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>


                    <div>
                        <label className="block mb-2 font-medium">Profile Image</label>
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            className="w-full text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition"
                    >
                        Create account
                    </button>

                </Form>

                <p className="text-gray-500 mt-8">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 font-medium hover:underline">
                        Log in
                    </Link>
                </p>
            </div>


            <div className="mt-56 mr-10">
                <img
                    src={MockImage}
                    alt="Workspace"

                />
            </div>
        </div>
    )
}
