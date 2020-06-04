const state = {
  INITIAL : "INITIAL",
  RUNNING : "RUNNING",
  STOP : "STOP",
}

var application_status = state.INITIAL;

var display = window.document.getElementById("display");
var lapResetBtn = window.document.getElementById("lapResetBtn");
var startStopBtn = window.document.getElementById("startStopBtn");

const period = 1000;
var elapsedTime = 0;
var timer;

function timer_tick(){
  elapsedTime += period;
  showDisplay();
}

function padValue(value) {
  if (value > 9) return value;
  else return "0" + value;
}

function showDisplay() {
  var s = padValue(Math.floor(elapsedTime % 60));
  var m = padValue(Math.floor(elapsedTime / 60));
  var h = padValue(Math.floor(elapsedTime / 3600));

  display.textContent = m + ":" + s + ",00";
  if ( h!= "00") display.textContent = s + display.textContent;
}


lapResetBtn.addEventListener('click', function () {
  if (application_status == state.STOP) {
    application_status = state.INITIAL;
    window.clearInterval(timer);
    elapsedTime = 0;
    showDisplay();
    startStopBtn.textContent = "Start";
    lapResetBtn.textContent = "Lap";
    return;
  }

  if(application_status == state.RUNNING) {
    window.alert('LAAAAP');
    return;
  }

});

startStopBtn.addEventListener('click', function () {
  
  if (application_status == state.INITIAL || application_status == state.STOP) {
    application_status = state.RUNNING;
    timer = window.setInterval(timer_tick, period);
    startStopBtn.textContent = "Stop";
    lapResetBtn.textContent = "Lap";
    return;
  } 
  
  if (application_status == state.RUNNING) {
    application_status = state.STOP;
    window.clearInterval(timer);
    startStopBtn.textContent = "Start";
    lapResetBtn.textContent = "Reset";
    return;
  }

});