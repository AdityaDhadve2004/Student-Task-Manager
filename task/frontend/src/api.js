export default async function createUser(formData) {
    const res = await fetch("http://localhost:3000/api/v1/users/register", {
        method: "POST",
        body: formData,
        credentials: "include" 
    })
    return res  
}
