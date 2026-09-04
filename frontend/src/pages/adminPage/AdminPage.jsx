import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth/AuthProvider";
import axios from "axios";
import DialogPrompt from "../../components/dialog/DialogPrompt";
import InputField from "../../components/inputField/InputField";
import InputSelect from "../../components/inputSelect/InputSelect";
import { BUTTON_STYLE, GREEN_BUTTON_STYLE, RED_BUTTON_STYLE } from "./style";
import { EMPTY_USER, roleOptions, USERS_ENDPOINT } from "./constants";

const AdminPage = () => {
    const [userList, setUserList] = useState([]);
    const [selectedUser, setSelectedUser] = useState(EMPTY_USER)
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const { token } = useAuth();

    const fetchUsers = () => {
        axios.get(USERS_ENDPOINT, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            setUserList(response.data);
        }).catch((err) => {
            console.log(err);
        });
    };

    const createUser = () => {
        axios.post(USERS_ENDPOINT, {
            username: selectedUser.username,
            password: selectedUser.password
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            fetchUsers();
        }).catch((err) => {
            console.log(err);
        });
    }

    const updateUser = () => {
        axios.put(USERS_ENDPOINT + "/" + selectedUser.user_id, {
            username: selectedUser.username,
            password: selectedUser.password
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            fetchUsers();
        }).catch((err) => {
            console.log(err);
        });
    }

    const deleteUser = () => {
        axios.delete(USERS_ENDPOINT + "/" + selectedUser.user_id, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            fetchUsers();
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        try {
            fetchUsers();
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleChange = (event) => {
        setSelectedUser((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value
        }));
    }

    const handleAddNewUser = () => {
        setSelectedUser(EMPTY_USER);
        setCreateDialogOpen(true);
    }

    const handleSumbitCreate = () => {
        createUser();
        setCreateDialogOpen(false);
    }

    const handleEdit = (user) => {
        setSelectedUser(user);
        setUpdateDialogOpen(true);
    }

    const handleSubmitUpdate = () => {
        updateUser();
        setUpdateDialogOpen(false);
    }

    const handleDelete = (user) => {
        setSelectedUser(user);
        setDeleteDialogOpen(true);
    }

    const handleSubmitDelete = () => {
        deleteUser();
        setDeleteDialogOpen(false);
    }
    
    return (
        <div>
            <h1>Administration</h1>
            <button onClick={handleAddNewUser}>Add New User</button>
            <div align="center">
                <table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Role</th>
                            <th colspam="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    { userList.map((user) => 
                        <tr key={user.user_id}>
                            <td>{user.user_id}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.role}</td>
                            <td><button onClick={() => handleEdit(user)}>Edit</button></td>
                            <td><button onClick={() => handleDelete(user)}>Delete</button></td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            { createDialogOpen && (
                <DialogPrompt>
                    <h2 className="text-xl font-bold text-slate-800">Create New User</h2>
                    <div className="space-y-2">
                        <InputField fieldName="username" isRequired value={selectedUser.username} onChange={e => handleChange(e)} label="Username" />
                        <InputField fieldName="password" isRequired value={selectedUser.password} onChange={e => handleChange(e)} label="Password" />
                        <InputSelect fieldName="role" isDisabled value={selectedUser.role} onChange={e => handleChange(e)} label="Role" options={roleOptions} />
                    </div>
                    <div classname="px-4 py-4 flex flex-row-reverse space-x-2">
                        <button onClick={() => setCreateDialogOpen(false)} className={BUTTON_STYLE} >
                            Cancel
                        </button>
                        <button onClick={handleSumbitCreate} className={GREEN_BUTTON_STYLE} >
                            Create
                        </button>
                    </div>
                </DialogPrompt>                    
            )}
            { updateDialogOpen && (
                <DialogPrompt>
                    <h2 className="text-xl font-bold text-slate-800">Update {selectedUser.username}</h2>
                    <div className="space-y-2">
                        <InputField fieldName="user_id" isDisabled value={selectedUser.user_id} onChange={e => handleChange(e)} label="User ID" />
                        <InputField fieldName="username" isRequired value={selectedUser.username} onChange={e => handleChange(e)} label="Username" />
                        <InputField fieldName="password" isRequired value={selectedUser.password} onChange={e => handleChange(e)} label="Password" />
                        <InputSelect fieldName="role" isDisabled value={selectedUser.role} onChange={e => handleChange(e)} label="Role" options={roleOptions} />
                    </div>
                    <div classname="px-4 py-4 flex flex-row-reverse space-x-2">
                        <button onClick={() => setUpdateDialogOpen(false)} className={BUTTON_STYLE}>
                            Cancel
                        </button>
                        <button onClick={handleSubmitUpdate} className={GREEN_BUTTON_STYLE}>
                            Update
                        </button>
                    </div>
                </DialogPrompt>                    
            )}
            { deleteDialogOpen && (
                <DialogPrompt>
                    <h2 className="text-xl font-bold text-red-800">Delete {selectedUser.username}?</h2>
                    <p>Delete {selectedUser.username} Permanently?</p>
                    <div classname="px-4 py-4 flex flex-row-reverse space-x-2">
                        <button onClick={() => setDeleteDialogOpen(false)} className={BUTTON_STYLE} >
                            Cancel
                        </button>
                        <button onClick={handleSubmitDelete} className={RED_BUTTON_STYLE} >
                            Delete
                        </button>
                    </div>
                </DialogPrompt>                    
            )}
        </div>
    );
};

export default AdminPage;