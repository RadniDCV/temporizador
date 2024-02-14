let timerInterval;
let setsLeft = 0;
let setTime = 0;
let breakTime = 0;

function startTimer() {
    clearInterval(timerInterval);

    const inputSets = parseInt(document.getElementById('sets').value);
    if (isNaN(inputSets) || inputSets <= 0) {
        alert('Por favor, introduce un número de sets válido.');
        return;
    }

    setsLeft = inputSets;
    nextSet();
}

function nextSet() {
    if (setsLeft <= 0) {
        clearInterval(timerInterval);
        setTimeout(() => {
            playSound('buzzer');
        }, 2000);
        return;
    }

    setTime = parseInt(document.getElementById('inputTime1').value);
    breakTime = parseInt(document.getElementById('inputTime2').value);

    if (isNaN(setTime) || setTime <= 0 || isNaN(breakTime) || breakTime <= 0) {
        alert('Por favor, introduce un tiempo válido para el set y el descanso.');
        return;
    }

    startSetTimer();
}

function startSetTimer() {
    updateTimerDisplay1();

    timerInterval = setInterval(() => {
        setTime--;
        if (setTime <= 0) {
            clearInterval(timerInterval);
            playSound('beep');
            updateTimerDisplay1();
            setTimeout(() => {
                startBreakTimer();
            }, 1000);
        } else {
            updateTimerDisplay1();
        }
    }, 1000);
}

function startBreakTimer() {
    updateTimerDisplay2();

    timerInterval = setInterval(() => {
        breakTime--;
        if (breakTime <= 0) {
            clearInterval(timerInterval);
            playSound('beep');
            updateTimerDisplay2();
            setsLeft--;
            nextSet();
        } else {
            updateTimerDisplay2();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    setsLeft = 0;
    updateTimerDisplay1();
    updateTimerDisplay2();
}

function updateTimerDisplay1() {
    const hours = Math.floor(setTime / 3600);
    const minutes = Math.floor((setTime % 3600) / 60);
    const seconds = setTime % 60;
    document.getElementById('timer1').innerText = `Set: ${setsLeft} - ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

function updateTimerDisplay2() {
    const hours = Math.floor(breakTime / 3600);
    const minutes = Math.floor((breakTime % 3600) / 60);
    const seconds = breakTime % 60;
    document.getElementById('timer2').innerText = `Descanso: ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function playSound(type) {
    let audio;
    if (type === 'beep') {
        audio = new Audio('./beep.mp3');
    } else if (type === 'buzzer') {
        audio = new Audio('./buzzer.mp3');
    }
    audio.play();
}
