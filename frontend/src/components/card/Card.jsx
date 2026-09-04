const Card = ({ header, footer, children }) => {
    return (
        <div className="fixed inset-0 grid h-screen w-screen place-items-center bg-red-600/50 backdrop-blur-sm">
            <div className="relative m-4 p-4 w-2/5 min-w-[30%] max-w-[60%] rounded-lg bg-white shadow-sm">
                {header}
                {children}
                {footer}
            </div>
        </div>
        
    );
};

export default Card;