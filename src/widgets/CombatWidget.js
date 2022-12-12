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
            currentTurnIdx: 0
        }     
    }

    componentDidUpdate() {
        this.updateCombatOrder();
    };

    updateCombatOrder() {
        let combatOrder = this.generateCombatOrder();
        if(!this.arrayEquals(combatOrder, this.state.combatOrder)) {
            this.setState({
                combatOrder: combatOrder
            });
        }
    }

    generateCombatOrder() {
        let characterList = cloneDeep(this.props.characterList);
        characterList.sort((a,b) => parseInt(b.init) - parseInt(a.init));
        let combatOrder = characterList.map((character) => character.name);
        return combatOrder;
    }

    arrayEquals(a, b) {
        return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
    }

    changeTurn(orderShift) {
        let newTurnIdx = this.state.currentTurnIdx + orderShift;
        if(newTurnIdx < 0) {
            newTurnIdx = this.state.combatOrder.length-1;
        } else if (newTurnIdx >= this.state.combatOrder.length) {
            newTurnIdx = 0;
        }
        this.setState({currentTurnIdx: newTurnIdx});
    }

    render() {
        let orderRows = this.state.combatOrder.map((name, index)=>{
            return (
                <tr key={index}>
                    <td className="current-turn-column">{this.state.currentTurnIdx === index && <img className="right-arrow" src={RightArrow} />}</td>
                    <td className="combat-name-column">{name}</td>
                </tr>
            );
        });
        return (
            <div>
                <h2>Combat Order</h2>
                <div className="combat-change-turn-container">
                    <img className="up-arrow" src={UpArrow} onClick={() => {this.changeTurn(-1)}} />
                    <img className="down-arrow" src={DownArrow} onClick={() => {this.changeTurn(1)}} />
                </div>
                <table className='combat-order-table'>
                    <tbody>
                        {orderRows}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CombatWidget;