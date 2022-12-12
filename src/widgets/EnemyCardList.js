import React from 'react';
import PlayerCard from './PlayerCard.js';
import {createCharacter} from '../dataRetriever.js';

class PlayerCardList extends React.Component {
    let 
    
    constructor(props) {
        super(props);
        this.state = {
            characterList: this.props.characterList
        }     
    }
    addCharacter = () => {
        let newCharacter = {
            name: "",
            level: 0,
            gender: "",
            race: "",
            class: "",
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0,
            hp_current: 0,
            hp_max: 0,
            ac: 0
        };
        createCharacter(newCharacter).then((characterData) => {
            console.log(characterData);
            this.setState(currentState => ({
                characterList: [...currentState.characterList,
                    {
                        _id: characterData._id,
                        name: "",
                        level: 0,
                        gender: "",
                        race: "",
                        class: "",
                        strength: 0,
                        dexterity: 0,
                        constitution: 0,
                        intelligence: 0,
                        wisdom: 0,
                        charisma: 0,
                        hp_current: 0,
                        hp_max: 0,
                        ac: 0
                    }
                ]
            }));
        });
        
    }

    removeCharacter = (id) => {
        this.setState({
            characterList: this.state.characterList.filter(character => character._id !== id)
        }, () => {
            this.props.updateParentCharacterList(this.characterList);
        });
    }

    updateCharacter = (updatedCharacter) => {
        let newCharacterList = this.state.characterList.map(character => {
            if (character._id === updatedCharacter._id) {
                return updatedCharacter;
            }
            return character;
        });
        this.setState({characterList: newCharacterList});
        this.props.updateParentCharacterList(newCharacterList);
    }

    render() {
        let playerCardList = this.state.characterList.map((character, index)=>{
            return <PlayerCard key={character._id} {...character} removeCharacter={this.removeCharacter} updateParentCharacter={this.updateCharacter} />;
        });
        return (
            <div>
                <button className="add-button" onClick={this.addCharacter}>Add Character</button>
                {playerCardList}
            </div>
        );
    }
}

export default PlayerCardList;