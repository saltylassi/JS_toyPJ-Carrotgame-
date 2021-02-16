const timer = document.querySelector(".timer-text");
const playBtn = document.querySelector(".play-button");
const playground = document.querySelector(".background");
const remain = document.querySelector(".remain-carrot__text");
const lose = document.querySelector(".lose");
const win = document.querySelector(".win");
const retryBtn = document.querySelectorAll(".retry-btn");

let width = window.innerWidth;
let height = window.innerHeight;
let number = 7;
let timerFunc;
let time = 10;
let isPlaying = false;

const makeObject = (times, name) => {
    for (var i = 0; i < times; i++) {
        const element = document.createElement("div");
        let x = Math.floor((Math.random() * width) / 1.15 + 50);
        let y = Math.floor((Math.random() * height) / 3 + height / 1.8);

        element.setAttribute("class", name);
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        playground.appendChild(element);
    }
};

const handleLose = () => {
    clearInterval(timerFunc);
    lose.classList.add("result");
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
    isPlaying = false;
};

const handleWin = () => {
    clearInterval(timerFunc);
    win.classList.add("result");
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
    isPlaying = false;
};

const handlePlayClick = () => {
    if (isPlaying === false) {
        isPlaying = true;

        playBtn.innerHTML = `<i class="fas fa-stop"></i>`;

        clearInterval(timerFunc);

        number = 7;
        time = 10;

        lose.classList.remove("result");
        win.classList.remove("result");

        const bugs = playground.querySelectorAll(".bug");
        const carrots = playground.querySelectorAll(".carrot");

        bugs.length >= 1 &&
            Array.from(bugs).map((bug) => {
                bug.style.display = "none";
            });

        carrots.length >= 1 &&
            Array.from(carrots).map((carrot) => {
                carrot.style.display = "none";
            });

        timer.innerText = time < 10 ? `00:0${time}` : `00:${time}`;
        time -= 1;

        timerFunc = setInterval(() => {
            if (time < 1) {
                handleLose();
            }
            timer.innerText = time < 10 ? `00:0${time}` : `00:${time}`;
            time -= 1;
        }, 1000);
        remain.innerText = number;

        makeObject(7, "carrot");
        makeObject(7, "bug");
    } else {
        console.log("playing");
        clearInterval(timerFunc);
        playBtn.innerHTML = `<i class="fas fa-play"></i>`;
        isPlaying = false;
    }
};

const handleResize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
};

const handleObjectClick = (event) => {
    if (event.target.className === "bug" || event.target.className === "carrot") {
        if (event.target.className === "carrot") {
            event.target.style.display = "none";
            number -= 1;
            remain.innerText = number;
            if (number < 1) {
                handleWin();
            }
        } else {
            handleLose();
        }
    }
};

const init = () => {
    window.addEventListener("resize", handleResize);
    playBtn.addEventListener("click", handlePlayClick);
    retryBtn[0].addEventListener("click", handlePlayClick);
    retryBtn[1].addEventListener("click", handlePlayClick);
    playground.addEventListener("click", handleObjectClick);
};

window.addEventListener("load", init);
