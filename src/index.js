const state = {
  INITIAL : "INITIAL",
  RUNNING : "RUNNING",
  STOP : "STOP",
}

const stopWatch = new StopWatch();

let application_status = state.INITIAL;

let display = window.document.getElementById("display");
let lapResetBtn = window.document.getElementById("lapResetBtn");
let startStopBtn = window.document.getElementById("startStopBtn");
let laps = window.document.getElementById("laps");

const period = 10;
let timer;

function refresh_display_timer(){
  printToDisplay(stopWatch.elapsedTime());
}

function printToDisplay(timeToShow) {
  display.textContent = convertMilliSecondsToTime(timeToShow)
}

function convertMilliSecondsToTime(milliSecondsValue) {
  let elapsedSeconds = Math.floor(milliSecondsValue / 1000);
  
  let cs = Math.round((milliSecondsValue % 1000) / 10).toString().padStart(2, 0);
  let s = (elapsedSeconds % 60).toString().padStart(2, 0);
  let m = (Math.floor(elapsedSeconds / 60) % 60).toString().padStart(2, 0);
  let hours = Math.floor(elapsedSeconds / 3600).toString().padStart(2, 0);
  hours = hours !== '00' ? `${hours}:` : '';

  return `${hours}${m}:${s},${cs}`;
}

function addNewLapRecord(value, index, array) {
  /*<p class="lapRecord"> <div class="lapRecordLabel"> Lap 1</div> <div class="lapRecordValue"> 00:00,01</div> </p>
    <br /> */
  
  const minStyle = "lapRecordMinium";
  const maxStyle = "lapRecordMaxium";
  const defaultStyle = "lapRecord"
    
  let nodeLapRecord = document.createElement("p")
  if (value === stopWatch.minLap()) nodeLapRecord.className = minStyle;
  else if (value === stopWatch.maxLap()) nodeLapRecord.className = maxStyle;
  else nodeLapRecord.className = defaultStyle;

  let nodeLapRecordLabel = document.createElement("div");
  nodeLapRecordLabel.className = "lapRecordLabel";
  let nodeLapRecordValue = document.createElement("div");
  nodeLapRecordValue.className = "lapRecordValue";

  let textLapRecordLabel = document.createTextNode( "Lap " + index);
  nodeLapRecordLabel.appendChild(textLapRecordLabel);

  let valueToPrint = convertMilliSecondsToTime(value);
  let textLapRecordValue = document.createTextNode(valueToPrint);
  nodeLapRecordValue.appendChild(textLapRecordValue);

  nodeLapRecord.appendChild(nodeLapRecordLabel);
  nodeLapRecord.appendChild(nodeLapRecordValue);

  laps.insertBefore(document.createElement("br"), laps.firstChild);
  laps.insertBefore(nodeLapRecord, laps.firstChild); 
}

lapResetBtn.addEventListener('click', function () {
  if (application_status === state.STOP) {
    application_status = state.INITIAL;
    //stopWatch = new StopWatch();
    stopWatch.stop();
    printToDisplay(stopWatch.elapsedTime());

    window.clearInterval(timer);
    
    startStopBtn.textContent = "Start";
    startStopBtn.className = "button buttonStart";
   
    lapResetBtn.textContent = "Lap";
    lapResetBtn.className = "button buttonLapWhenIsInitial";
    laps.innerHTML = "";
    return;
  }

  if(application_status === state.RUNNING) {
    
    stopWatch.newLap();
    laps.innerHTML = "";
    stopWatch.laps.forEach(addNewLapRecord);

    return;
  }

});

startStopBtn.addEventListener('click', function () {
  
  if (application_status === state.INITIAL || application_status === state.STOP) {    

    if (application_status === state.INITIAL) stopWatch.start();
    else if (application_status === state.STOP) stopWatch.resume();

    application_status = state.RUNNING;
    timer = window.setInterval(refresh_display_timer, period);

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