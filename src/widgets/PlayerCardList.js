import React from 'react';
import PlayerCard from './PlayerCard.js';
import {createCharacter} from '../dataRetriever.js';

class PlayerCardList extends React.Component {
    
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
            ac: 0,
            initiative: 0,
            active: true
        };
        createCharacter(newCharacter).then((characterData) => {
            this.props.updateCharacterList([
                ...this.props.characterList,
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
                    ac: 0,
                    initiative: 0,
                    active: true
                }
            ]);
        });
        
    }

    removeCharacter = (id) => {
        this.props.updateCharacterList(this.props.characterList.filter(character => character._id !== id));
    }

    updateCharacter = (updatedCharacter) => {
        let newCharacterList = this.props.characterList.map(character => {
            if (character._id === updatedCharacter._id) {
                return updatedCharacter;
            }
            return character;
        });
        this.props.updateCharacterList(newCharacterList);
    }

    render() {
        let playerCardList = this.props.characterList.map((character, index)=>{
            return <PlayerCard key={character._id} character={character} removeCharacter={this.removeCharacter} updateCharacter={this.updateCharacter} />;
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