class StopWatch {
  constructor() { this.stop();  }

  start() {
    this.timeStarted = Date.now();
  }
  
  stop() {
    this.timeStarted = null;
    this.laps = [];
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

    if (this.laps.length > 0) {
      let sumOfLapTimes = this.laps.reduce( (total, num) => total + num);
      this.laps.push(this.elapsedTime() - sumOfLapTimes);
    }
    else this.laps.push(this.elapsedTime());
  }
  
  laps() {
    return this.laps;
  }

  minLap() {
    return  Math.min(...this.laps);
  }
  
  maxLap() {
    return  Math.max(...this.laps);
  }
}

