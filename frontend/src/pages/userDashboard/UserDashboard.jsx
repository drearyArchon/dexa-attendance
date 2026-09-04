import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth/AuthProvider";
import axios from "axios";
import { IMAGES_ENDPOINT } from "./constants";
import { GREEN_BUTTON_STYLE, RED_BUTTON_STYLE } from "../adminPage/style";
import DialogPrompt from "../../components/dialog/DialogPrompt";
import InputDate from "../../components/inputDate/InputDate";

const Dashboard = () => {
    const [imageList, setImageList] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
    const { token, userData } = useAuth();

    const fetchImages = () => {
        let date = new Date();
        // Day 1 00:00 of this month
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 0).toISOString();
        // Day 1 00:00 of next month
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1).toISOString(); 

        axios.get(IMAGES_ENDPOINT, {
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
                    localDate: new Date(el.timestamp).toLocaleDateString(),
                    localTime: new Date(el.timestamp).toLocaleTimeString()
                }
            });
            console.log(processedImageList);
            setImageList(processedImageList);
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
        <div className="m-4 p-6 min-h-[90%] min-w-[60%] rounded-lg bg-white shadow-sm space-y-4">
            <h1 classname="">Dashboard</h1>
            <div className="flex space-x-1">
                <button onClick={handleUpload} className={`${GREEN_BUTTON_STYLE} flex-none`}>Upload Image</button>
                <InputDate fieldName="dateStart" value={selectedDate} onChange={handleDateSelector} style="flex-grow" />
                <InputDate fieldName="dateEnd" value={selectedDate} onChange={handleDateSelector} style="flex-grow" />
            </div>
            <div id="imageListView" className="space-y-2 grid sm:grid-cols-1">
                {
                    imageList.map((image) => 
                        <div className="grid grid-cols-4 grid-rows-4 space-x-1">
                            <div className="border border-stone-400 bg-white flex-grow row-span-4 col-span-3">{image.image_id}</div>
                            <div className="m-1 p-1 border border-stone-400 bg-white rounded-full flex-none min-w-[120px]">{image.localDate}</div>
                            <div className="m-1 p-1 border border-stone-400 bg-white rounded-full flex-none min-w-[120px]">{image.localTime}</div>
                            <div className="m-1 p-1 border border-stone-400 bg-white rounded-full flex-none min-w-[120px]">IN</div>
                        </div>
                    )
                }
            </div>
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