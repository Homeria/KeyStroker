class db {
  constructor(key, h, m, s, ms) {
    this.key = key;
    this.h = h;
    this.m = m;
    this.s = s;
    this.ms = ms;
  }

  getKey() {
    return this.key;
  }

  getTime() {
    return (this.h + " : " + this.m + " : " + this.s + " : " + this.ms);
  }

  getHour() {
    return this.h;
  }

  getMin() {
    return this.m;
  }

  getSec() {
    return this.s;
  }

  getMilSec() {
    return this.ms;
  }

  getInfo() {
    return ("key : " + this.key + ", time : " + this.getTime());
  }

}

let logs = [];

function updateKeyList(key, time) {
  let list = document.getElementById("key-list");
  let item = document.createElement("li");

  let k = document.createElement("div");
  let keySpan = document.createElement("span");
  k.setAttribute("id", "key");
  keySpan.setAttribute("id", "key-text");
  keySpan.innerHTML = key;

  let t = document.createElement("div");
  let timeSpan = document.createElement("span");
  t.setAttribute("id", "time");
  timeSpan.setAttribute("id", "time-text");
  timeSpan.innerHTML = time;

  t.appendChild(timeSpan);
  k.appendChild(keySpan);
  item.appendChild(k);
  item.appendChild(t);
  list.appendChild(item);

  const lastItem = list.lastElementChild;
  const lastItemPosition = lastItem.offsetTop + lastItem.offsetHeight;
  list.scrollTo(0, lastItemPosition);

}

function cleaningList() {
  let list = document.getElementById("key-list");
  removeAllChildNodes(list);
  logs = [];
  console.log(logs);
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function saveLogs() {

  if (logs.length === 0) {
    alert("The log not exist. You can't save!");
    return;
  }

  let textToSave = "";

  for (let i = 0; i < logs.length; i++) {
    textToSave += logs[i].getInfo() + "\n";
  }

  let now = new Date();

  let filename = 'saved_log ' + getDateString(now) + 'txt';
  download(filename, textToSave);
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function getDateString(now) {
  let s =
    now.getFullYear() + "-"
    + (now.getMonth() + 1) + "-"
    + now.getDate() + " ";

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  s += "(" + daysOfWeek[now.getDay()] + ") "

  s += now.getHours() + "-"
    + now.getMinutes() + "-"
    + now.getSeconds() + "-"
    + now.getMilliseconds();

  return s;

}

function getInterval() {
  let interval;
  if(logs.length === 1) {
    interval = 0;
  } else {
    prevDB = logs[logs.length - 2];
    targetDB = logs[logs.length - 1];

    prevTime = (((((prevDB.getHour() * 60) + prevDB.getMin()) * 60) + prevDB.getSec()) * 1000) + prevDB.getMilSec();
    targetTime = (((((targetDB.getHour() * 60) + targetDB.getMin()) * 60) + targetDB.getSec()) * 1000) +targetDB.getMilSec();
    interval = (targetTime - prevTime) / 1000;
  }
  return interval;
}

function clickListener() {
  let time = new Date();
  let hour = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();
  let milsec = time.getMilliseconds();

  logs.push(new db("click", hour, min, sec, milsec));
  let interval = getInterval();

  updateKeyList("click", (hour + " : " + min + " : " + sec + " : " + milsec + " (" + interval + " sec)"));
  
}

// 키 입력 이벤트 리스너 등록
document.addEventListener("keydown", function (event) {
  // 키 종류와 누른 시간 기록
  let key = event.key;
  let time = new Date();

  let hour = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();
  let milsec = time.getMilliseconds();

  logs.push(new db(key, hour, min, sec, milsec));

  let interval = getInterval();
  updateKeyList(key, (hour + " : " + min + " : " + sec + " : " + milsec + " (" + interval + " sec)"));
  console.log(logs);
});

window.addEventListener("keydown", function (e) {
  if (
    e.key === "Tab"
    || e.key === "ArrowUp"
    || e.key === "ArrowDown"
    || e.key === "ArrowLeft"
    || e.key === "ArrowRight"
    || e.key === "Home"
    || e.key === "End"
    || e.key === "PageUp"
    || e.key === "PageDown"
    || e.key === "Space"
    || e.key === "Enter"
    || e.key === "F1"
    || e.key === "F2"
    || e.key === "F3"
    || e.key === "F4"
    || e.key === "F5"
    || e.key === "F6"
    || e.key === "F7"
    || e.key === "F8"
    || e.key === "F9"
    || e.key === "F10"
    || e.key === "F11"
  ) {
    e.preventDefault();
  }
});

