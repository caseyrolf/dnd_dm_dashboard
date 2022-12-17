import React from 'react';
import NPCCard from './NPCCard.js';
import {createNPC} from '../dataRetriever.js';

class NPCCardList extends React.Component {
    let 
    
    constructor(props) {
        super(props);
        this.state = {
            NPCList: this.props.NPCList
        }     
    }
    addNPC = () => {
        let newNPC = {
            name: "",
            location: "",
            notes: ""
        };
        createNPC(newNPC).then((NPCData) => {
            this.setState(currentState => ({
                NPCList: [...currentState.NPCList,
                    {
                        _id: NPCData._id,
                        name: "",
                        location: "",
                        notes: ""
                    }
                ]
            }));
        });
        
    }

    removeNPC = (id) => {
        this.setState({
            NPCList: this.state.NPCList.filter(NPC => NPC._id !== id)
        }, () => {
            this.props.updateParentNPCList(this.NPCList);
        });
    }

    updateNPC = (updatedNPC) => {
        let newNPCList = this.state.NPCList.map(NPC => {
            if (NPC._id === updatedNPC._id) {
                return updatedNPC;
            }
            return NPC;
        });
        this.setState({NPCList: newNPCList});
        this.props.updateParentNPCList(newNPCList);
    }

    render() {
        let NPCCardList = this.state.NPCList.map((NPC, index)=>{
            return <NPCCard key={NPC._id} {...NPC} removeNPC={this.removeNPC} updateParentNPC={this.updateNPC} />;
        });
        return (
            <div>
                <button className="add-button" onClick={this.addNPC}>Add NPC</button>
                {NPCCardList}
            </div>
        );
    }
}

export default NPCCardList;