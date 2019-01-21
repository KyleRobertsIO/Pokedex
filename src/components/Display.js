import React, { Component } from 'react';

class Display extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.name !== nextProps.name) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        return (
            <div id="pokemon-display">
                <div id="sprite-container">
                    <img id="sprite" alt="pokemon" src={this.props.spriteImage} />
                    <h1 id="pokemon-name">{this.props.name}</h1>
                </div>

                <ul id="type-container">

                    {this.props.types.length === 1
                        ? <li className="type-icon" id={this.props.types[0].type.name}>
                            <b>{this.props.types[0].type.name}</b>
                        </li>
                        : <div>
                            <li className="type-icon" id={this.props.types[0].type.name}>
                                <b>{this.props.types[0].type.name}</b>
                            </li>
                            <li className="type-icon" id={this.props.types[1].type.name}>
                                <b>{this.props.types[1].type.name}</b>
                            </li>
                        </div>}
                </ul>
            </div>
        );
    }
}

export default Display;