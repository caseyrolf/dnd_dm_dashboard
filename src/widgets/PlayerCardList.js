import React from 'react';
import PlayerCard from './PlayerCard.js';
import {retrieveCharacterList, createCharacter} from '../dataRetriever.js';

class PlayerCardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            characterList: []
        };
    }

    componentDidMount() {
        retrieveCharacterList().then((characterData) => {
            this.setState({
                characterList: characterData
            });
        });
    };

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
        });
    }

    render() {
        let playerCardList = this.state.characterList.map((character, index)=>{
            return <PlayerCard key={character._id} {...character} removeCharacter={this.removeCharacter}/>;
        });
        return (
            <div>
                <button onClick={this.addCharacter}>Add Character</button>
                {playerCardList}
            </div>
        );
    }
}

export default PlayerCardList;