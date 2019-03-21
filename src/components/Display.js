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

                <div id="image-display">
                    <img id="pokemon-image" src={this.props.spriteImage} alt={this.props.name} />
                    {/*<img id="pokemon-image" src={"http://play.pokemonshowdown.com/sprites/xyani/" +
                    this.props.name.toLowerCase() + ".gif"} />*/}
                </div>

                <div id="basic-info-container">
                    <h1 id="name">{this.props.name}</h1>
                    <div>
                        {this.props.types.length === 1
                            ? <div id="type-container">
                                <div className="type" id={this.props.types[0].type.name}>
                                    {this.props.types[0].type.name}
                                </div>
                            </div>
                            : <div id="type-container">
                                <div className="type" id={this.props.types[0].type.name}>
                                    {this.props.types[0].type.name}
                                </div>
                                <div className="type" id={this.props.types[1].type.name}>
                                    {this.props.types[1].type.name}
                                </div>
                            </div>}
                    </div>
                </div>

            </div>
        );
    }
}

export default Display;

/*
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
*/