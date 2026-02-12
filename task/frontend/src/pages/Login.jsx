import { Link } from "react-router-dom"
import { Form } from "react-router-dom"
import MainLogo from "../images/MainLogo.jpg"
import MockImage from "../images/MockImage.png"



export default function LoginPage() {
    return (
        <div className="min-h-screen grid md:grid-cols-2">


            <div className="flex flex-col justify-center px-10 md:px-20">


                <div className="flex items-center gap-2 mb-10">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg"><img src={MainLogo} alt="" srcset="" /></div>
                    <h1 className="text-xl font-semibold">DayTask</h1>
                </div>

                <h2 className="text-3xl font-bold mb-2">Log in</h2>
                <p className="text-gray-500 mb-8">
                    Welcome back! Please enter your details.
                </p>

                <Form method="post" className="space-y-5">
                    <div>
                        <label className="block mb-2 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="hello@example.com"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="••••••••"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition"
                    >
                        Sign in
                    </button>
                </Form>

                {/* Signup link */}

                <p>
                    Don’t have an account?{" "}
                    <Link className="text-blue-600 font-medium hover:underline">

                        Sign up
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
