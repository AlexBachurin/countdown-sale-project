window.addEventListener('DOMContentLoaded', () => {

    const deadline = '2021-05-09 11:30';

    console.log(new Date(deadline))

    //get time difference between deadline and current time
    function getTimeDiff(time) {
        const timeLeft = Date.parse(time) - Date.parse(new Date());

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
            hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24), //get hours with floor of 24 hours ,we need remainder, thats why we get total hours and from them we get remainder
            //ie if it was 150 hours, then after 150 % 24 we get remainder  = 6 hours, so we get only hours and skip days
            minutes = Math.floor((timeLeft / 1000 / 60) % 60),
            seconds = Math.floor((timeLeft / 1000) % 60);

        //return as obj
        return {
            total: timeLeft,
            days,
            hours,
            minutes,
            seconds
        }
    }


    // **** setup timer ****

    function setTimer(endTime) {
        //get elems from page
        const days = document.querySelector('.sale__deadline-days'),
            hours = document.querySelector('.sale__deadline-hours'),
            minutes = document.querySelector('.sale__deadline-minutes'),
            seconds = document.querySelector('.sale__deadline-seconds');
        //prevent timer from jumping on page reload
        updateTimer();

        //update timer everey second, we will use setInterval, this function to get time diff and insert it into page
        //later we put in setInterval as callback
        function updateTimer() {
            const time = getTimeDiff(endTime);

            days.textContent = `${addZero(time.days)}`;
            hours.textContent = `${addZero(time.hours)}`;
            minutes.textContent = `${addZero(time.minutes)}`;
            seconds.textContent = `${addZero(time.seconds)}`;
        }

        //use setInterval to update timer every second

        const timerId = setInterval(updateTimer, 1000);
    }

    //init timer

    setTimer(deadline);

    // **** add zeros ****
    //function helper to add zeros to numbers which are < 10
    function addZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        }
        return num;
    }
})