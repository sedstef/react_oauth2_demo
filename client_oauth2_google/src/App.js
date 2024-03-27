import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function App() {
  const [greeting, setGreeting] = useState();

  function fetchGreeting(){
      //const API_BASEURL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : '';
    const API_BASEURL = 'localhost:8080'
        fetch(`${API_BASEURL}/api/v1/hello`, {
        method: 'GET',
        headers: {
          //Authorization: `Bearer ${user.access_token}`,
          Accept: 'application/json'
        }
      })
          .then(response => response.json())
          .then(data => setGreeting(data.content))
          .catch((error) => console.log('ERROR in get greeting: ' + error));
  }


  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchGreeting}>Greeting</button>

        <h1>{greeting}</h1>

        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
