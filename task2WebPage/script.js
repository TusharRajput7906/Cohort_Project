function openfeature() {
  let elements = document.querySelectorAll(".elem");
  let fullElem = document.querySelectorAll(".fullElem");
  let closeBtn = document.querySelectorAll(".fullElem .close");
  elements.forEach((elem) => {
    elem.addEventListener("click", () => {
      fullElem[elem.id].style.display = "block";
    });
  });
  closeBtn.forEach((elem) => {
    elem.addEventListener("click", () => {
      fullElem[elem.id].style.display = "none";
    });
  });
}
openfeature();

function todoList() {
  var currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("Task list is Empty");
  }
  if (typeof renderTask === "function") renderTask();

  function renderTask() {
    let allTask = document.querySelector(".allTask");
    let sum = "";
    currentTask.forEach((e, idx) => {
      sum += `<div class="tasks">
        <h2>${e.task}<span class="${e.imp}">imp</span></h2>
        <button class="done" id="${idx}">Marks as Completed</button>
      </div>`;
    });
    allTask.innerHTML = sum;
    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    let markComplete = document.querySelectorAll(".done");

    markComplete.forEach((btn) => {
      btn.addEventListener("click", () => {
        currentTask.splice(btn.id, 1);
        renderTask();
      });
    });
  }

  let form = document.querySelector(".addTask form");
  let inputValue = document.querySelector(".addTask form #taskInput");
  let textareaValue = document.querySelector(".addTask form textarea");
  let check = document.querySelector("#mark");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // simple validation: ignore empty tasks
      if (!inputValue || !inputValue.value.trim()) return;

      currentTask.push({
        task: inputValue.value.trim(),
        imp: check ? check.checked : false,
        details: textareaValue ? textareaValue.value : "",
      });

      if (inputValue) inputValue.value = "";
      if (check) check.checked = false;
      if (textareaValue) textareaValue.value = "";
      renderTask();
    });
  } else {
    console.warn("Form not found — submit handler not attached");
  }
}
todoList();

//Daily Planner

