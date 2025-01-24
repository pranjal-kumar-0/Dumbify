import React, { useState, useEffect } from 'react';
import styles from "./Timer.module.css";

function Timer() {
    const [time, setTime] = useState(10 * 1000); // Set the initial time in milliseconds (e.g., 10 seconds)
    const [isRunning, setIsRunning] = useState(true);

    // Timer countdown logic
    useEffect(() => {
        let intervalId;
        if (isRunning) {
            intervalId = setInterval(() => {
                setTime(prevTime => prevTime - 1000); // Decrement by 1000ms (1 second) every tick
            }, 1000);
        }

        return () => clearInterval(intervalId); // Cleanup interval on component unmount or when time changes
    }, [isRunning]);

    // Format time in mm:ss, showing
    const formatTime = () => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        return `${minutes}:${padZero(Math.abs(seconds))}`;
    };

    const padZero = (number) => {
        return (number < 10 ? '0' : '') + number;
    };

    // Dynamically set the class for the timer based on the time value
    const timerClass = time < 0 ? styles.negative : styles.timer;

    return (
        <div className={timerClass}>
            <span>{formatTime()}</span>
        </div>
    );
}

export default Timer;
