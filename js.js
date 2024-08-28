(function () {
    const startBtn = document.getElementById('Startbtn');
    const stopBtn = document.getElementById('Stopbtn');
    const resetBtn = document.getElementById('Resetbtn');
    const timerDisplay = document.getElementById('Timer');
    const timer1Display = document.getElementById('Timer1');
    const workTimeInput = document.getElementById('workTimeInput');
    const breakTimeInput = document.getElementById('breakTimeInput');

    let interval;
    let workTime;  
    let breakTime; 
    let timerLeft;
    let timer1Left;
    let onBreak = false;

    function initializeTimers() {
        workTime = parseInt(workTimeInput.value) * 60; 
        breakTime = parseInt(breakTimeInput.value) * 60;
        timerLeft = workTime;
        timer1Left = breakTime;
        onBreak = false;
        updateTimer();
        updateBreakTimer();
    }

    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min.toString().padStart(2, "0")} : ${sec.toString().padStart(2, "0")}`;
    }

    function updateTimer() {
        timerDisplay.innerHTML = formatTime(timerLeft);
    }

    function updateBreakTimer() {
        timer1Display.innerHTML = formatTime(timer1Left);
    }

    function startTimer() {
        if (interval) return;  
        interval = setInterval(() => {
            if (!onBreak) {
                if (timerLeft <= 0) {
                    alert("Time to take a break");
                    startBreakTimer();
                } else {
                    timerLeft--;
                    updateTimer();
                }
            } else {
                if (timer1Left <= 0) {
                    alert("Break is over! Back to work!");
                    resetTimer();
                } else {
                    timer1Left--;
                    updateBreakTimer();
                }
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(interval);
        interval = null;  
    }

    function resetTimer() {
        stopTimer();
        initializeTimers(); 
    }

    function startBreakTimer() {
        onBreak = true;
        updateBreakTimer();
        startTimer();
    }

    startBtn.addEventListener("click", () => {
        initializeTimers();
        startTimer();
    });
    stopBtn.addEventListener("click", stopTimer);
    resetBtn.addEventListener("click", resetTimer);


    initializeTimers();
})();
