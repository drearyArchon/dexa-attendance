import { useEffect, useState } from "react";

const DigitalClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timeInterval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timeInterval);
    }, [])

    return (
        <div className="bg-stone-400 inline-flex justify-center rounded-md text-sm font-semibold text-white flex-grow">
            <div className="grid grid-cols-2">
                <div className="px-3 py-1 justify-self-end">
                    <span className="align-middle">{time.toDateString()}</span>
                </div>
                <div className="px-3 py-1 justify-self-start">
                    <span className="align-middle">{time.getHours()}:</span>
                    <span className="align-middle">{time.getMinutes()}:</span>
                    <span className="align-middle">{time.getSeconds()}</span>
                </div>
            </div>
        </div>
  );
}
export default DigitalClock;