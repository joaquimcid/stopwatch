const state = {
  INITIAL : "INITIAL",
  RUNNING : "RUNNING",
  STOP : "STOP",
}

const stopWatch = new StopWatch();

var application_status = state.INITIAL;

var display = window.document.getElementById("display");
var lapResetBtn = window.document.getElementById("lapResetBtn");
var startStopBtn = window.document.getElementById("startStopBtn");
var laps = window.document.getElementById("laps");

const period = 10;
var timer;
var displayMilliSeconds = 0;
var lapCounter = 0;
var lapsTimeRecords = [];


function timer_tick(){
  showTimeToDisplay(stopWatch.elapsedTime());
}

function padValue(value) {
  if (value > 9) return value;
  else return "0" + value;
}

function showTimeToDisplay(timeToShow) {
  display.textContent = convertMilliSecondsToTime(timeToShow)
}

function convertMilliSecondsToTime(milliSecondsValue) {
  var elapsedSeconds = Math.floor(milliSecondsValue / 1000);

  var cs = padValue(Math.round((milliSecondsValue % 1000) / 10));
  var s = padValue(elapsedSeconds % 60);
  var m = padValue(Math.floor(elapsedSeconds / 60));
  var hours = padValue(Math.floor(elapsedSeconds / 3600));
  const formattedHours = hours !== '00' ? `${hours}:` : '';

  return `${formattedHours}${m}:${s},${cs}`;
}

lapResetBtn.addEventListener('click', function () {
  if (application_status === state.STOP) {
    application_status = state.INITIAL;
    //stopWatch = new StopWatch();
    stopWatch.stop();
    showTimeToDisplay(stopWatch.elapsedTime());

    window.clearInterval(timer);
    
    startStopBtn.textContent = "Start";
    startStopBtn.className = "button buttonStart";
   
    lapResetBtn.textContent = "Lap";
    lapResetBtn.className = "button buttonLapWhenIsInitial";
    laps.innerHTML = "";
    lapCounter = 0;
    lapsTimeRecords = [];
    return;
  }

  if(application_status === state.RUNNING) {
    
    stopWatch.newLap();
    laps.innerHTML = "";
    stopWatch.laps.forEach(addNewLapRecord);

    return;
  }

});

function addNewLapRecord(value, index, array) {
  /*<p class="lapRecord"> <div class="lapRecordLabel"> Lap 1</div> <div class="lapRecordValue"> 00:00,01</div> </p>
    <br /> */
  
  const minStyle = "lapRecordMinium";
  const maxStyle = "lapRecordMaxium";
  const defaultStyle = "lapRecord"
    
  var nodeLapRecord = document.createElement("p")
  if (value === stopWatch.minLap()) nodeLapRecord.className = minStyle;
  else if (value === stopWatch.maxLap()) nodeLapRecord.className = maxStyle;
  else nodeLapRecord.className = defaultStyle;

  var nodeLapRecordLabel = document.createElement("div");
  nodeLapRecordLabel.className = "lapRecordLabel";
  var nodeLapRecordValue = document.createElement("div");
  nodeLapRecordValue.className = "lapRecordValue";

  var textLapRecordLabel = document.createTextNode( "Lap " + index);
  nodeLapRecordLabel.appendChild(textLapRecordLabel);

  var valueToPrint = convertMilliSecondsToTime(value);
  var textLapRecordValue = document.createTextNode(valueToPrint);
  nodeLapRecordValue.appendChild(textLapRecordValue);

  nodeLapRecord.appendChild(nodeLapRecordLabel);
  nodeLapRecord.appendChild(nodeLapRecordValue);

  laps.insertBefore(document.createElement("br"), laps.firstChild);
  laps.insertBefore(nodeLapRecord, laps.firstChild); 
}

startStopBtn.addEventListener('click', function () {
  
  if (application_status === state.INITIAL || application_status === state.STOP) {    

    if (application_status === state.INITIAL) stopWatch.start();
    else if (application_status === state.STOP) stopWatch.resume();

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
    stopWatch.pause();

    window.clearInterval(timer);
    startStopBtn.textContent = "Start";
    startStopBtn.className = "button buttonStart";
   
    lapResetBtn.textContent = "Reset";
    return;
  }

});