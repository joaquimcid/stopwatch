class StopWatch {
  constructor() { this.stop();  }

  start() {
    this.timeStarted = Date.now();
  }
  
  stop() {
    this.timeStarted = null;
    this.laps = [];
    this.minLapRecord = null;
    this.maxLapRecord = null;
    this.sumOfLapTimes = 0;
  }
  
  pause() {
  
  }

  resume() {
    this.timeStarted = Date.now() - this.timeStarted;
  }
  
  elapsedTime() {
    if (this.timeStarted  === null) return 0;
    return Date.now() - this.timeStarted;
  }

  newLap() {
    if (this.timeStarted === null) return;

    let newRecord = (this.laps.length > 0) ? this.elapsedTime() - sumOfLapTimes : this.elapsedTime();
    this.laps.push(newRecord);
    this.sumOfLapTimes += newRecord;

    if (this.minLapRecord === null || this.minLapRecord > newRecord) this.minLapRecord = newRecord;
    if (this.maxLapRecord < newRecord) this.maxLapRecord = newRecord;
  }
  
  laps() {
    return this.laps;
  }

  minLap() {
    return this.minLapRecord;
    return  Math.min(...this.laps);
  }
  
  maxLap() {
    return this.maxLapRecord;

    return  Math.max(...this.laps);
  }
}

