import { useState, useEffect } from 'react';
import { getPillars, sleep, getPillarStyles, MAX_PILLAR_COUNT, MIN_PILLAR_COUNT } from './Utils';

export default function InsertionSort() {
  const [pillars, setPillars] = useState(getPillars(8));
  const [count, setCount] = useState(10);
  const [speed, setSpeed] = useState([150]);
  const [isStopped, stop] = useState([true]);

  useEffect(() => {

  }, [pillars]);

  const updateColor = async (pillar, color) => {
    pillar.color = color;
    setPillars([...pillars]);
    await sleep(speed);
  };

  const swap = async (i, j) => {
    const temp = pillars[i];
    pillars[i] = pillars[j];
    pillars[j] = temp;
    await updateColor(pillars[i], 'gray');
  };

  const sort = async () => {
    isStopped[0] = false;
    for (let i = 0; i < pillars.length; i++) {
      if(isStopped[0]) break;
      let j = i;
      await updateColor(pillars[i], 'aqua');
      if (i + 1 < pillars.length)
        await updateColor(pillars[i + 1], 'purple');

      while (j > 0 && pillars[j].val < pillars[j - 1].val) {
      if(isStopped[0]) break;
        if (j - 1 !== i)
          await updateColor(pillars[j - 1], 'greenyellow');
        await swap(j, j - 1);
        j--;
      }
      if (j >= 0) await updateColor(pillars[j], 'gray');
    }
  };

  const onSpeedChange = (event) => {
    speed[0] = parseInt(event.target.value);
  };

  const onStop = () => {
    isStopped[0] = true;
  };

  const onPillarCountChanged = (event) => {
    const pillarCount = parseInt(event.target.value);
    setCount(pillarCount);
    setPillars(getPillars(pillarCount));
  };

  return (
    <div className="app">

      <h1>Insertion Sort Algorithm</h1>

      <div className="container">
        {pillars.map((pillar, idx) => (
          <div className="pillar"
            key={`${idx}-${pillar.val}`}
            style={getPillarStyles(pillar)}>
          </div>))}
      </div>

      <div className="input-container">
        <label htmlFor="speed-range">Speed</label>
        <input id="speed-range"
          type="range"
          min="0"
          max="1000"
          step="5"
          value={speed}
          onChange={onSpeedChange}>
        </input>

        <label htmlFor="count-range">Count</label>
        <input id="count-range"
          type="range"
          min={`${MIN_PILLAR_COUNT}`}
          max={`${MAX_PILLAR_COUNT}`}
          step="1"
          value={count}
          onChange={onPillarCountChanged}>
        </input>

        <button onClick={sort}>Sort</button>
        <button onClick={onStop}>Stop</button>
      </div>
    </div>
  );
}