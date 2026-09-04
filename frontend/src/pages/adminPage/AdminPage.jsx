import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth/AuthProvider";
import axios from "axios";
import DialogPrompt from "../../components/dialog/DialogPrompt";
import InputField from "../../components/inputField/InputField";
import InputSelect from "../../components/inputSelect/InputSelect";
import { BUTTON_STYLE, GREEN_BUTTON_STYLE, RED_BUTTON_STYLE } from "./style";
import { EMPTY_USER, roleOptions, USERS_ENDPOINT } from "./constants";
import { IMAGES_ENDPOINT } from "../userDashboard/constants";

const AdminPage = () => {
    const [userList, setUserList] = useState([]);
    const [userImageList, setUserImageList] = useState([]);
    const [usernameList, setUsernameList] = useState([]);
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
            setUsernameList(response.data.map((user) => user.username));
            setSelectedUser(response.data[0]);
        }).catch((err) => {
            console.log(err);
        });
    };

    const fetchUserImages = () => {
        axios.get(IMAGES_ENDPOINT + `/${selectedUser.user_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            const processedImageList = response.data.map((el) => {
                return {
                    ...el,
                    localDate: new Date(el.timestamp).toLocaleDateString(),
                    localTime: new Date(el.timestamp).toLocaleTimeString()
                }
            });
            setUserImageList(processedImageList);
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

    useEffect(() => {
        try {
            fetchUserImages();
        } catch (error) {
            console.log(error);
        }
    }, [selectedUser])

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
        <div className="m-4 p-6 h-4/5 min-w-[60%] rounded-lg bg-white shadow-sm space-y-1">
            <h1>Administration</h1>
            <div className="flex space-x-1">
                <button onClick={handleAddNewUser} className={`${GREEN_BUTTON_STYLE} flex-none`}>Add New User</button>
                <InputSelect 
                    fieldName="username" 
                    isRequired
                    style="flex-grow"
                    value={selectedUser.username} 
                    onChange={e => handleChange(e)} 
                    options={usernameList}
                />
            </div>
            <div align="center">
                {/* grid 4 columns, actions is split into two colums with Edit and Delete. Use rounded borders on those to make them a single pill  */}
                <div className="grid grid-cols-2 grid-rows-3">
                    <div className="grid grid-cols-4">
                        <div>{selectedUser.user_id}</div>
                        <div>{selectedUser.username}</div>
                        <div>{selectedUser.password}</div>
                        <div>{selectedUser.role}</div>
                    </div>

                    <div>
                        {/* Attendance Logs */}
                        { userImageList.map((image) => 
                            <div className="rounded-full border border-stone-800 text-blue-600">
                                {/* Linked to Images */}
                                {image.localDate} {image.localTime}
                            </div>
                        )}
                    </div>


                    <div className="grid grid-cols-2 flex-none">
                        <button className="w-16 h-8 border border-green-400 bg-green-400 text-white rounded-s-xl flex-none" onClick={() => handleEdit(selectedUser)}>Edit</button>
                        <button className="w-16 h-8 border border-red-400 bg-red-400 text-white rounded-e-xl flex-none" onClick={() => handleDelete(selectedUser)}>Delete</button>
                    </div>
                </div>
                {/* <table>
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
                            <td>
                                <div classname="border border-stone-200 rounded-full">
                                    <button onClick={() => handleEdit(user)}>Edit</button>
                                </div>
                            </td>
                            <td><button onClick={() => handleDelete(user)}>Delete</button></td>
                        </tr>
                    )}
                    </tbody>
                </table> */}
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