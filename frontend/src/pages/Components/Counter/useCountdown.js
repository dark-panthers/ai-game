import { useEffect, useState } from "react";

const useCountdown = (targetDate, callback) => {
  const [countDown, setCountDown] = useState(
    new Date(targetDate).getTime() - new Date().getTime()
  );

  useEffect(() => {
    setCountDown(new Date(targetDate).getTime() - new Date().getTime());
  }, [targetDate]);

  useEffect(() => {
    if (countDown <= 0) {
      callback();
      return;
    }

    const interval = setInterval(() => {
      setCountDown(new Date(targetDate).getTime() - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDown]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  // calculate time left
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [minutes, seconds];
};

export { useCountdown };