function dailyPlanner() {
  let hours = Array.from({ length: 18 }, function (e, idx) {
    return `${6 + idx}:00 - ${7 + idx}:00`;
  });

  let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  let day_planner = document.querySelector(".day-planner");
  let wholeDaySum = "";
  hours.forEach((elem, idx) => {
    var saveData = dayPlanData[idx] || "";
    console.log(saveData);
    wholeDaySum += `<div class="day-planner-time">
                <p>${elem}</p>
                <input id="${idx}" type="text" placeholder="..." value="${saveData}">
               </div>`;
  });

  day_planner.innerHTML = wholeDaySum;

  // now that inputs exist, select them and attach listeners
  let dayPlannerInput = document.querySelectorAll(".day-planner input");
  dayPlannerInput.forEach((elem) => {
    elem.addEventListener("input", () => {
      dayPlanData[elem.id] = elem.value;
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}
dailyPlanner();

//motivation
function motivatioQuote() {
  let outer = document.querySelector(".outer");
  let inner = document.querySelector(".inner");
  let author = document.querySelector(".outer h4");
  let motivation = document.querySelector(".motivation");

  async function fetchQuotes() {
    let abc = await fetch("https://dummyjson.com/quotes/random");
    let data = await abc.json();
    // console.log(data);
    outer.innerHTML = `<div class="inner">Quote of the  Day</div>
            <p>${data.quote}</p>
            <h4>${data.author}</h4>`;
  }
  fetchQuotes();
}
motivatioQuote();

//Pomodoro Timer
function pomodoro() {
  let totalTime = 25 * 60;
  let interval;
  let isWorkSession = true;
  let time = document.querySelector(".pomodoro p");
  let session = document.querySelector(".pomodoro .session");
  function timer() {
    if (totalTime < 0) {
      if (isWorkSession) {
        totalTime = 5 * 60;
        time.innerHTML = `05:00`;
        isWorkSession = false;
        session.innerHTML = `Break Time`;
        session.style.backgroundColor = "yellow";
        session.style.color = "black";
        pause();
      } else {
        isWorkSession = true;
        totalTime = 25 * 60;
        time.innerHTML = `25:00`;
        session.innerHTML = `Work Session`;
        session.style.backgroundColor = "green";
        session.style.color = "white";
        pause();
      }
    } else {
      let minutes = Math.floor(totalTime / 60);
      let second = totalTime % 60;
      time.innerHTML = `${String(minutes).padStart("2", "0")}:${String(
        second
      ).padStart("2", "0")}`;
    }
  }

  function start() {
    document.querySelector(".start").disabled = true;
    interval = setInterval(() => {
      totalTime--;
      timer();
    }, 1000);
  }

  function pause() {
    clearInterval(interval);
    document.querySelector(".start").disabled = false;
  }

  function reset() {
    clearInterval(interval);
    document.querySelector(".start").disabled = false;
    if (isWorkSession) {
      totalTime = 25 * 60;
      time.innerHTML = `25:00`;
    } else {
      totalTime = 5 * 60;
      time.innerHTML = `05:00`;
    }
  }
  document.querySelector(".start").addEventListener("click", start);
  document.querySelector(".pause").addEventListener("click", pause);
  document.querySelector(".reset").addEventListener("click", reset);
}
pomodoro();

//weather
function weatherFunctionality() {
  let day = document.querySelector(".header1 h1");
  let area = document.querySelector(".header1 h4");
  let temp = document.querySelector(".header2 h2");
  let predict = document.querySelector(".header2 h4");
  let precipitation = document.querySelector("#precipitation");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let dat = document.querySelector(".header1 h3");

  let apiKey = "82958944c3554404aae141559251712";
  let city = "Meerut";
  let data = null;
  async function apiCall() {
    let resp = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    );
    data = await resp.json();
    temp.innerHTML = `${data.current.temp_c}°C`;
    predict.innerHTML = `${data.current.condition.text}`;
    precipitation.innerHTML = `Heat Index: ${data.current.heatindex_c}%`;
    humidity.innerHTML = `humidity: ${data.current.humidity}%`;
    wind.innerHTML = `wind:${data.current.wind_kph} km/h`;
    console.log(data);
  }
  apiCall();

  function timeDate() {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let date = new Date();
    let dayOfWeek = days[date.getDay()];
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let tarik = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    dat.innerHTML = `${tarik} ${months[month]} ${year}`;
    if (hours > 12) {
      day.innerHTML = `${dayOfWeek}, ${String(hours - 12).padStart(
        "2",
        "0"
      )}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart(
        "2",
        "0"
      )} PM`;
    } else {
      day.innerHTML = `${dayOfWeek}, ${String(hours).padStart(
        "2",
        "0"
      )}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart(
        "2",
        "0"
      )} AM`;
    }
  }
  setInterval(() => {
    timeDate();
  }, 1000);
}
weatherFunctionality();

//change theme
function changeTheme(){
  let theme = document.querySelector("nav .themeBtn");
let rootElement = document.documentElement;

let flag = 0;
if (theme) {
  theme.addEventListener("click", () => {
    if (flag === 0) {
      rootElement.style.setProperty("--pri", "#F8F4E1");
      rootElement.style.setProperty("--sec", "#222831");
      rootElement.style.setProperty("--tri1", "#948979");
      rootElement.style.setProperty("--tri2", "#393E46");
      flag = 1;
    } else if (flag === 1) {
      rootElement.style.setProperty("--pri", "#F1EFEC");
      rootElement.style.setProperty("--sec", "#030303");
      rootElement.style.setProperty("--tri1", "#D4C9BE");
      rootElement.style.setProperty("--tri2", "#222831");
      flag = 2;
    } else if (flag === 2) {
      rootElement.style.setProperty("--pri", "#F8F4E1");
      rootElement.style.setProperty("--sec", "#381c0a");
      rootElement.style.setProperty("--tri1", "#FEBA17");
      rootElement.style.setProperty("--tri2", "#74512D");
      flag = 0; // cycle back
    }
  });
} else {
  console.warn("Theme button not found: selector 'nav .themeBtn' returned null");
}
};
changeTheme();