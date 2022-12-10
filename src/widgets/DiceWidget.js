import React from 'react';
import DiceIcon from '../dice-twenty-faces-twenty.svg';

class DiceWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            diceResult: "--"
        };
    }

    handleClick = (diceNum) => {
        let diceRoleVal = Math.ceil(Math.random()*diceNum);
        this.setState({
            diceResult: diceRoleVal
        });
    }

    render() {
        return (
            <div>
                <button className='dice-button' onClick={() => this.handleClick(20)}>D20</button>
                <button className='dice-button' onClick={() => this.handleClick(12)}>D12</button>
                <button className='dice-button' onClick={() => this.handleClick(10)}>D10</button>
                <button className='dice-button' onClick={() => this.handleClick(8)}>D8</button>
                <button className='dice-button' onClick={() => this.handleClick(6)}>D6</button>
                <button className='dice-button' onClick={() => this.handleClick(4)}>D4</button>
                <div className='dice-result-container'>
                    <img className='dice-icon' src={DiceIcon} alt="Twenty Sided Die" />
                    <div className='dice-result'>{this.state.diceResult}</div>
                    <img className='dice-icon' src={DiceIcon} alt="Twenty Sided Die" />
                </div>
            </div>
        );
    }
}

export default DiceWidget;