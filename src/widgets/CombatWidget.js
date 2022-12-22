import React from 'react';
import UpArrow from '../up-arrow.png';
import RightArrow from '../right-arrow.png';
import DownArrow from '../down-arrow.png';
import { cloneDeep } from 'lodash';

class CombatWidget extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            combatOrder: this.generateCombatOrder(),
            characterNotes: [],
            currentTurnIdx: 0,
            combatTimer: 0,
            combatTimerStr: "00:00",
            currentTurnTimer: 0,
            currentTurnTimerStr: "00:00",
        }     
    }

    componentDidUpdate() {
        this.updateCombatOrder();
    };

    updateCombatOrder = () => {
        let combatOrder = this.generateCombatOrder();
        if(!this.arrayEquals(combatOrder, this.state.combatOrder)) {
            this.setState({
                combatOrder: combatOrder
            });
        }
    }

    generateCombatOrder = () => {
        let characterList = cloneDeep(this.props.characterList);
        let enemyList = cloneDeep(this.props.enemyList);
        let combinedList = characterList.concat(enemyList);
        combinedList.sort((a,b) => parseInt(b.initiative) - parseInt(a.initiative));
        let combatOrder = combinedList.map((character) => character.name);
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
            newTurnIdx = this.state.combatOrder.length-1;
        } else if (newTurnIdx >= this.state.combatOrder.length) {
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

    render() {
        let orderRows = this.state.combatOrder.map((name, index)=>{
            return (
                <tr key={index}>
                    <td className="current-turn-column">{this.state.currentTurnIdx === index && <img className="right-arrow" src={RightArrow} />}</td>
                    <td className="combat-name-column">{name}</td>
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
            </div>
        );
    }
}

export default CombatWidget;