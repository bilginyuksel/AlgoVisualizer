import { useState, useEffect } from 'react';
import { getPillars, sleep, getPillarStyles } from './Utils';


export default function BubbleSort() {
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
  };


  const sort = async () => {
    isStopped[0] = false;
    for (let i = 0; i < pillars.length; i++) {
      if (isStopped[0]) break;
      for (let j = 0; j < pillars.length - 1 - i; j++) {
        if (isStopped[0]) break;
        if(j-1>=0) pillars[j-1].color = 'gray';
        await updateColor(pillars[j], 'blue');
        if (pillars[j].val > pillars[j + 1].val) {
          await updateColor(pillars[j+1], 'green');
          await swap(j, j + 1);
        } else {
          await updateColor(pillars[j+1], 'red')
        } 
      }
      const currentLastIdx = pillars.length - 1 - i;
      if(currentLastIdx - 1 > 0) await updateColor(pillars[currentLastIdx-1], 'gray');
      await updateColor(pillars[currentLastIdx], 'green');
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

      <h1>Bubble Sort Algorithm</h1>

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