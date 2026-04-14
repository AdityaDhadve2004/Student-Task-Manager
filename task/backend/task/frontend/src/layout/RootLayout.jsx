import { useLoaderData, Outlet } from "react-router-dom"
import { authUser } from "../api"
export async function rootLoader() {

    const res = await authUser()
    console.log("ROOT LOADER RUNNING")
    console.log(res)

    console.log("STATUS:", res.status)
    if (!res.ok) {
        return { user: null }
    }

    const userData = await res.json()

    return { user: userData.data }


}

export default function RootLayout() {
    const { user } = useLoaderData()

    return (<Outlet context={{ user }} />)
}
