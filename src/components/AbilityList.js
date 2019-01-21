import React, { Component } from 'react';

class AbilityList extends Component {
    constructor(props){
        super(props); 
        this.state = {
            effects: []
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.name !== nextProps.name) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        let list = this.props.abilities;
        var abilityList = list.map((listItem) =>
            <li className="ability" key={listItem.slot.toString()}>
                <b>{listItem.ability.name}</b>
            </li>
        );
        return (
            <div id="ability-list">
                <h3>Abilities:</h3>
                <ul id="abilities">
                    {abilityList}
                </ul>
            </div>
        );
    }
}

export default AbilityList;