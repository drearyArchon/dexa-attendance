import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth/AuthProvider";
import axios from "axios";
import { IMAGES_ENDPOINT } from "./constants";
import { BUTTON_STYLE, GREEN_BUTTON_STYLE, RED_BUTTON_STYLE } from "../adminPage/style";
import DialogPrompt from "../../components/dialog/DialogPrompt";
import InputDate from "../../components/inputDate/InputDate";

const Dashboard = () => {
    const [imageList, setImageList] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
    const { token, userData } = useAuth();

    const fetchImages = () => {
        axios.get(IMAGES_ENDPOINT, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            setImageList(response.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    const uploadImage = () => {
        axios.post(IMAGES_ENDPOINT, {
            user: userData
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            fetchImages();
        }).catch((err) => {
            console.log(err);
        });
    }

    const handleDateSelector = (event) => {
        console.log(event.target.value);
        setSelectedDate(event.target.value);
    }

    const handleUpload = () => {
        setUploadDialogOpen(true);
    }

    const handleSubmitUpload = () => {
        uploadImage();
        setUploadDialogOpen(false);
    }

    useEffect(() => {
        try {
            fetchImages();
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        console.log(selectedDate);
    }, [selectedDate])

    return (
        <div className="m-4 p-4 w-4/5 min-h-[90%] min-w-[60%] max-w-[90%] rounded-lg bg-[#cf2e2e] shadow-sm">
            <h1>Dashboard</h1>
            <button onClick={handleUpload} className={GREEN_BUTTON_STYLE}>Upload Image</button>
            <InputDate fieldName="date" value={selectedDate} onChange={handleDateSelector} />
            {
                imageList.map((image) => <p>TEST {image.image_id} {image.timestamp}</p>)
            }
            { uploadDialogOpen && (
                <DialogPrompt>
                    <h2 className="text-xl font-bold text-slate-800">Upload New Image</h2>
                    <input id="imageUpload" type="image" />
                    <div classname="px-4 py-4 flex flex-row-reverse space-x-2">
                        <button onClick={() => setUploadDialogOpen(false)} className={RED_BUTTON_STYLE}>
                            Cancel
                        </button>
                        <button onClick={handleSubmitUpload} className={GREEN_BUTTON_STYLE}>
                            Upload
                        </button>
                    </div>
                </DialogPrompt>                    
            )}
        </div>
    );
};

export default Dashboard;