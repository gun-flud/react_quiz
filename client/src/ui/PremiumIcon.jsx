import React, { useState, useRef, useEffect } from "react";
import { timerGenerator } from "../logic/timerGenerator";

import closeIcon from "../assets/close-icon.svg";

function PremiumIcon({ endDate = new Date("2026-02-19T01:34:19Z").getTime() }) {
    const TimerRef = useRef(timerGenerator(endDate));
    const [counter, setCounter] = useState(() => {
        return TimerRef.current.next().value;
    });
    const [isOpen, setIsOpen] = useState(() => endDate > Date.now() && counter);
    

    useEffect(() => {
        if (!isOpen) return;

        const timeIterator = setInterval(() => {
            const { value, done } = TimerRef.current.next();

            if (done || !value) {
                setIsOpen(false);
                clearInterval(timeIterator);
            }

            setCounter(value);
            console.log(value);
        }, 1000);

        if (timeIterator) {
            return () => clearInterval(timeIterator);
        }
    }, [isOpen]);

    if (!isOpen) return;

    return (
        <div className="premium-icon">
            <div className="flex items-center gap-6">
                <span className="text-2xl">
                    {counter?.days}:{counter?.hours}:{counter?.minutes}:
                    {counter?.seconds}
                </span>
                <button className="button">Upgrade</button>
            </div>
            <img
                src={closeIcon}
                alt="close"
                className="mr-4"
                onClick={() => setIsOpen(false)}
            ></img>
        </div>
    );
}

export default PremiumIcon;
