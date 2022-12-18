import React from 'react';
import EnemyCard from './EnemyCard.js';
import {createEnemy} from '../dataRetriever.js';

class EnemyCardList extends React.Component {
    let 
    
    constructor(props) {
        super(props);
        this.state = {
            enemyList: this.props.enemyList
        }     
    }
    addEnemy = () => {
        let newEnemy = {
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
            notes: ""
        };
        createEnemy(newEnemy).then((enemyData) => {
            this.setState(currentState => ({
                enemyList: [...currentState.enemyList,
                    {
                        _id: enemyData._id,
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
                        notes: ""
                    }
                ]
            }));
        });
        
    }

    removeEnemy = (id) => {
        this.setState({
            enemyList: this.state.enemyList.filter(enemy => enemy._id !== id)
        }, () => {
            this.props.updateParentEnemyList(this.enemyList);
        });
    }

    updateEnemy = (updatedEnemy) => {
        let newEnemyList = this.state.enemyList.map(enemy => {
            if (enemy._id === updatedEnemy._id) {
                return updatedEnemy;
            }
            return enemy;
        });
        this.setState({enemyList: newEnemyList});
        this.props.updateParentEnemyList(newEnemyList);
    }

    render() {
        let enemyCardList = this.state.enemyList.map((enemy, index)=>{
            return <EnemyCard key={enemy._id} {...enemy} removeEnemy={this.removeEnemy} updateParentEnemy={this.updateEnemy} />;
        });
        return (
            <div>
                <button className="add-button" onClick={this.addEnemy}>Add Enemy</button>
                {enemyCardList}
            </div>
        );
    }
}

export default EnemyCardList;