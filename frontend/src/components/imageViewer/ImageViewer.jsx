const ImageViewer = ({ imageList, imageWidth=300, imageHeight=300 }) => {
    return (
        <div id="imageListView" className="space-y-2 grid sm:grid-cols-1">
            {
                imageList.map((image) => 
                    <div className="grid grid-cols-2">
                        <div display="flex" className="flex flex-col justify-self-end w-[300px] h-[300px] border border-stone-400 bg-white flex-none">
                            <img src={image.url} id={image.image_id} class="aspect-square" />
                        </div>
                        <div className="flex flex-col justify-items-start w-[300px] h-[300px] text-sm">
                            <div className="grid grid-cols-2">
                                <div className="m-1 p-1 border border-stone-400 bg-white rounded-full flex-grow min-w-[120px]">{image.localDate}</div>
                                <div className="m-1 p-1 border border-stone-400 bg-white rounded-full flex-grow min-w-[120px]">{image.localTime}</div>
                            </div>
                            <div className={`justify-self-start m-1 p-1 border ${image.status === "in" ? 'border-green-600 bg-green-600' : 'border-red-600 bg-red-600'} text-white rounded-full flex-none min-w-[120px]`}>{image.status.toUpperCase()}</div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default ImageViewer;