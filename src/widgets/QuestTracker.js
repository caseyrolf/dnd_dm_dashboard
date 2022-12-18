import React from 'react';
import {createQuest, saveQuest, deleteQuest} from '../dataRetriever.js';

class QuestTracker extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            questList: this.props.questList
        }     
    }
    addQuest = () => {
        createQuest().then((questData) => {
            this.setState(currentState => ({
                questList: [...currentState.questList,
                    {
                        _id: questData._id,
                        quest_text: ""
                    }
                ]
            }));
        });   
    }

    removeQuest = (id) => {
        this.setState({
            questList: this.state.questList.filter(quest => quest._id !== id)
        });
        deleteQuest(id);
    }

    updateQuest = (questId, questText) => {
        let newQuestList = this.state.questList.map(quest => {
            if (quest._id === questId) {
                quest.quest_text = questText;
            }
            return quest;
        });
        this.setState({questList: newQuestList});
        saveQuest(questId, {quest_text: questText});
    }

    render() {
        let questList = this.state.questList.map((quest, index)=>{
            return (<div key={index}>
                <span className="notes-label" >Quest {index+1}: </span>
                <textarea rows="3" cols="50" placeholder="Quest Notes" value={quest.quest_text} onChange={(event) => this.updateQuest(quest._id, event.target.value)} />
                <button className='delete-quest-button' onClick={() => {this.removeQuest(quest._id)}}>X</button>
            </div>);
        });
        return (
            <div>
                <button className="add-button" onClick={this.addQuest}>Add Quest</button>
                {questList}
            </div>
        );
    }
}

export default QuestTracker;