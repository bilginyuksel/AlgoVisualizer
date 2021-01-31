import { useEffect, useState } from 'react';

function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}
function randomPillars(value) {
  let newPillars = [];
  for(let i=0; i<value; i++) newPillars.push({val: randomInt(8, 50), color: 'gray'});
  return newPillars;
};



function App() {

  const [pillars, setPillars] = useState(randomPillars(10));
  const [rangeValue, setRangeValue] = useState(10);
  const [speed, setSpeed] = useState([150]);
  
  const sleep = () => {
    return new Promise(resolve => setTimeout(resolve, speed[0]));
  };

  useEffect(() => {
  }, [pillars, speed]);


  const updateColorSleep = async (idx, color) => {
    pillars[idx].color = color;
    setPillars([...pillars]);
    await sleep();
  };
  
  const updateColor = (idx, color) => {
    pillars[idx].color = color;
    setPillars([...pillars]);
  };

  const selectionSort = async () => {
    clearAll();
    for (let i = 0; i < pillars.length; i++) {
      let minIdx = i;
      await updateColorSleep(i, 'blue');
      for (let j = i + 1; j < pillars.length; j++) {
        if(j-1 !== i && minIdx !== j-1) {
          updateColor(j-1, 'gray');
        }
        if (pillars[minIdx].val > pillars[j].val) {
          if(minIdx !== i) pillars[minIdx].color = 'gray';
          minIdx = j;
          pillars[j].color = 'orange';
        } else {
          pillars[j].color = 'yellow';
        }
        setPillars([...pillars]);
        await sleep();
      }
      pillars[pillars.length - 1].color = 'gray';
      const temp = pillars[minIdx];
      pillars[minIdx] = pillars[i];
      pillars[i] = temp;
      pillars[minIdx].color = 'gray';
      await updateColorSleep(i, 'green');
    }
    controlSorted();
  };


  const bubbleSort = async () => {
    clearAll();
    for(let i=0; i<pillars.length; i++) {
      for(let j=0; j<pillars.length-i-1;j++) {
        if(j-1>=0) pillars[j-1].color = 'gray';
        await updateColorSleep(j, 'blue');
        if(pillars[j].val > pillars[j+1].val) {
          await updateColorSleep(j+1, 'green');
          const temp = pillars[j+1];
          pillars[j+1] = pillars[j];
          pillars[j] = temp;
          pillars[j].color = 'gray';
        } else {
          pillars[j].color = 'gray';
          pillars[j+1].color = 'red';
          setPillars([...pillars]);
          await sleep();
        }
      }
      pillars[pillars.length-i-1].color = 'green';
    }
    controlSorted();
  };

  const insertionSort = async () => {
    clearAll();
    for(let i=1; i<pillars.length; i++) {
      let idx = i;
      while(idx>0 && pillars[idx].val < pillars[idx-1].val) {
        let temp = pillars[idx];
        pillars[idx] = pillars[idx-1];
        pillars[idx-1] = temp;
        pillars[idx].color = 'gray';
        pillars[idx-1].color = 'orange';
        setPillars([...pillars]);
        await sleep();
        idx--;
      }
    }
    controlSorted();
  };

  const controlSorted = async () => {
    clearAll();
    await sleep();
    for(let i=0; i<pillars.length; i++) {
      await updateColorSleep(i, 'green');
    }
  }

  const clearAll = () => {
    setPillars(pillars.map(pillar => pillar.color = 'gray'));
  };

  const rangeOnChange = (value) => {
    setRangeValue(value);
    setPillars(randomPillars(value));
  };

  const speedOnChange = (value) => {
    speed[0] = parseInt(value);
    setPillars([...pillars]);
  };

  return (
    <div className="app">
      <div className="input-container">
        <label htmlFor="array-length">Length</label>
        <input id="array-length" style={{verticalAlign:'middle'}} type="range" min="5" max="90" value={rangeValue} onChange={(event) => rangeOnChange(event.target.value)}></input>
        <button onClick={selectionSort}>Selection Sort</button>
        <button onClick={bubbleSort}>Bubble Sort</button>
        <button onClick={insertionSort}>Insertion Sort</button>
        <label htmlFor="speed">Speed</label>
        <input id="speed" style={{verticalAlign:'middle'}} type="range" min="10" max="1000" step="10" value={speed} onChange={(event) => speedOnChange(event.target.value)}></input>
      </div>
      <div className="container">
        {pillars.map((pillar, idx) => <Pillar key={`${idx}-${pillar.val}`} value={pillar.val} color={pillar.color}></Pillar>)}
      </div>
    </div>
  );
}

function Pillar(props) {

  return (
    <div className="pillar" style={{ height: props.value * 7, width: 10, backgroundColor: props.color }}>
    </div>
  );
}

export default App;
