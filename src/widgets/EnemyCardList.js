import React from 'react';
import EnemyCard from './EnemyCard.js';
import {createEnemy} from '../dataRetriever.js';
import { cloneDeep } from 'lodash';

class EnemyCardList extends React.Component {

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
            initiative: 0,
            notes: ""
        };
        createEnemy(newEnemy).then((enemyData) => {
            this.props.updateEnemyList([
                ...this.props.enemyList,
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
                    initiative: 0,
                    notes: ""
                }
            ]);
        });
        
    }

    removeEnemy = (id) => {
        this.props.updateEnemyList(this.props.enemyList.filter(enemy => enemy._id !== id));
    }

    updateEnemy = (updatedEnemy) => {
        let newEnemyList = this.props.enemyList.map(enemy => {
            if (enemy._id === updatedEnemy._id) {
                return updatedEnemy;
            }
            return enemy;
        });
        this.props.updateEnemyList(newEnemyList);
    }

    duplicateEnemy = (id) => {
        let enemyList = cloneDeep(this.props.enemyList);
        let newEnemy = enemyList.filter((enemy) => {return enemy._id === id})[0];
        delete newEnemy._id;
        newEnemy.name = newEnemy.name + " Copy";

        createEnemy(newEnemy).then((enemyData) => {
            this.props.updateEnemyList([...this.props.enemyList,
                    {
                        _id: enemyData._id,
                        name: enemyData.name,
                        level: enemyData.level,
                        gender: enemyData.gender,
                        race: enemyData.race,
                        class: enemyData.class,
                        strength: enemyData.strength,
                        dexterity: enemyData.dexterity,
                        constitution: enemyData.constitution,
                        intelligence: enemyData.intelligence,
                        wisdom: enemyData.wisdom,
                        charisma: enemyData.charisma,
                        hp_current: enemyData.hp_current,
                        hp_max: enemyData.hp_max,
                        ac: enemyData.ac,
                        initiative: enemyData.initiative,
                        notes: enemyData.notes
                    }
                ]
            );
        });
    }

    render() {
        let enemyCardList = this.props.enemyList.map((enemy, index)=>{
            return <EnemyCard key={enemy._id} enemy={enemy} removeEnemy={this.removeEnemy} updateEnemy={this.updateEnemy} duplicateEnemy={this.duplicateEnemy} />;
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