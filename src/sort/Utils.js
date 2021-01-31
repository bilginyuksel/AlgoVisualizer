const MIN_PILLAR_VALUE = 8;
const MAX_PILLAR_VALUE = 60;
const MIN_SLEEP_TIME = 0;
const MAX_SLEEP_TIME = 1000;

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

function getPillarStyles(pillar, coef=7, width=10) {
  return {
    width: width,
    height: pillar.val * coef,
    backgroundColor: pillar.color
  };
}

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, MAX_SLEEP_TIME - time[0]))
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
  MAX_SLEEP_TIME
};