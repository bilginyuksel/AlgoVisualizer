import { useState, useEffect } from 'react';
import { getPillars, sleep, getPillarStyles } from './Utils';


export default function SelectionSort() {

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
    pillars[j].color = 'gray';
    pillars[pillars.length - 1].color = 'gray';
    const temp = pillars[i];
    pillars[i] = pillars[j];
    pillars[j] = temp;
    pillars[j].color = 'green';
    setPillars([...pillars]);
    await sleep(speed);
  };

  const sort = async () => {
    isStopped[0] = false;
    for (let i = 0; i < pillars.length; i++) {
      if (isStopped[0]) break;
      let minIdx = i;
      await updateColor(pillars[minIdx], 'aqua');
      for (let j = i + 1; j < pillars.length; j++) {
        if (isStopped[0]) break;

        if (j - 1 !== i && minIdx !== j - 1)
          await updateColor(pillars[j - 1], 'gray');

        if (pillars[minIdx].val > pillars[j].val) {
          if (minIdx !== i) await updateColor(pillars[minIdx], 'gray');
          minIdx = j;
          await updateColor(pillars[minIdx], 'greenyellow');
        } else {
          await updateColor(pillars[j], 'yellow');
        }
      }

      await swap(minIdx, i);
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

      <h1>Selection Sort Algorithm</h1>

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
          min="6"
          max="80"
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
