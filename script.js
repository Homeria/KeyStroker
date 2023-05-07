class db {
  constructor(key, h, m , s, ms) {
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
    return ("key : " + this.key + ", time : " + this.getTime())
  }

  getPeriod(target) {
    let t1 = (((((this.h * 60) + this.m) * 60) + this.sec) * 60) + this.ms;
    let t2 = (((((target.getHour() * 60) + target.getMin()) * 60) + target.getSec) * 60) + target.getMilSec;
    return (t1 - t2);
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

    if(logs.length === 0) {
      alert("The log not exist. You can't save!");
      return;
    }

    let textToSave = "";

    for(let i = 0; i < logs.length; i++) {
      textToSave += logs[i].getInfo() + "\n";
    }

    let filename = 'saved_log.txt';
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

  // 키 입력 이벤트 리스너 등록
  document.addEventListener("keydown", function (event) {
    // 키 종류와 누른 시간 기록
    var key = event.key;
    var time = new Date();

    var hour = time.getHours();
    var min = time.getMinutes();
    var sec = time.getSeconds();
    var milsec = time.getMilliseconds();
    logs.push(new db(key, hour, min, sec, milsec));
    updateKeyList(key, (hour + " : " + min + " : " + sec + " : " + milsec));
    console.log(logs);
  });

  window.addEventListener("keydown", function(e) {
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
        || e.key === "F12"
        ) {
      e.preventDefault();
    }
  });

