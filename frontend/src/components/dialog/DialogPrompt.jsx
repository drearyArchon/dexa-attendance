const DialogPrompt = ({ children }) => {
    return (
        <div className="fixed inset-0 grid h-screen w-screen place-items-center bg-black-600/50 backdrop-blur-sm">
            <div className="relative overflow-auto space-y-4 m-4 p-4 sm w-9/10 md:w-4/5 lg:w-2/5 min-w-[30%] max-h-[90%] rounded-lg bg-white shadow-sm border border-stone-200">
                {children}
            </div>
        </div>
        
    );
};

export default DialogPrompt;