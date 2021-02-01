
export default function InputController({ speed, length, algorithm, isStopped }) {
  const [speed, setSpeed] = useState(speed);
  const [length, setLength] = useState(length);
  const [isStopped, stop] = useState(isStopped);

  const onLengthChange = (event) => {
    const newLength = parseInt(event.target.value);
    setLength(newLength);
  };

  const onSpeedChange = (event) => {
    const newSpeed = parseInt(event.target.value);
    setSpeed(newSpeed);
  };

  const onStop = () => {
    isStopped[0] = true;
  };

  return (
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

      <label htmlFor="length-range">Count</label>
      <input id="length-range"
        type="range"
        min="6"
        max="80"
        step="1"
        value={length}
        onChange={onLengthChange}>
      </input>

      <button onClick={algorithm}>Sort</button>
      <button onClick={onStop}>Stop</button>
    </div>
  );
}