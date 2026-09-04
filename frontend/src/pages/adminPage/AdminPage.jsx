import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth/AuthProvider";
import axios from "axios";
import DialogPrompt from "../../components/dialog/DialogPrompt";
import InputField from "../../components/inputField/InputField";
import InputSelect from "../../components/inputSelect/InputSelect";
import { BUTTON_STYLE, GREEN_BUTTON_STYLE, RED_BUTTON_STYLE } from "./style";
import { EMPTY_USER, roleOptions, USERS_ENDPOINT } from "./constants";
import { IMAGES_ENDPOINT } from "../userDashboard/constants";
import ImageViewer from "../../components/imageViewer/ImageViewer";

const AdminPage = () => {
    const [userList, setUserList] = useState([]);
    const [userImageList, setUserImageList] = useState([]);
    const [selectedUser, setSelectedUser] = useState(EMPTY_USER)
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
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

    const fetchUserImages = (user_id) => {
        const date = new Date();
        // Day 1 00:00 of this month
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 0).toISOString();
        // Day 1 00:00 of next month
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1).toISOString(); 
        axios.get(IMAGES_ENDPOINT + `/${user_id}`, {
            params: {
                start: firstDay,
                end: lastDay
            },
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            const processedImageList = response.data.map((el) => {
                return {
                    ...el,
                    localDate: new Date(el.timestamp).toDateString(),
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

    const handleView = (user) => {
        setSelectedUser(user);
        fetchUserImages(user.user_id);
        setViewDialogOpen(true);
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
            <div className="flex flex-row-reverse space-x-1">
                <button onClick={handleAddNewUser} className={`${GREEN_BUTTON_STYLE} flex-none`}>Add New User</button>
            </div>
            <div className="center grid grid-cols-1 md:grid-cols-2">
                {
                    userList.map((user) => 
                        <div className="m-4 p-4 space-x-1 space-y-1 grid grid-cols-2 grid-rows-5 border border-stone-400 bg-white rounded-xl">
                            <div className="border border-stone-400 bg-white flex-grow col-span-1 row-span-4">
                                <img src={user.profileImageUrl} alt="Profile Picture" class="aspect-square" />
                            </div>
                            <div className="m-1 p-1 text-sm text-left space-x-2 col-span-1 row-span-4 flex flex-row">
                                <div className="flex flex-col flex-none">
                                    <div>User ID</div>
                                    <div>Username</div>
                                    <div>Password</div>
                                    <div>Role</div>
                                </div>
                                <div className="flex flex-col">
                                    <div>: {user.user_id}</div>
                                    <div>: {user.username}</div>
                                    <div>: {user.password}</div>
                                    <div>: {user.role.toUpperCase()}</div>
                                </div>
                            </div>

                            <div className="col-span-2 grid grid-cols-3 flex-none">
                                <button className="border border-blue-400 bg-blue-400 text-white rounded-s-xl flex-none" onClick={() => handleView(user)}>View</button>
                                <button className="border border-green-400 bg-green-400 text-white flex-none" onClick={() => handleEdit(user)}>Edit</button>
                                <button className={`border ${user.role === "admin" ? "border-stone-400 bg-stone-400" : "border-red-400 bg-red-400"} text-white rounded-e-xl flex-none`} disabled={user.role === "admin"} onClick={() => handleDelete(user)}>Delete</button>
                            </div>
                        </div>
                    )
                }
            </div>
            { createDialogOpen && (
                <DialogPrompt>
                    <h2 className="text-xl font-bold text-slate-800">Create New User</h2>
                    <div className="space-y-2">
                        <InputField fieldName="username" isRequired value={selectedUser.username} onChange={e => handleChange(e)} label="Username" />
                        <InputField fieldName="password" isRequired value={selectedUser.password} onChange={e => handleChange(e)} label="Password" />
                        <InputSelect fieldName="role" isDisabled value={selectedUser.role} onChange={e => handleChange(e)} label="Role" options={roleOptions} />
                    </div>
                    <div className="px-4 py-4 flex flex-row-reverse space-x-2">
                        <button onClick={handleSumbitCreate} className={GREEN_BUTTON_STYLE} >
                            Create
                        </button>
                        <button onClick={() => setCreateDialogOpen(false)} className={BUTTON_STYLE} >
                            Cancel
                        </button>
                    </div>
                </DialogPrompt>                    
            )}
            { updateDialogOpen && (
                <DialogPrompt>
                    <h2 className="text-xl font-bold text-slate-800">Edit User Data</h2>
                    <div className="space-y-2">
                        <InputField fieldName="user_id" isDisabled value={selectedUser.user_id} onChange={e => handleChange(e)} label="User ID" />
                        <InputField fieldName="username" isRequired value={selectedUser.username} onChange={e => handleChange(e)} label="Username" />
                        <InputField fieldName="password" isRequired value={selectedUser.password} onChange={e => handleChange(e)} label="Password" />
                        <InputSelect fieldName="role" isDisabled value={selectedUser.role} onChange={e => handleChange(e)} label="Role" options={roleOptions} />
                    </div>
                    <div className="px-4 py-4 flex flex-row-reverse space-x-2">
                        <button onClick={handleSubmitUpdate} className={GREEN_BUTTON_STYLE}>
                            Update
                        </button>
                        <button onClick={() => setUpdateDialogOpen(false)} className={BUTTON_STYLE}>
                            Cancel
                        </button>
                    </div>
                </DialogPrompt>                    
            )}
            { deleteDialogOpen && (
                <DialogPrompt>
                    <h2 className="text-xl font-bold text-red-800">Delete {selectedUser.username}?</h2>
                    <p>Delete {selectedUser.username} Permanently?</p>
                    <div className="px-4 py-4 flex flex-row-reverse space-x-2">
                        <button onClick={handleSubmitDelete} className={RED_BUTTON_STYLE} >
                            Delete
                        </button>
                        <button onClick={() => setDeleteDialogOpen(false)} className={BUTTON_STYLE} >
                            Cancel
                        </button>
                    </div>
                </DialogPrompt>                    
            )}
            { viewDialogOpen && (
                <DialogPrompt>
                    <h2 className="text-xl font-bold text-red-800">Viewing {selectedUser.username}'s Images</h2>
                    <ImageViewer imageList={userImageList} />
                    <div className="px-4 py-4 flex flex-row-reverse space-x-2">
                        <button onClick={() => setViewDialogOpen(false)} className={BUTTON_STYLE} >
                            Close
                        </button>
                    </div>
                </DialogPrompt>                    
            )}
        </div>
    );
};

export default AdminPage;