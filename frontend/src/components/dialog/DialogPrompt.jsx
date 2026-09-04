const DialogPrompt = ({ children }) => {
    return (
        <div className="fixed inset-0 grid h-screen w-screen place-items-center bg-black-600/50 backdrop-blur-sm">
            <div className="relative overflow-auto space-y-4 m-4 p-4 w-2/5 min-w-[30%] max-w-[60%] max-h-[100%] rounded-lg bg-white shadow-sm border border-stone-200">
                {children}
            </div>
        </div>
        
    );
};

export default DialogPrompt;