import React, { useEffect } from "react";
import './App.css';
import DiceWidget from './widgets/DiceWidget.js';
import CombatWidget from './widgets/CombatWidget.js';
import PlayerCardList from './widgets/PlayerCardList';
import EnemyCardList from './widgets/EnemyCardList';
import NPCCardList from './widgets/NPCCardList';
import QuestTracker from "./widgets/QuestTracker";
import {retrieveCharacterList, retrieveEnemyList, retrieveNPCList, retrieveQuestList} from './dataRetriever.js';

function App() {

  const [activeTab, setActiveTab] = React.useState("Characters");
  const [appData, setAppData] = React.useState({
    hasDataRetrieved: false,
    characterList: [],
    enemyList: [],
    NPCList: []
  });

  useEffect(() => {
    retrieveCharacterList().then((characterData) => {
      setAppData({
        characterList: characterData        
      });
      retrieveEnemyList().then((enemyData) => {
        setAppData(current => ({
          ...current,
          enemyList: enemyData        
        }));
        retrieveNPCList().then((NPCData) => {
          setAppData(current => ({
            ...current,
            NPCList: NPCData     
          }));
          retrieveQuestList().then((questData) => {
            setAppData(current => ({
              ...current,
              questList: questData,
              hasDataRetrieved: true        
            }));
          });
        });
      });
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

  const updateNPCList = (newNPCList) => {
    setAppData(current => ({
      ...current,
       NPCList: newNPCList
    }));
  }

  const resetInitiative = () => {
    let characterList = appData.characterList.map((character) => {
      return {
        ...character,
        initiative: 0
      };
    });

    let enemyList = appData.enemyList.map((enemy) => {
      return {
        ...enemy,
        initiative: 0
      };
    });

    setAppData(current => ({
      ...current,
      characterList: characterList,
      enemyList: enemyList
    }));

    //Save to DB
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
      <button className={`header-button ${activeTab==="Quests" ? "active" : ""}`} onClick={() => setActiveTab("Quests")}>Quests</button>
      <button className={`header-button ${activeTab==="Dice" ? "active" : ""}`} onClick={() => setActiveTab("Dice")}>Dice Roll</button>
      <div className="tab-container">
        <div className={`${activeTab==="Characters" ? "" : "hidden"}`}>
          {appData.hasDataRetrieved && <PlayerCardList characterList={appData.characterList} updateCharacterList={updateCharacterList}/>}
        </div>
        <div className={`${activeTab==="Enemies" ? "" : "hidden"}`}>
          {appData.hasDataRetrieved && <EnemyCardList enemyList={appData.enemyList} updateEnemyList={updateEnemyList}/>}
        </div>
        <div className={`${activeTab==="NPCs" ? "" : "hidden"}`}>
          {appData.hasDataRetrieved && <NPCCardList NPCList={appData.NPCList} updateNPCList={updateNPCList}/>}
        </div>
        <div className={`${activeTab==="Combat" ? "" : "hidden"}`}>
          {appData.hasDataRetrieved && <CombatWidget characterList={appData.characterList} enemyList={appData.enemyList} resetInitiative={resetInitiative} />}
        </div>
        <div className={`${activeTab==="Quests" ? "" : "hidden"}`}>
          {appData.hasDataRetrieved && <QuestTracker questList={appData.questList} />}
        </div>
        <div className={`${activeTab==="Dice" ? "" : "hidden"}`}>
          <DiceWidget />
        </div>
      </div>
    </div>
  );
}

export default App;
