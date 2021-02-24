import './App.css';
import Board from "./components/Board"


function App() {
    return (
      <div className="App">
          <div style={{width: "fit-content"}}>
            <p className="at">Created by: <a href="https://github.com/spencerlepine">@SpencerLepine</a></p>
            <Board />
          </div>
      </div>
    );
}

export default App;
