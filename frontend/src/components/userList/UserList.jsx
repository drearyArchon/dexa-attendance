const { default: axios } = require("axios");
const { useEffect, useState } = require("react");
const { USER_LIST_URL, DELETE_USER_URL } = require("./UserListConsts");

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(USER_LIST_URL)
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error))
    }, []);

    const deleteUser = (user_id) => {
        axios.delete(DELETE_USER_URL(user_id))
            .then(() => setUsers(users.filter(user => user.user_id !== user_id)))
            .catch(error => console.error('Error deleting user:', error));
    };

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map(user => (
                    <li key={user.user_id}>
                        <h3>{user.username}</h3>
                        <button onClick={() => deleteUser(user.user_id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;