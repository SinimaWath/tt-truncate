import logo from './logo.svg';
import './App.css';
import { Truncate } from 'tt-truncate';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
            <Truncate tailLength={2}>Learn React Bro!</Truncate>
        </div>
      <div style={{ width: '80%' }}>
          <Truncate tailLength={30}>
              React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.
          </Truncate>
      </div>
      </header>
    </div>
  );
}

export default App;
