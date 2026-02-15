const timer = () => {
  const countdowns = document.querySelectorAll(".countdown");

  const formatTime = (num) => (num < 10 ? `0${num}` : num);

  countdowns.forEach((countdown) => {
    const daysAmount = +countdown.dataset.days;

    const daysBlock = countdown.querySelector(".count_1 span");
    const hoursBlock = countdown.querySelector(".count_2 span");
    const minutesBlock = countdown.querySelector(".count_3 span");
    const secondsBlock = countdown.querySelector(".count_4 span");

    const deadline = new Date(Date.now() + daysAmount * 24 * 60 * 60 * 1000);

    const getTimeRemaining = () => {
      let dateStop = deadline.getTime();
      let dateNow = new Date().getTime();
      let timeRemaining = (dateStop - dateNow) / 1000;

      if (timeRemaining <= 0) {
        return { timeRemaining: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      let days = Math.floor(timeRemaining / 60 / 60 / 24);
      let hours = Math.floor((timeRemaining / 60 / 60) % 24);
      let minutes = Math.floor((timeRemaining / 60) % 60);
      let seconds = Math.floor(timeRemaining % 60);

      return { timeRemaining, days, hours, minutes, seconds };
    };

    const updateClock = () => {
      let getTime = getTimeRemaining();

      daysBlock.textContent = formatTime(getTime.days);
      hoursBlock.textContent = formatTime(getTime.hours);
      minutesBlock.textContent = formatTime(getTime.minutes);
      secondsBlock.textContent = formatTime(getTime.seconds);

      if (getTime.timeRemaining <= 0) {
        clearInterval(intervalId);
      }
    };

    const intervalId = setInterval(updateClock, 1000);
    updateClock();
  });
};

export default timer;
