import { useState, useEffect } from 'react';

const CurrentDate = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // +1 because getMonth() returns 0-11
  const year = currentDate.getFullYear();

  return (
    <div>
      <p>Today is {day}-{month}-{year}</p>
    </div>
  );
};

export default CurrentDate;