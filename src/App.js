import { useEffect, useState } from 'react';

function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}

function App() {

  const [pillars, setPillars] = useState([]);

  useEffect(() => {
  }, [pillars]);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const SLEEP_TIME = 100;

  const selectionSort = async () => {
    clearAll();
    for (let i = 0; i < pillars.length; i++) {
      let minIdx = i;
      pillars[i].color = 'blue';
      setPillars([...pillars]);
      await sleep(SLEEP_TIME);
      for (let j = i + 1; j < pillars.length; j++) {
        if(j-1 !== i && minIdx != j-1) {
          pillars[j - 1].color = 'gray';
          setPillars([...pillars]);
        }
        if (pillars[minIdx].val > pillars[j].val) {
          if(minIdx !== i) pillars[minIdx].color = 'gray';
          minIdx = j;
          pillars[j].color = 'orange';
        } else {
          pillars[j].color = 'yellow';
        }
        setPillars([...pillars]);
        await sleep(SLEEP_TIME);
      }
      pillars[pillars.length - 1].color = 'gray';
      const temp = pillars[minIdx];
      pillars[minIdx] = pillars[i];
      pillars[i] = temp;
      pillars[minIdx].color = 'gray';
      pillars[i].color = 'green';
      setPillars([...pillars]);
      await sleep(SLEEP_TIME);
    }
    clearAll();
    await sleep(SLEEP_TIME);
    for(let i=0; i<pillars.length; i++) {
      pillars[i].color = 'green'
      setPillars([...pillars]);
      await sleep(SLEEP_TIME);
    }
  };


  const bubbleSort = async () => {
    clearAll();
    for(let i=0; i<pillars.length; i++) {
      for(let j=0; j<pillars.length-i-1;j++) {
        if(j-1>=0) pillars[j-1].color = 'gray';
        pillars[j].color = 'blue';
        setPillars([...pillars]);
        await sleep(SLEEP_TIME);
        if(pillars[j].val > pillars[j+1].val) {
          pillars[j+1].color = 'green';
          setPillars([...pillars]);
          await sleep(SLEEP_TIME);
          const temp = pillars[j+1];
          pillars[j+1] = pillars[j];
          pillars[j] = temp;
          pillars[j].color = 'gray';
        } else {
          pillars[j].color = 'gray';
          pillars[j+1].color = 'red';
          setPillars([...pillars]);
          await sleep(SLEEP_TIME);
        }
      }
      pillars[pillars.length-i-1].color = 'green';
    }
    clearAll();
    await sleep(SLEEP_TIME);
    for(let i=0; i<pillars.length; i++) {
      pillars[i].color = 'green'
      setPillars([...pillars]);
      await sleep(SLEEP_TIME);
    }
  };

  const clearAll = () => {
    setPillars(pillars.map(pillar => pillar.color = 'gray'));
  };

  const initPillars = () => {
    let newPillars = [];
    for(let i=0; i<10; i++) newPillars.push({val: randomInt(8, 50), color: 'gray'});
    setPillars(newPillars);
  };

  return (
    <div className="app">
      <button onClick={selectionSort}>Selection Sort</button>
      <button onClick={bubbleSort}>Bubble Sort</button>
      <button onClick={initPillars}>Init me</button>
      <div className="container">
        {pillars.map(pillar => <Pillar value={pillar.val} color={pillar.color}></Pillar>)}
      </div>
    </div>
  );
}

function Pillar(props) {

  return (
    <div className="pillar" style={{ height: props.value * 7, width: 30, backgroundColor: props.color }}>
      <h3 style={{ textAlign: 'center' }}>
        {props.value}
      </h3>
    </div>
  );
}

export default App;
