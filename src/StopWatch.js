class StopWatch {
  constructor() { this.stop();  }

  start() {
    this.timeStarted = Date.now();
    console.log("start: " + this.timeStarted);
  }
  
  stop() {
    this.timeStarted = null;
    this.laps = [];
    this.minLapRecord = null;
    this.maxLapRecord = null;
    this.sumOfLapTimes = 0;
    this.elapsedTimeWhenPaused = null;
    console.log("stop: " + this.timeStarted);
  }
  
  pause() {
    if (this.timeStarted === null) return;

    this.elapsedTimeWhenPaused = this.elapsedTime();
    console.log("pause: " + this.timeStarted);
  }

  resume() {
    if (this.elapsedTimeWhenPaused === null) return;

    console.log("is called resume: " + this.timeStarted);
    console.log("         dateNow: " + Date.now());

    this.timeStarted = Date.now() - this.elapsedTimeWhenPaused;

    this.elapsedTimeWhenPaused = null;
    console.log("resume: " + this.timeStarted);
  }
  
  elapsedTime() {
    if (this.timeStarted  === null) return 0;
    return Date.now() - this.timeStarted;
  }

  newLap() {
    if (this.timeStarted === null) return;
    if (this.elapsedTimeWhenPaused === null) return;

    let newRecord = (this.laps.length > 0) ? this.elapsedTime() - this.sumOfLapTimes : this.elapsedTime();
    this.laps.push(newRecord);
    this.sumOfLapTimes += newRecord;

    if (this.minLapRecord === null || this.minLapRecord > newRecord) this.minLapRecord = newRecord;
    if (this.maxLapRecord < newRecord) this.maxLapRecord = newRecord;
    console.log("newLap: " + this.timeStarted);
  }
  
  laps() {
    return this.laps;
  }

  minLap() {
    return this.minLapRecord;
  }
  
  maxLap() {
    return this.maxLapRecord;
  }
}

