import React, { useState, useEffect } from "react";
import "./CountdownTimer.css";

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    let deathTime = localStorage.getItem("deathTime");

    // إذا لم يوجد وقت محفوظ → أنشئ وقت عشوائي
    if (!deathTime) {
      const now = new Date().getTime();

      // وقت عشوائي بين 1 دقيقة و 10 سنوات
      const randomTime =
        Math.floor(
          Math.random() *
            (10 * 365 * 24 * 60 * 60 * 1000 - 60 * 1000)
        ) + 60 * 1000;

      deathTime = now + randomTime;
      localStorage.setItem("deathTime", deathTime);
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = deathTime - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft("EXPIRED");
        return;
      }

      const years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365));
      const days = Math.floor(
        (distance % (1000 * 60 * 60 * 24 * 365)) /
          (1000 * 60 * 60 * 24)
      );
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
          (1000 * 60)
      );
      const seconds = Math.floor(
        (distance % (1000 * 60)) /
          1000
      );

      setTimeLeft({ years, days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return null;

  return (
    <div className="page">
      <div className="phone">
        <div className="screen">
          {timeLeft === "EXPIRED" ? (
            <h1 className="expired">TIME'S UP</h1>
          ) : (
            <>
              <div className="header">
                <p className="subtitle">TIME REMAINING</p>
                <h2 className="main-title">UNTIL YOUR DEATH</h2>
              </div>

              <div className="timer">
                <span>{timeLeft.years}Y</span>
                <span>{timeLeft.days}D</span>
                <span>{timeLeft.hours}H</span>
                <span>{timeLeft.minutes}M</span>
                <span>{timeLeft.seconds}S</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CountdownTimer;