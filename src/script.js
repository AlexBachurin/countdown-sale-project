window.addEventListener('DOMContentLoaded', () => {

    let deadline = '2021-05-09  23:30';
    let timerId;

    showDeadline(deadline);

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
            
            //do something then timer expires
            if (time.total < 0) {
                clearInterval(timerId);
                // 
                // days.textContent = `00`;
                // hours.textContent = `00`;
                // minutes.textContent = `00`;
                // seconds.textContent = `00`;
                // *** example ***
                // const elem = document.createElement('div');
                // elem.innerHTML = 'sorry time expired, try next time';
                // const parent = document.querySelector('.sale__deadline');
                // parent.append(elem);
                
                //**** automatically add 10 days then date expires ****
                //get temp values
                const day = new Date(endTime).getDate();
                const year = new Date(endTime).getFullYear();
                const month = new Date(endTime).getMonth();
                //add 10 days to deadline
                const newDay = day + 10;
                //setup new deadline
                deadline = new Date(year, month , newDay, 11, 30, 00);
                //show new deadline on page
                showDeadline(deadline);
                //start new timer
                setTimer(deadline);
            }
        }

        //use setInterval to update timer every second

         timerId = setInterval(updateTimer, 1000);
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


    // **** show deadline on page ****
    function showDeadline(deadline) {
        //get elems from page
        const day = document.querySelector('[data-date="day"]'),
              dateOfMonth = document.querySelector('[data-date="date"]'),
              month  = document.querySelector('[data-date="month"]'),
              year = document.querySelector('[data-date="year"]'),
              hours = document.querySelector('[data-date="hours"]'),
              minutes = document.querySelector('[data-date="minutes"]');

              
        //form date from deadline
        const date = new Date(deadline);
        //get needed values from date
        const deadlineDay = date.toLocaleString("en-en", { weekday: "long" }),  // alternative old method - days[date.getDay()] from    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            deadlineDate = date.getDate(),
            deadlineMonth = date.toLocaleString("en-en", { month: "long" }),
            deadlineYear = date.getFullYear(),
            deadlineHours = date.getHours(),
            deadlineMinutes = date.getMinutes();

        //put this values in html
        day.textContent = deadlineDay;
        dateOfMonth.textContent = deadlineDate;
        month.textContent = deadlineMonth;
        year.textContent = deadlineYear;
        hours.textContent = deadlineHours;
        minutes.textContent = deadlineMinutes;

    }
})