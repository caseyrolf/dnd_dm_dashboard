import React from 'react';
import UpArrow from '../up-arrow.png';
import RightArrow from '../right-arrow.png';
import DownArrow from '../down-arrow.png';
import DamageIcon from '../damage-icon.png';
import { Modal, Box } from '@mui/material';
import { cloneDeep } from 'lodash';

class CombatWidget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            characterNotes: [],
            currentTurnIdx: 0,
            combatTimer: 0,
            combatTimerStr: "00:00",
            currentTurnTimer: 0,
            currentTurnTimerStr: "00:00",
            isModalOpen: false,
            damageValue: 0,
            characterInContext: 0
        }     
    }

    combatOrder = [];

    generateCombatOrder = () => {
        let characterList = this.props.characterList.filter(character => character.active === true);
        let enemyList = this.props.enemyList.filter(enemy => enemy.active === true);
        let combinedList = characterList.concat(enemyList);
        combinedList.sort((a,b) => parseInt(b.initiative) - parseInt(a.initiative));
        let combatOrder = combinedList.map((character) => {
            return({
                "name": character.name,
                "hp_current": character.hp_current,
                "hp_max": character.hp_max,
                "ac": character.ac,
                "active": character.active,
                "_id": character._id
            });
        });
        return combatOrder;
    }

    arrayEquals = (a, b) => {
        return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
    }

    changeTurn = (orderShift) => {
        let newTurnIdx = this.state.currentTurnIdx + orderShift;
        if(newTurnIdx < 0) {
            newTurnIdx = this.combatOrder.length-1;
        } else if (newTurnIdx >= this.combatOrder.length) {
            newTurnIdx = 0;
        }
        this.setState({
            currentTurnIdx: newTurnIdx,
            currentTurnTimer: new Date()
        });
    }

    startCombatTimer = () => {
        this.setState({
            combatTimer: new Date(),
            currentTurnTimer: new Date()
        }, () => {
            this.combatTimerInterval = setInterval(() => {
                let combatTimerDiff = (new Date()) - this.state.combatTimer;
                let combatTimerDiffSeconds = Math.floor(combatTimerDiff/1000);
                let combatTimerDiffMinutes = Math.floor(combatTimerDiffSeconds/60);
                combatTimerDiffSeconds = combatTimerDiffSeconds % 60;
                if (combatTimerDiffSeconds < 10) {
                    combatTimerDiffSeconds = "0" + combatTimerDiffSeconds;
                }
                if (combatTimerDiffMinutes < 10) {
                    combatTimerDiffMinutes = "0" + combatTimerDiffMinutes;
                }
                let currentTurnTimerDiff = (new Date()) - this.state.currentTurnTimer;
                let currentTurnTimerDiffSeconds = Math.floor(currentTurnTimerDiff/1000);
                let currentTurnTimerDiffMinutes = Math.floor(currentTurnTimerDiffSeconds/60);
                currentTurnTimerDiffSeconds = currentTurnTimerDiffSeconds % 60;
                if (currentTurnTimerDiffSeconds < 10) {
                    currentTurnTimerDiffSeconds = "0" + currentTurnTimerDiffSeconds;
                }
                if (currentTurnTimerDiffMinutes < 10) {
                    currentTurnTimerDiffMinutes = "0" + currentTurnTimerDiffMinutes;
                }
                this.setState({
                    combatTimerStr: combatTimerDiffMinutes + ":" + combatTimerDiffSeconds,
                    currentTurnTimerStr: currentTurnTimerDiffMinutes + ":" + currentTurnTimerDiffSeconds
                });
            }, 1000);
        });
    }

    resetCombatTimer = () => {
        this.setState({
            combatTimer: new Date(),
            currentTurnTimer: new Date()
        });
    }

    stopCombatTimer = () => {
        clearInterval(this.combatTimerInterval);
    }

    openDamageModal = (id) => {
        this.setState({
            isModalOpen: true,
            characterInContext: id
        });
    }

    handleModalClose = () => {
        this.setState({
            isModalOpen: false,
            characterInContext: 0
        });
    }

    confirmModal = () => {
        if(this.state.damageValue <=0) {
            this.handleModalClose();
        }
        let characterFound = false;
        let newCharacterList = this.props.characterList.map(character => {
            if (character._id === this.state.characterInContext) {
                let newCharacter = cloneDeep(character);
                newCharacter.hp_current = newCharacter.hp_current - this.state.damageValue;
                if(newCharacter.hp_current < 0) {
                    newCharacter.hp_current = 0;
                }
                characterFound = true;
                return newCharacter;
            }
            return character;
        });
        if(!characterFound) {
            let newEnemyList = this.props.enemyList.map(enemy => {
                if (enemy._id === this.state.characterInContext) {
                    let newEnemy = cloneDeep(enemy);
                    newEnemy.hp_current = newEnemy.hp_current - this.state.damageValue;
                    if(newEnemy.hp_current < 0) {
                        newEnemy.hp_current = 0;
                    }
                    characterFound = true;
                    return newEnemy;
                }
                return enemy;
            });
            this.props.updateEnemyList(newEnemyList);
            console.log(newEnemyList);
        } else {
            this.props.updateCharacterList(newCharacterList);
            console.log(newCharacterList);
        }

        this.handleModalClose();
    }

    updateDamageValue = (event) => {
        this.setState({
            damageValue: parseInt(event.target.value)
        });
    }

    getCharacterById = (id) => {
        
    }

    render() {
        this.combatOrder = this.generateCombatOrder();
        let orderRows = this.combatOrder.map((character, index)=>{
            return (
                <tr key={index}>
                    <td className="current-turn-column">{this.state.currentTurnIdx === index && <img className="right-arrow" src={RightArrow} />}</td>
                    <td className="combat-name-column">{character.name}</td>
                    <td className="combat-ac-column">{character.ac}</td>
                    <td className="combat-health-column">{character.hp_current} / {character.hp_max}</td>
                    <td className="combat-damage-column"><img className="damage-icon" src={DamageIcon} onClick={() => {this.openDamageModal(character._id)}} /></td>
                    <td className="combat-notes-column"><input type="text" placeholder="Combat Notes" /></td>
                </tr>
            );
        });
        return (
            <div>
                <h2>Combat Order</h2>
                <button className="combat-timer-button" onClick={this.props.resetInitiative}>Reset Initiative</button>
                <div className="combat-change-turn-container">
                    <img className="up-arrow" src={UpArrow} onClick={() => {this.changeTurn(-1)}} />
                    <img className="down-arrow" src={DownArrow} onClick={() => {this.changeTurn(1)}} />
                </div>
                <table className='combat-order-table'>
                    <tbody>
                        {orderRows}
                    </tbody>
                </table>
                <button className="combat-timer-button" onClick={this.startCombatTimer}>Start Combat Timer</button>
                <button className="combat-timer-button" onClick={this.resetCombatTimer}>Reset Combat Timer</button>
                <button className="combat-timer-button" onClick={this.stopCombatTimer}>Stop Combat Timer</button>
                <div className="combat-timer"><span>Combat Timer: </span>{this.state.combatTimerStr}</div>
                <div className="combat-timer"><span>Current Turn: </span>{this.state.currentTurnTimerStr}</div>
                <div>
                    <Modal
                        open={this.state.isModalOpen}
                        onClose={this.handleModalClose}
                    >
                        <Box className="damage-modal">
                            <span>
                                Amount of damage: <input type="number" name="inputDamage" value={this.state.damageValue} onChange={this.updateDamageValue}></input>
                            </span>
                            <div className="damage-modal-footer">
                                <button className="damage-modal-confirm-button" onClick={this.confirmModal}>Confirm</button>
                                <button className="damage-modal-cancel-button" onClick={this.handleModalClose}>Cancel</button>
                            </div>
                        </Box>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default CombatWidget;