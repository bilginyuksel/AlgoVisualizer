import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import BubbleSort from './sort/BubbleSort';
import CountingSort from './sort/CountingSort';
import InsertionSort from './sort/InsertionSort';
import SelectionSort from './sort/SelectionSort';

function App() {

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/selsort">Selection Sort</Link>
          </li>
          <li>
            <Link to="/bubsort">Bubble Sort</Link>
          </li>
          <li>
            <Link to="/inssort">Insertion Sort</Link>
          </li>
          <li>
            <Link to="/consort">Counting Sort</Link>
          </li>
        </ul>

      <Switch>
        <Route path='/selsort'>
          <SelectionSort />
        </Route>
        <Route path='/bubsort'>
          <BubbleSort />
        </Route>
        <Route path='/inssort'>
          <InsertionSort />
        </Route>
        <Route path='/consort'>
          <CountingSort />
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;