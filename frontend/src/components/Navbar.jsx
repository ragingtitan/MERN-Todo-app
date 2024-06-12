import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [greeting, setGreeting] = useState("");
  const [date, setdate] = useState("today");
  
  const updateTime = () => {
    const date = new Date();
    const hour = date.getHours();
    setCurrentTime(date.toLocaleTimeString());
    setCurrentDay(date.getDate());
    setCurrentMonth(date.toLocaleString("default", { month: "long" }));
    if (hour < 12) {
      setGreeting("Good Morning!");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good Afternoon!");
    } else {
      setGreeting("Good Night!");
      setdate("tomorrow");
    }
  };

  useEffect(() => {
    updateTime();
    
    // Update time every second
    const interval = setInterval(updateTime, 1000);
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="header">
        <div className="greeting mt-5 text-gray-500 flex justify-center items-center">
          <div className="flex gap-10 items-center">
            <div className="flex flex-col justify-center w-fit">
              <p className="text-white text-center text-2xl lg:text-3xl font-semibold">
                {currentMonth}
              </p>
              <p className="text-white text-center text-2xl lg:text-3xl font-semibold">
                {currentDay}
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl lg:text-5xl text-gray-300 font-bold">{greeting}</p>
              <p className="text-lg md:text-xl lg:text-2xl italic">What's your plan for {date}?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
