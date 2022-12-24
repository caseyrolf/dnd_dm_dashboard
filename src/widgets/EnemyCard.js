import React from 'react';
import CharacterImage from '../CharacterImage.png';
import {saveEnemy, deleteEnemy} from '../dataRetriever.js';

class EnemyCard extends React.Component {
    
    calculateMod = (abilityVal) => {
        let modVal = Math.floor(abilityVal/2)-5;
        let modStr = (modVal > 0)? "+" + modVal : modVal;
        return modStr;
    }

    updateEnemy = ({target: {name, value}}) => {
        let enemyObj = {
            ...this.props.enemy,
            [name]: value
        }
        this.props.updateEnemy(enemyObj);
        saveEnemy(this.props.enemy._id, enemyObj);
    }

    updateEnemyActive = (event) => {
        let enemyObj = {
            ...this.props.enemy,
            active: event.target.checked
        }
        this.props.updateEnemy(enemyObj);
        saveEnemy(this.props.enemy._id, enemyObj);
    }

    deleteEnemyCard = () => {
        deleteEnemy(this.props.enemy._id).then(() => {
            this.props.removeEnemy(this.props.enemy._id);
        });
    }

    render() {
        return (
            <div className='player-card'>
                <div className='player-name'>
                    <input className="name-input" type="text" onChange={this.updateEnemy} value={this.props.enemy.name} name="name"/>
                    <button className='delete-button' onClick={this.deleteEnemyCard}>X</button>
                    <button className='delete-button' onClick={() => {this.props.duplicateEnemy(this.props.enemy._id)}} >Duplicate</button>
                </div>
                <label className="switch">
                    Active
                    <input type="checkbox" checked={this.props.enemy.active} name="active" onChange={this.updateEnemyActive} />
                    <span className="slider round"></span>
                </label>
                <div className='player-bio'>
                    Lv <input className="level-input" type="number" onChange={this.updateEnemy} value={this.props.enemy.level} name="level"/> 
                    <input type="text" className="string-input" name="gender" onChange={this.updateEnemy} value={this.props.enemy.gender} /> 
                    <input type="text" className="string-input" name="race" onChange={this.updateEnemy} value={this.props.enemy.race} /> 
                    <input type="text" className="string-input" name="class" onChange={this.updateEnemy} value={this.props.enemy.class} />
                </div>
                <img src={CharacterImage} alt="Enemy" />
                <div className='player-ability-stats'>
                    <table>
                        <tbody>
                            <tr>
                                <td>STR</td>
                                <td><input className="stat-input" type="number" onChange={this.updateEnemy} value={this.props.enemy.strength} name="strength"/></td>
                                <td>{this.calculateMod(this.props.enemy.strength)}</td>
                            </tr>
                            <tr>
                                <td>DEX</td>
                                <td><input className="stat-input" type="number" onChange={this.updateEnemy} value={this.props.enemy.dexterity} name="dexterity"/></td>
                                <td>{this.calculateMod(this.props.enemy.dexterity)}</td>
                            </tr>
                            <tr>
                                <td>CON</td>
                                <td><input className="stat-input" type="number" onChange={this.updateEnemy} value={this.props.enemy.constitution} name="constitution"/></td>
                                <td>{this.calculateMod(this.props.enemy.constitution)}</td>
                            </tr>
                            <tr>
                                <td>INT</td>
                                <td><input className="stat-input" type="number" onChange={this.updateEnemy} value={this.props.enemy.intelligence} name="intelligence"/></td>
                                <td>{this.calculateMod(this.props.enemy.intelligence)}</td>
                            </tr>
                            <tr>
                                <td>WIS</td>
                                <td><input className="stat-input" type="number" onChange={this.updateEnemy} value={this.props.enemy.wisdom} name="wisdom"/></td>
                                <td>{this.calculateMod(this.props.enemy.wisdom)}</td>
                            </tr>
                            <tr>
                                <td>CHA</td>
                                <td><input className="stat-input" type="number" onChange={this.updateEnemy} value={this.props.enemy.charisma} name="charisma"/></td>
                                <td>{this.calculateMod(this.props.enemy.charisma)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="player-active-stats">
                    <div>
                        <label>
                            Hit Points
                            <input type="number" name="hp_current" onChange={this.updateEnemy} value={this.props.enemy.hp_current} />
                        </label>
                        <span className="hp-max">/ <input type="number" name="hp_max" onChange={this.updateEnemy} value={this.props.enemy.hp_max} /></span>
                    </div>
                    <div>
                        <label>
                            AC
                            <input type="number" name="ac" onChange={this.updateEnemy} value={this.props.enemy.ac} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Initiative
                            <input type="number" name="initiative" onChange={this.updateEnemy} value={this.props.enemy.initiative} />
                        </label>
                    </div>
                </div>
                <textarea className="enemy-notes" placeholder="Notes" rows="8" cols="30" value={this.props.enemy.notes} onChange={this.updateEnemy} name="notes" />
            </div>
        );
    }
}

export default EnemyCard;