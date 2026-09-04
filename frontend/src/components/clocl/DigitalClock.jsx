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
        <>
            <div className="grid grid-cols-2">
                <p className="px-3 py-1 justify-self-end">{time.toDateString()}</p>
                <div className="px-3 py-1 justify-self-start">
                    <span className="clock">{time.getHours()}:</span>
                    <span className="clock">{time.getMinutes()}:</span>
                    <span className="secs">{time.getSeconds()}</span>
                </div>
            </div>
        </>
  );
}
export default DigitalClock;