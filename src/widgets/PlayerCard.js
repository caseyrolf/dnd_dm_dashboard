import React from 'react';
import CharacterImage from '../CharacterImage.png';
import {saveCharacter, deleteCharacter} from '../dataRetriever.js';

class PlayerCard extends React.Component {

    calculateMod = (abilityVal) => {
        let modVal = Math.floor(abilityVal/2)-5;
        let modStr = (modVal > 0)? "+" + modVal : modVal;
        return modStr;
    }

    updateCharacter = ({target: {name, value}}) => {
        let characterObj = {
            ...this.props.character,
            [name]: value
        }
        this.props.updateCharacter(characterObj);
        //Update mod?
        saveCharacter(this.props.character._id, characterObj);
    }

    deleteCharacterCard = () => {
        deleteCharacter(this.props.character._id).then(() => {
            this.props.removeCharacter(this.props.character._id);
        });
    }

    render() {
        return (
            <div className='player-card'>
                <div className='player-name'>
                    <input className="name-input" type="text" placeholder="Name" onChange={this.updateCharacter} value={this.props.character.name} name="name"/>
                    <button className='delete-button' onClick={this.deleteCharacterCard}>X</button>
                </div>
                <div className='player-bio'>
                    Lv <input className="level-input" type="number" onChange={this.updateCharacter} value={this.props.character.level} name="level"/> 
                    <input type="text" className="string-input" placeholder="Gender" name="gender" onChange={this.updateCharacter} value={this.props.character.gender} /> 
                    <input type="text" className="string-input" placeholder="Race" name="race" onChange={this.updateCharacter} value={this.props.character.race} /> 
                    <input type="text" className="string-input" placeholder="Class" name="class" onChange={this.updateCharacter} value={this.props.character.class} />
                </div>
                <img src={CharacterImage} alt="Character" />
                <div className='player-ability-stats'>
                    <table>
                        <tbody>
                            <tr>
                                <td>STR</td>
                                <td><input className="stat-input" type="number" onChange={this.updateCharacter} value={this.props.character.strength} name="strength"/></td>
                                <td>{this.calculateMod(this.props.character.strength)}</td>
                            </tr>
                            <tr>
                                <td>DEX</td>
                                <td><input className="stat-input" type="number" onChange={this.updateCharacter} value={this.props.character.dexterity} name="dexterity"/></td>
                                <td>{this.calculateMod(this.props.character.dexterity)}</td>
                            </tr>
                            <tr>
                                <td>CON</td>
                                <td><input className="stat-input" type="number" onChange={this.updateCharacter} value={this.props.character.constitution} name="constitution"/></td>
                                <td>{this.calculateMod(this.props.character.constitution)}</td>
                            </tr>
                            <tr>
                                <td>INT</td>
                                <td><input className="stat-input" type="number" onChange={this.updateCharacter} value={this.props.character.intelligence} name="intelligence"/></td>
                                <td>{this.calculateMod(this.props.character.intelligence)}</td>
                            </tr>
                            <tr>
                                <td>WIS</td>
                                <td><input className="stat-input" type="number" onChange={this.updateCharacter} value={this.props.character.wisdom} name="wisdom"/></td>
                                <td>{this.calculateMod(this.props.character.wisdom)}</td>
                            </tr>
                            <tr>
                                <td>CHA</td>
                                <td><input className="stat-input" type="number" onChange={this.updateCharacter} value={this.props.character.charisma} name="charisma"/></td>
                                <td>{this.calculateMod(this.props.character.charisma)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="player-active-stats">
                    <div>
                        <label>
                            Hit Points
                            <input type="number" name="hp_current" onChange={this.updateCharacter} value={this.props.character.hp_current} />
                        </label>
                        <span className="hp-max">/ <input type="number" name="hp_max" onChange={this.updateCharacter} value={this.props.character.hp_max} /></span>
                    </div>
                    <div>
                        <label>
                            AC
                            <input type="number" name="ac" onChange={this.updateCharacter} value={this.props.character.ac} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Initiative
                            <input type="number" name="initiative" onChange={this.updateCharacter} value={this.props.character.initiative} />
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}

export default PlayerCard;