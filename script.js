// HTML elements
const pause = document.getElementById('pause');
const start_pause = document.getElementById('start');
const reset = document.getElementById('reset');
const countdown = document.getElementsByClassName('countdown');
const span_hour = document.getElementById('span_hour');
const span_minute = document.getElementById('span_minute');
const span_second = document.getElementById('span_second');
const span_centisecond = document.getElementById('span_centisecond');
const lap = document.getElementById('lap');
const lap_adder_li = document.getElementsByClassName('list-item');
const ul_list = document.querySelector('.ul_list');
const lap_clear_button = document.querySelector('.lap-clear');


// Normal variables
let isplaying = false;
let secCounter = 0;
let centiCounter = 0;
let minCounter = 0;
let hourCounter = 0;
let centisec;
let sec;
let min;
let hour;
let lap1;

// Play and Pause
const play_stop = () => {
    toggle();
    // CentiSecond Counter
    centisec = setInterval(() => {
        centiCounter++;
        if (centiCounter === 100) {
            centiCounter = 0;
        }
        if (centiCounter < 10) {
            span_centisecond.innerText = `0${centiCounter}`;
        }
        else {
            span_centisecond.innerText = `${centiCounter}`;
        }

    }, 10);

    // Second Counter
    sec = setInterval(() => {
        secCounter++;
        if (secCounter === 60) {
            secCounter = 0;
        }
        if (secCounter < 10) {
            span_second.innerText = `0${secCounter} :`
        }
        else {
            span_second.innerText = `${secCounter} :`
        }


    }, 1000);


    // Min Counter
    min = setInterval(() => {
        minCounter++;
        if (minCounter === 60) {
            minCounter = 0;
        }
        if (minCounter < 10) {
            span_minute.innerText = `0${minCounter} :`;
        }
        else {
            span_minute.innerText = `${minCounter} :`;
        }

    }, 60000);


    // Hour Counter
    hour = setInterval(() => {
        hourCounter++;
        if (hourCounter === 24) {
            hourCounter = 0;
        }
        if (hourCounter < 10) {
            span_hour.innerText = `0${hourCounter} :`;
        }
        else {
            span_hour.innerText = `${hourCounter} :`;
        }

    }, 3600000);

    if (!isplaying) {
        clearInterval(centisec);
        clearInterval(sec);
        clearInterval(min);
        clearInterval(hour);
    }

}

// Reset the Stopwatch

const reset_counter = () => {

    if (isplaying) {
        toggle();
    }
    else {
        isplaying = !isplaying
        toggle();
    }
    reset.classList.remove('displayVisible');
    lap.classList.remove('displayVisible');
    ul_list.classList.add('displayNone');
    secCounter = 0;
    minCounter = 0;
    hourCounter = 0;
    centiCounter = 0;
    span_hour.innerText = `00 :`
    span_minute.innerText = `00 :`
    span_second.innerText = `00 :`
    span_centisecond.innerText = `00 `
    lap_clear();
}

// Lap create function
let lap_click_count = 0;
const lapcreate = () => {
    let lap_hour_counter = hourCounter;
    let lap_min_counter = minCounter;
    let lap_sec_counter = secCounter;
    let lap_centi_counter = centiCounter;

    ul_list.classList.remove('displayNone');
    lap_clear_button.classList.remove('displayNone');
    lap_click_count++;
    let lapdisplay = `Lap ${lap_click_count} : ${lap_hour_counter}:${lap_min_counter}:${lap_sec_counter}:${lap_centi_counter}`;
    let span = lap_adder_li[lap_click_count].querySelector('span');
    for (let i = 0; i < lap_click_count; i++) {
        lap_adder_li[lap_click_count].classList.remove('displayNone');
        span.innerText = lapdisplay;
    }
}

// Lap clear Function
const lap_clear = () => {
    lap_hour_counter = 0;
    lap_min_counter = 0;
    lap_sec_counter = 0;
    lap_centi_counter = 0;

    lapdisplay = `${lap_hour_counter}:${lap_min_counter}:${lap_sec_counter}:${lap_centi_counter}`;
    span = lap_adder_li[lap_click_count].querySelector('span');
    for (let i = 0; i <= lap_click_count; i++) {
        lap_adder_li[i].classList.add('displayNone');
        span.innerText = lapdisplay;
    }
    lap_click_count = 0;
    lap_clear_button.classList.add('displayNone');
}

// EventListerners
start_pause.addEventListener('click', play_stop);
reset.addEventListener('click', reset_counter);
lap.addEventListener('click', lapcreate);
lap_clear_button.addEventListener('click', lap_clear);

// Toggle function
const toggle = () => {
    isplaying = !isplaying;
    if (isplaying) {
        start_pause.innerText = 'Pause';
        reset.classList.add('displayVisible');
        lap.classList.add('displayVisible');
    }
    else {
        start_pause.innerText = 'Start';
        clearInterval(centisec);
        clearInterval(sec);
        clearInterval(min);
        clearInterval(hour);
    }
}
