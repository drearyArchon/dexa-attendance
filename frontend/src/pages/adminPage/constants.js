export const EMPTY_USER = {
    user_id: "",
    username: "",
    password: "",
    role: "user"
}

export const roleOptions = [
    {
        value: "admin",
        label: "Admin"
    },
    {
        value: "user",
        label: "User"
    }
]

export const USERS_ENDPOINT = "http://localhost:3100/users";
