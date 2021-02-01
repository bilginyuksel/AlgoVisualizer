import { useState, useEffect } from 'react';
import { getPillars, sleep, getPillarStyles, AlgoRunner } from './Utils';

class SelectionSortAlgoRunner extends AlgoRunner {

  buildSteps(array) {

  }


}

function addColorStep(steps, index, color) {
  steps.push({'operation': 'colorize', 'index': index, 'color': color});
}

function addSwapStep(steps, firstIndex, secondIndex) {
  steps.push({'operation': 'swap', 'firstIndex': firstIndex, 'secondIndex': secondIndex});
}

export default function SelectionSort() {

  const [pillars, setPillars] = useState(getPillars(8));
  const [count, setCount] = useState(10);
  const [speed, setSpeed] = useState([150]);
  const [isStopped, stop] = useState([true]);
  const [steps, setSteps] = useState([]);
  const [record, setRecord] = useState([]);

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


  const recordAlgorithm = () => {
    const steps = [];
    const copyArr = [...pillars];
    for(let i = 0; i < copyArr.length; i++) {
      let minIdx = i;
      addColorStep(steps, i, 'aqua');
      for(let j = i+1; j < copyArr.length; j++) {
        if(j-1 !== i && minIdx !== j - 1) {
          addColorStep(steps, j-1, 'gray');
        }
        addColorStep(steps, j, 'yellow');
        if(copyArr[minIdx].val > copyArr[j].val) {
          if (minIdx !== i) addColorStep(steps, minIdx, 'gray');
          minIdx = j;
          addColorStep(steps, minIdx, 'greenyellow');
        }
      }
      addColorStep(steps, i, 'gray');
      addColorStep(steps, copyArr.length - 1, 'gray');
      addSwapStep(steps, minIdx, i);
      addColorStep(steps, i, 'green');
      const temp = copyArr[minIdx];
      copyArr[minIdx] = copyArr[i];
      copyArr[i] = temp;
    }

    console.log(steps);
    return steps;
  };

  const exec = async () => {
    const steps = recordAlgorithm();
    for(let i=0; i<steps.length; i++) {
      if(steps[i].operation === 'colorize') {
        await updateColor(pillars[steps[i].index], steps[i].color);
      } else {
        const firstIndex = steps[i].firstIndex;
        const secondIndex = steps[i].secondIndex;
        await swap(firstIndex, secondIndex);
      }

    }
  };

  const sort = async () => {
    recordAlgorithm();
    isStopped[0] = false;
    for (let i = 0; i < pillars.length; i++) {
      if (isStopped[0]) break;
      let minIdx = i;
      await updateColor(pillars[minIdx], 'aqua');
      for (let j = i + 1; j < pillars.length; j++) {
        if (isStopped[0]) break;

        if (j - 1 !== i && minIdx !== j - 1)
          pillars[j-1].color = 'gray';

        await updateColor(pillars[j], 'yellow');
        if (pillars[minIdx].val > pillars[j].val) {
          if (minIdx !== i) await updateColor(pillars[minIdx], 'gray');
          minIdx = j;
          await updateColor(pillars[minIdx], 'greenyellow');
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

        <button onClick={exec}>Sort</button>
        <button onClick={onStop}>Stop</button>
      </div>
    </div>
  );
}
