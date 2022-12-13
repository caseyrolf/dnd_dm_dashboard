import React, { useEffect } from "react";
import './App.css';
import DiceWidget from './widgets/DiceWidget.js';
import CombatWidget from './widgets/CombatWidget.js';
import PlayerCardList from './widgets/PlayerCardList';
import EnemyCardList from './widgets/EnemyCardList';
import {retrieveCharacterList, retrieveEnemyList} from './dataRetriever.js';

function App() {

  const [activeTab, setActiveTab] = React.useState("Characters");
  const [appData, setAppData] = React.useState({
    hasDataRetrieved: false,
    characterList: [],
    enemyList: []
  });

  useEffect(() => {
    retrieveCharacterList().then((characterData) => {
      setAppData({
        characterList: characterData        
      });
      retrieveEnemyList().then((enemyData) => {
        setAppData(current => ({
          ...current,
          enemyList: enemyData,
          hasDataRetrieved: true        
        }));
      })
    });
  }, []);

  const updateCharacterList = (newCharacterList) => {
    setAppData(current => ({
      ...current,
       characterList: newCharacterList
    }));
  }

  const updateEnemyList = (newEnemyList) => {
    setAppData(current => ({
      ...current,
       enemyList: newEnemyList
    }));
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dungeons and Dragons DM Dashboard</h1>
      </header>
      <button className={`header-button ${activeTab==="Characters" ? "active" : ""}`} onClick={() => setActiveTab("Characters")}>Characters</button>
      <button className={`header-button ${activeTab==="Enemies" ? "active" : ""}`} onClick={() => setActiveTab("Enemies")}>Enemies</button>
      <button className={`header-button ${activeTab==="NPCs" ? "active" : ""}`} onClick={() => setActiveTab("NPCs")}>NPCs</button>
      <button className={`header-button ${activeTab==="Combat" ? "active" : ""}`} onClick={() => setActiveTab("Combat")}>Combat</button>
      <button className={`header-button ${activeTab==="Dice" ? "active" : ""}`} onClick={() => setActiveTab("Dice")}>Dice Roll</button>
      <div className="tab-container">
        <div className={`${activeTab==="Characters" ? "" : "hidden"}`}>
          {appData.hasDataRetrieved && <PlayerCardList characterList={appData.characterList} updateParentCharacterList={updateCharacterList}/>}
        </div>
        <div className={`${activeTab==="Enemies" ? "" : "hidden"}`}>
          {appData.hasDataRetrieved && <EnemyCardList enemyList={appData.enemyList} updateParentEnemyList={updateEnemyList}/>}
        </div>
        <div className={`${activeTab==="Combat" ? "" : "hidden"}`}>
          {appData.hasDataRetrieved && <CombatWidget characterList={appData.characterList} enemyList={appData.enemyList} />}
        </div>
        <div className={`${activeTab==="Dice" ? "" : "hidden"}`}>
          <DiceWidget />
        </div>
      </div>
  {/*<ActiveCard />*/}
    </div>
  );
}

export default App;
