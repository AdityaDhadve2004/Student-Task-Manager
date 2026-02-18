export async function createUser(formData) {
    const res = await fetch("http://localhost:3000/api/v1/users/register", {
        method: "POST",
        body: formData,
        credentials: "include"
    })
    return res
}
export async function loginUser(formData) {
    const res = await fetch("http://localhost:3000/api/v1/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include"
    })
    return res
}


export async function authUser() {
    const res = await fetch("http://localhost:3000/api/v1/auth/me", {
        method: "GET",
        credentials: "include"
    })
      
    return res
}

export async function createUserTask(formData) {
    const res = await fetch("http://localhost:3000/api/v1/tasks/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
    })
    return res
}

export async function getAllUserTask() {
    const res = await fetch("http://localhost:3000/api/v1/tasks/", {
        method: "GET",
        credentials: "include",
    })
    return res
}

export async function toggleUserTaskStatus(id) {
    const res = await fetch("http://localhost:3000/api/v1/tasks/", {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId: id }),
    })
    const data = await res.json()
    return data
}

export async function getDashBoardTasks() {
    const res = await fetch("http://localhost:3000/api/v1/dashboard/", {
        method: "GET",
        credentials: "include"
    })
    
    return res
}