import React, { useState, useEffect } from "react";
import "./BackwardsClock.css";

const BackwardsClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      // Create a date object that's going backwards
      const backwardsTime = new Date(now.getTime());
      backwardsTime.setHours(23 - now.getHours());
      backwardsTime.setMinutes(59 - now.getMinutes());
      backwardsTime.setSeconds(59 - now.getSeconds());
      setTime(backwardsTime);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, "0");

  const hours = formatNumber(time.getHours());
  const minutes = formatNumber(time.getMinutes());
  const seconds = formatNumber(time.getSeconds());
  const date = time.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="backwards-clock">
      <div className="date">{date}</div>
      <div className="time">
        <span className="hours">{hours}</span>
        <span className="colon">:</span>
        <span className="minutes">{minutes}</span>
        <span className="colon">:</span>
        <span className="seconds">{seconds}</span>
      </div>
    </div>
  );
};

export default BackwardsClock;
