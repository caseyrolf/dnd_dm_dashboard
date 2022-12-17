import React from 'react';
import CharacterImage from '../CharacterImage.png';
import {saveNPC, deleteNPC} from '../dataRetriever.js';

class NPCCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            location: this.props.location,
            notes: this.props.notes
        };
    }

    handlePropChange = ({target: {name, value}}) => {
        this.setState({
            [name]: value
        }, () =>{
            this.props.updateParentNPC({_id: this.props._id, ...this.state});
            saveNPC(this.props._id, this.buildNPCObj());
        });
    }

    buildNPCObj = () => {
        let NPC = {
            name: this.state.name,
            location: this.state.location,
            notes: this.state.notes
        }
        return NPC;
    }

    deleteNPCCard = () => {
        deleteNPC(this.props._id).then(() => {
            this.props.removeNPC(this.props._id);
        });
    }

    render() {
        return (
            <div className='player-card'>
                <div className='player-name'>
                    <input className="name-input" type="text" onChange={this.handlePropChange} value={this.state.name} name="name"/>
                    <button className='delete-button' onClick={this.deleteNPCCard}>X</button>
                </div>
                <img src={CharacterImage} alt="NPC" />
                <div className='npc-bio'>
                    <div>
                        Location: <input className="string-input" type="text" onChange={this.handlePropChange} value={this.state.location} name="location"/> 
                    </div>
                    <div>
                        <span className='notes-label'>Notes: </span><textarea type="text" className="long-text-input" name="notes" onChange={this.handlePropChange} value={this.state.notes} rows="10" cols="30" />
                    </div>
                </div>
            </div>
        );
    }
}

export default NPCCard;