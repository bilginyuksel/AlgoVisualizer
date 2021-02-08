import { useState, useEffect } from 'react';
import { getPillars, getPillar, sleep, getPillarStyles , MAX_PILLAR_COUNT, MIN_PILLAR_COUNT } from './Utils';

export default function CountingSort() {
  const [pillars, setPillars] = useState(getPillars(8));
  const [freqPillars, setFreqPillars] = useState([]);
  const [count, setCount] = useState(10);
  const [speed, setSpeed] = useState([150]);
  const [isStopped, stop] = useState([true]);

  useEffect(() => {

  }, [pillars, freqPillars]);

  const updateColor = async (pillar, color) => {
    pillar.color = color;
    setPillars([...pillars]);
    await sleep(speed);
  };

  const getMaxValOfPillar = () => {
    let max = pillars[0].val;
    pillars.forEach(pillar => {
      if(pillar.val > max) {
        max = pillar.val;
      }
    });
    return max;
  };

  const sort = async () => {
    isStopped[0] = false;
    const maxFreq = getMaxValOfPillar(); 
    for (let i = 0; i <= maxFreq; i++)
      freqPillars.push({ ...getPillar(i), 'freq': 0 });
    setFreqPillars([...freqPillars]);

    for (let i = 0; i < pillars.length; i++) {
      if (isStopped[0]) break;
      await updateColor(freqPillars[pillars[i].val], 'green');
      freqPillars[pillars[i].val].freq++;
      await updateColor(freqPillars[pillars[i].val], 'gray');
    }
    let idx = 0;
    for (let i = 0; i < freqPillars.length; i++) {
      if (isStopped[0]) break;
      let currentFreq = freqPillars[i].freq;
      while (currentFreq-- > 0) {
        if (isStopped[0]) break;
        pillars[idx].val = i;
        await updateColor(pillars[idx], 'green');
        idx++;
      }
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

      <h1>Counting Sort Algorithm</h1>

      <div className="container">
        {pillars.map((pillar, idx) => (
          <div className="pillar"
            key={`${idx}-${pillar.val}`}
            style={getPillarStyles(pillar)}>
          </div>))}
      </div>

      <div className="container">
        {freqPillars.map((freqPillar, idx) => (
          <div>
            {freqPillar.freq}
            <div className="pillar"
              key={`${idx}-${freqPillar.val}-${freqPillar.freq}`}
              style={getPillarStyles(freqPillar)}>
            </div>
          </div>
        ))}
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