import React from 'react';
import CharacterImage from '../CharacterImage.png';
import {saveEnemy, deleteEnemy} from '../dataRetriever.js';

class EnemyCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            gender: this.props.gender,
            race: this.props.race,
            class: this.props.class,
            level: this.props.level,
            str: {val: this.props.strength, mod: this.calculateMod(this.props.strength)},
            dex: {val: this.props.dexterity, mod: this.calculateMod(this.props.dexterity)},
            con: {val: this.props.constitution, mod: this.calculateMod(this.props.constitution)},
            int: {val: this.props.intelligence, mod: this.calculateMod(this.props.intelligence)},
            wis: {val: this.props.wisdom, mod: this.calculateMod(this.props.wisdom)},
            cha: {val: this.props.charisma, mod: this.calculateMod(this.props.charisma)},
            hp: {current: this.props.hp_current, max: this.props.hp_max},
            ac: this.props.ac,
            init: 0,
            notes: this.props.notes
        };
    }

    calculateMod = (abilityVal) => {
        let modVal = Math.floor(abilityVal/2)-5;
        let modStr = (modVal > 0)? "+" + modVal : modVal;
        return modStr;
    }

    handleAbilityChange = ({target: {name, value}}) => {
        this.setState({
            [name]: {val: value, mod: this.calculateMod(value)}
        }, () =>{
            this.props.updateParentEnemy({_id: this.props._id, ...this.state});
            saveEnemy(this.props._id, this.buildEnemyObj());
        });
        //save to db
    }

    handleHPChange = ({target: {name, value}}) => {
        this.setState({
            hp: {...this.state.hp, [name]: value}
        }, () =>{
            this.props.updateParentEnemy({_id: this.props._id, ...this.state});
            saveEnemy(this.props._id, this.buildEnemyObj());
        });
        //save to db
    }

    handleSimpleStatChange = ({target: {name, value}}) => {
        this.setState({
            [name]: value
        }, () =>{
            this.props.updateParentEnemy({_id: this.props._id, ...this.state});
            saveEnemy(this.props._id, this.buildEnemyObj());
        });
    }

    buildEnemyObj = () => {
        let enemy = {
            name: this.state.name,
            level: this.state.level,
            gender: this.state.gender,
            race: this.state.race,
            class: this.state.class,
            strength: this.state.str.val,
            dexterity: this.state.dex.val,
            constitution: this.state.con.val,
            intelligence: this.state.int.val,
            wisdom: this.state.wis.val,
            charisma: this.state.cha.val,
            hp_current: this.state.hp.current,
            hp_max: this.state.hp.max,
            ac: this.state.ac,
            notes: this.state.notes
        }
        return enemy;
    }

    deleteEnemyCard = () => {
        deleteEnemy(this.props._id).then(() => {
            this.props.removeEnemy(this.props._id);
        });
    }

    render() {
        return (
            <div className='player-card'>
                <div className='player-name'>
                    <input className="name-input" type="text" onChange={this.handleSimpleStatChange} value={this.state.name} name="name"/>
                    <button className='delete-button' onClick={this.deleteEnemyCard}>X</button>
                </div>
                <div className='player-bio'>
                    Lv <input className="level-input" type="number" onChange={this.handleSimpleStatChange} value={this.state.level} name="level"/> 
                    <input type="text" className="string-input" name="gender" onChange={this.handleSimpleStatChange} value={this.state.gender} /> 
                    <input type="text" className="string-input" name="race" onChange={this.handleSimpleStatChange} value={this.state.race} /> 
                    <input type="text" className="string-input" name="class" onChange={this.handleSimpleStatChange} value={this.state.class} />
                </div>
                <img src={CharacterImage} alt="Enemy" />
                <div className='player-ability-stats'>
                    <table>
                        <tbody>
                            <tr>
                                <td>STR</td>
                                <td><input className="stat-input" type="number" onChange={this.handleAbilityChange} value={this.state.str.val} name="str"/></td>
                                <td>{this.state.str.mod}</td>
                            </tr>
                            <tr>
                                <td>DEX</td>
                                <td><input className="stat-input" type="number" onChange={this.handleAbilityChange} value={this.state.dex.val} name="dex"/></td>
                                <td>{this.state.dex.mod}</td>
                            </tr>
                            <tr>
                                <td>CON</td>
                                <td><input className="stat-input" type="number" onChange={this.handleAbilityChange} value={this.state.con.val} name="con"/></td>
                                <td>{this.state.con.mod}</td>
                            </tr>
                            <tr>
                                <td>INT</td>
                                <td><input className="stat-input" type="number" onChange={this.handleAbilityChange} value={this.state.int.val} name="int"/></td>
                                <td>{this.state.int.mod}</td>
                            </tr>
                            <tr>
                                <td>WIS</td>
                                <td><input className="stat-input" type="number" onChange={this.handleAbilityChange} value={this.state.wis.val} name="wis"/></td>
                                <td>{this.state.wis.mod}</td>
                            </tr>
                            <tr>
                                <td>CHA</td>
                                <td><input className="stat-input" type="number" onChange={this.handleAbilityChange} value={this.state.cha.val} name="cha"/></td>
                                <td>{this.state.cha.mod}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="player-active-stats">
                    <div>
                        <label>
                            Hit Points
                            <input type="number" name="current" onChange={this.handleHPChange} value={this.state.hp.current} />
                        </label>
                        <span className="hp-max">/ <input type="number" name="max" onChange={this.handleHPChange} value={this.state.hp.max} /></span>
                    </div>
                    <div>
                        <label>
                            AC
                            <input type="number" name="ac" onChange={this.handleSimpleStatChange} value={this.state.ac} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Initiative
                            <input type="number" name="init" onChange={this.handleSimpleStatChange} value={this.state.init} />
                        </label>
                    </div>
                </div>
                <textarea className="enemy-notes" placeholder="Notes" rows="8" cols="30" value={this.state.notes} onChange={this.handleSimpleStatChange} name="notes" />
            </div>
        );
    }
}

export default EnemyCard;