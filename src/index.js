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
var lapsTimeRecords = [];


function timer_tick(){
  displayMilliSeconds += period;
  showTimeToDisplay(displayMilliSeconds);
}

function padValue(value) {
  if (value > 9) return value;
  else return "0" + value;
}

function showTimeToDisplay(timeToShow) {
  var valueToShow = convertMilliSecondsToTime(timeToShow)

  display.textContent = valueToShow;
}

function convertMilliSecondsToTime(milliSecondsValue) {
  var elapsedSeconds = milliSecondsValue / 1000;

  var ms = padValue(Math.floor((milliSecondsValue % 1000) / 10));
  var s = padValue(Math.floor(elapsedSeconds % 60));
  var m = padValue(Math.floor(elapsedSeconds / 60));
  var h = padValue(Math.floor(elapsedSeconds / 3600));

  var result = m + ":" + s + "," + ms;
  if ( h!= "00") result = h + result;
  
  return result;
}

lapResetBtn.addEventListener('click', function () {
  if (application_status == state.STOP) {
    application_status = state.INITIAL;
    window.clearInterval(timer);
    displayMilliSeconds = 0;
    showTimeToDisplay(displayMilliSeconds);
   
    startStopBtn.textContent = "Start";
    startStopBtn.className = "button buttonStart";
   
    lapResetBtn.textContent = "Lap";
    lapResetBtn.className = "button buttonLapWhenIsInitial";
    laps.innerText = "";
    lapCounter = 0;
    lapsTimeRecords = [];
    lapMilliSeconds = 0;
    return;
  }

  if(application_status == state.RUNNING) {
    var currentLapMilliSeconds = displayMilliSeconds - lapMilliSeconds; 
    lapsTimeRecords.push(currentLapMilliSeconds);
    var currentLapTime = convertMilliSecondsToTime(currentLapMilliSeconds);
    lapMilliSeconds = displayMilliSeconds;
    lapCounter++;

    var style = "lapRecord";
    if (isMinLapRecord(lapsTimeRecords, currentLapMilliSeconds))
    {
      style = "lapRecordMinium";

      var element = document.getElementsByClassName(style);
      if (element.length > 0) {
        element[0].classList.replace(style, "lapRecord");
      }
    } 
    else if (isMaxLapRecord(lapsTimeRecords, currentLapMilliSeconds)){
      style = "lapRecordMaxium";
      var element = document.getElementsByClassName(style);
      if (element.length > 0) {
        element[0].classList.replace(style, "lapRecord");
      }
    }

    addNewLapRecord("Lap " + lapCounter, currentLapTime, style);
    return;
  }

});

function isMinLapRecord(arrayValue, valueToCheck){
  var minFound = Math.min.apply(null, arrayValue);
  return minFound === valueToCheck;
}

function isMaxLapRecord(arrayValue, valueToCheck){
  var maxFound = Math.max.apply(null, arrayValue);
  return maxFound === valueToCheck;
}

function addNewLapRecord(lapLabel, lapValue, style){
  /*
    <p class="lapRecord">
      <div class="lapRecordLabel"> Lap 1</div>
      <div class="lapRecordValue"> 00:00,01</div>
    </p>
    <br />
    */
  var nodeLapRecord = document.createElement("p")
  nodeLapRecord.className = style;
  var nodeLapRecordLabel = document.createElement("div");
  nodeLapRecordLabel.className = "lapRecordLabel";
  var nodeLapRecordValue = document.createElement("div");
  nodeLapRecordValue.className = "lapRecordValue";

  var textLapRecordLabel = document.createTextNode(lapLabel);
  nodeLapRecordLabel.appendChild(textLapRecordLabel);

  var textLapRecordValue = document.createTextNode(lapValue);
  nodeLapRecordValue.appendChild(textLapRecordValue);

  nodeLapRecord.appendChild(nodeLapRecordLabel);
  nodeLapRecord.appendChild(nodeLapRecordValue);

  laps.appendChild(nodeLapRecord);
  laps.appendChild(document.createElement("br"));
  
}

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