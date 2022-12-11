import React from 'react';

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
        let characterList = this.props.characterList;
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

    render() {
        let orderRows = this.state.combatOrder.map((name, index)=>{
            return <tr key={index}><td>{name}</td></tr>;
        });
        return (
            <div>
                <table>
                    <tbody>
                        {orderRows}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CombatWidget;