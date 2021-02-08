const MIN_PILLAR_VALUE = 8;
const MAX_PILLAR_VALUE = 50;
const MIN_SLEEP_TIME = 0;
const MAX_SLEEP_TIME = 1000;
const MAX_PILLAR_COUNT = 50;
const MIN_PILLAR_COUNT = 8;

function randint(min, max) {
  return min + Math.floor((max - min) * Math.random());
}

function getPillar(value, color='gray') {
  return {'val': value, 'color': color};
}

function getPillars(count, color = 'gray', min = MIN_PILLAR_VALUE, max = MAX_PILLAR_VALUE) {
  const pillars = [];
  for (let i = 0; i < count; i++) {
    pillars.push(getPillar(randint(min, max), color));
  }
  return pillars;
}

function getPillarStyles(pillar, coef=3, width=30) {
  return {
    width: width,
    height: pillar.val * coef,
    backgroundColor: pillar.color
  };
}

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, MAX_SLEEP_TIME - time[0]))
}

class AlgoRunner {
  constructor() {
    this.steps = [];
    this.currentStep = 0;
    this.speed = 100;
    this.isStopped = false;
    this.isStarted = false;
    this.isPaused = false;
  }

  buildSteps(array) {
  }

  stop() {
    this.isStopped = true;
    this.isStarted = false;
    this.isPaused = false;
    this.currentStep = 0;
  }

  pause() {
    this.isPaused = true;
  }

  // Go back to default values
  reset() {
    this.steps = [];
    this.currentStep = 0;
    this.speed = 100;
    this.isStopped = false;
    this.isStarted = false;
    this.isPaused = false;
  }

  // Current step preview...
  // Don't execute the step and this step can be revertible
  preview() {
    this.steps[this.currentStep].execute(); 
    // sleep for a bit then revert
    this.steps[this.currentStep].revert();
  }

  // Revert the last executed step
  revert() {
    // Throw an error
    if(this.currentStep === 0) 
      return;

    this.steps[--this.currentStep].revert();
  }

  async play() {
    while(this.currentStep < this.steps.length) {
      if(this.isPaused || this.isStopped) break;
      await this.steps[this.currentStep].execute(); 
      this.currentStep++;
    }
  }

}

export {
  randint,
  getPillar,
  getPillars,
  sleep,
  getPillarStyles,
  MIN_PILLAR_VALUE,
  MIN_SLEEP_TIME,
  MAX_PILLAR_VALUE,
  MAX_SLEEP_TIME,
  MAX_PILLAR_COUNT,
  MIN_PILLAR_COUNT,
  AlgoRunner,
};
