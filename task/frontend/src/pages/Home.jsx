//import { redirect } from "react-router-dom"
//import { getCurrentUser } from "../utils/auth.server"
import { Link } from "react-router-dom"
import MockImage from "../images/MockImage.png"
import MainLogo from "../images/MainLogo.jpg"

/*export async function loader({ request }) {
   const user = await getCurrentUser(request)

    if (user) {
        throw redirect("/dashboard")

    }


    return null
}*/




export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white px-6 py-6">

            <nav className="flex justify-between items-center max-w-6xl mx-auto">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg"><img src={MainLogo} alt="" srcset="" /></div>
                    <h1 className="text-xl font-semibold">TaskEasy</h1>
                </div>

                <div className="flex gap-3">
                    <Link
                        to="/login"
                        className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                        Log in
                    </Link>
                    <Link
                        to="/signup"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Sign up
                    </Link>
                </div>
            </nav>

           
            <section className="max-w-6xl mx-auto mt-20 grid md:grid-cols-2 gap-12 items-center">

               
                <div>
                    <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm mb-6">
                        ✨ Stay on top of your day
                    </div>

                    <h2 className="text-5xl font-bold leading-tight mb-6">
                        Simple task management for busy days.
                    </h2>

                    <p className="text-gray-500 text-lg mb-8">
                        Capture tasks, organize your to-dos, and never miss a deadline.
                        Designed to be fast, clean, and distraction-free.
                    </p>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/signup"
                            className="px-6 py-3 bg-blue-600 text-white rounded-xl text-lg font-medium hover:bg-blue-700"
                        >
                            Get started free
                        </Link>

                        <p className="text-gray-500">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-600 font-medium hover:underline">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>

               
                <div className="bg-gray-100 rounded-2xl p-6 shadow-lg">
                    <img
                        src={MockImage}
                        alt="Task Manager UI"
                        className="rounded-xl"
                    />
                </div>
            </section>
        </div>
    )
}


