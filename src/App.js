import './App.css';
import DiceWidget from './widgets/DiceWidget.js';
import PlayerCardList from './widgets/PlayerCardList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dungeons and Dragons DM Dashboard</h1>
      </header>
      <DiceWidget />
      <PlayerCardList />
  {/*<ActiveCard />*/}
    </div>
  );
}

export default App;
