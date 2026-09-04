import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth/AuthProvider";
import axios from "axios";
import { IMAGES_ENDPOINT } from "./constants";
import { GREEN_BUTTON_STYLE, RED_BUTTON_STYLE } from "../adminPage/style";
import DialogPrompt from "../../components/dialog/DialogPrompt";
import InputImage from "../../components/inputImage/InputImage";
import ImageViewer from "../../components/imageViewer/ImageViewer";
import DigitalClock from "../../components/clocl/DigitalClock";

const Dashboard = () => {
    const [imageList, setImageList] = useState([]);
    const [currentStatus, setCurrentStatus] = useState("")
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
    const { token, userData } = useAuth();

    const fetchImages = () => {
        const date = new Date();
        // Day 1 00:00 of this month
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 0).toISOString();
        // Day 1 00:00 of next month
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1).toISOString(); 

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
                    localDate: new Date(el.timestamp).toDateString(),
                    localTime: new Date(el.timestamp).toLocaleTimeString().replaceAll('.',':')
                }
            });
            setCurrentStatus(processedImageList[0].status)
            setImageList(processedImageList);
        }).catch((err) => {
            console.log(err);
        });
    }

    const uploadImage = () => {
        const formData = new FormData();
        formData.append('file', selectedImage);

        axios.post(IMAGES_ENDPOINT, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
        }).then((response) => {
            fetchImages();
        }).catch((err) => {
            console.log(err);
        });
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

    const handleDateSelector = (event) => {
        console.log(event.target.value);
        setSelectedDate(event.target.value);
    }

    const handleUpload = () => {
        setUploadDialogOpen(true);
    }

    const handleSubmitUpload = () => {
        uploadImage();
        setSelectedImage(null);
        setUploadDialogOpen(false);
    }

    const handleFileSelect = (event) => {
        if (event.target.files[0]) {
            console.log(event.target.files);
            setSelectedImage(event.target.files[0]);
        }
    }

    return (
        <div className="m-4 p-6 min-h-[90%] min-w-[60%] rounded-lg bg-white shadow-sm space-y-4">
            <h1>Dashboard</h1>
            <div className="flex space-x-1">
                <button 
                    onClick={handleUpload} 
                    className={`${currentStatus === 'in' ? RED_BUTTON_STYLE : GREEN_BUTTON_STYLE } flex-none`}
                >
                    {currentStatus === 'in' ? "Clock Out" : "Clock In"}
                </button>
                <div className="border border-stone-400 rounded-md flex-grow">
                    <DigitalClock />
                </div>
            </div>
            <ImageViewer imageList={imageList} />
            { uploadDialogOpen && (
                <DialogPrompt>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Upload New Image to {currentStatus === 'in' ? "Clock Out" : "Clock In"}</h2>
                    </div>

                    <div>
                        {selectedImage && <img 
                            alt="Not Found"
                            width={"250px"}
                            src={URL.createObjectURL(selectedImage)}
                        />
                        }
                        <InputImage onChange={handleFileSelect} />
                        {selectedImage && 
                            <p>{Math.round(selectedImage.size / 1024)} KB</p>
                        }
                    </div>                
                    <div className="flex flex-row-reverse space-x-2">
                        <button onClick={() => setUploadDialogOpen(false)} className={RED_BUTTON_STYLE}>
                            Cancel
                        </button>
                        <button 
                            onClick={handleSubmitUpload} 
                            className={GREEN_BUTTON_STYLE}
                            disabled={selectedImage ? false : true}
                        >
                            Upload
                        </button>
                    </div>
                </DialogPrompt>                    
            )}
        </div>
    );
};

export default Dashboard;