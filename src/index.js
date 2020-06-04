const state = {
  INITIAL : "INITIAL",
  RUNNING : "RUNNING",
  STOP : "STOP",
}

var application_status = state.INITIAL;

var display = window.document.getElementById("display");
var lapResetBtn = window.document.getElementById("lapResetBtn");
var startStopBtn = window.document.getElementById("startStopBtn");
var laps = window.document.getElementById("laps");

const period = 10;
var timer;
var displayMilliSeconds = 0;
var lapMilliSeconds = 0;
var lapCounter = 0;

function timer_tick(){
  displayMilliSeconds += period;
  showDisplay();
}

function padValue(value) {
  if (value > 9) return value;
  else return "0" + value;
}

function showDisplay() {
  var elapsedSeconds = displayMilliSeconds / 1000;

  var ms = padValue(Math.floor((displayMilliSeconds % 1000) / 10));
  var s = padValue(Math.floor(elapsedSeconds % 60));
  var m = padValue(Math.floor(elapsedSeconds / 60));
  var h = padValue(Math.floor(elapsedSeconds / 3600));

  display.textContent = m + ":" + s + "," + ms;
  if ( h!= "00") display.textContent = s + display.textContent;
}


lapResetBtn.addEventListener('click', function () {
  if (application_status == state.STOP) {
    application_status = state.INITIAL;
    window.clearInterval(timer);
    displayMilliSeconds = 0;
    showDisplay();
   
    startStopBtn.textContent = "Start";
    startStopBtn.className = "button buttonStart";
   
    lapResetBtn.textContent = "Lap";
    lapResetBtn.className = "button buttonLapWhenIsInitial";
    laps.innerText = "";
    lapCounter = 0;
    lapMilliSeconds = 0;
    return;
  }

  if(application_status == state.RUNNING) {
    var currentLap = displayMilliSeconds - lapMilliSeconds;
    lapMilliSeconds = displayMilliSeconds;
    lapCounter++;
    laps.innerText += "Lap " + lapCounter+ " " + currentLap;
    
    return;
  }

});

startStopBtn.addEventListener('click', function () {
  
  if (application_status == state.INITIAL || application_status == state.STOP) {
    application_status = state.RUNNING;
    timer = window.setInterval(timer_tick, period);
    
    startStopBtn.textContent = "Stop";
    startStopBtn.className = "button buttonStop";

    lapResetBtn.textContent = "Lap";
    lapResetBtn.className = "button buttonLapWhenIsRunning";
    return;
  } 
  
  if (application_status == state.RUNNING) {
    application_status = state.STOP;
    window.clearInterval(timer);
    startStopBtn.textContent = "Start";
    startStopBtn.className = "button buttonStart";
   
    lapResetBtn.textContent = "Reset";
    return;
  }

});