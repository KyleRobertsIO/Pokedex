import React, { Component } from 'react';
import Display from './Display';
import Chart from './Chart';
import { getPokemon, moveDetails } from '../js/api.js';
import '../css/controls.css';
import '../css/result.css';
import '../css/moveDetails.css';
import '../css/typeColor.css';
import searchIcon from '../assets/icons/search.svg';

import closeIcon from '../assets/icons/close.svg';

var pokemon = 'aron';

class Controller extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pokemon: pokemon,
            name: "",
            spriteImage: "",
            entry: "",
            types: [],
            chartData: {},
            abilities: [],
            moves: [],
            loading: true
        };
        this.changePokemon = this.changePokemon.bind(this);
    }

    componentDidMount() {
        getPokemon(pokemon)
            .then((obj) => {
                this.setState({
                    name: obj.name,
                    spriteImage: obj.sprite,
                    types: obj.types,
                    chartData: obj.chartData,
                    abilities: obj.abilities,
                    entry: obj.entry,
                    moves: obj.moves,
                    chartData: obj.stats,
                    loading: obj.loading
                });
            })
    }

    changePokemon() {
        let newPokemon = document.getElementById('search-input').value.toLowerCase();
        getPokemon(newPokemon)
            .then((obj) => {
                if (obj.exists == true) {
                    this.setState({
                        name: obj.name,
                        spriteImage: obj.sprite,
                        types: obj.types,
                        chartData: obj.chartData,
                        abilities: obj.abilities,
                        entry: obj.entry,
                        moves: obj.moves,
                        chartData: obj.stats,
                        loading: obj.loading
                    });
                    document.getElementById("query-failure-container").style.display = "none";
                } else {
                    document.getElementById("query-failure-container").style.display = "block";
                }
            })
    }

    removeMoveDetails() {
        document.getElementById('move-details-container').style.display = "none";

        document.getElementById('move-title').innerText = "";
        document.getElementById('move-type').innerText = "";
        document.getElementById('move-pp').innerText = "";
        document.getElementById('move-class').innerText = "";
        document.getElementById('move-power').innerText = "";
        document.getElementById('move-accuracy').innerText = "";
        document.getElementById('move-effect').innerText = "";
    }

    removeAlertBox(){
        document.getElementById("query-failure-container").style.display = "none";
    }

    render() {
        return (
            <div>
                <div id="move-details-container">
                    <button id="close-details-button" onClick={this.removeMoveDetails}>
                        <img id="close-icon" src={closeIcon} alt="close window" />
                    </button>
                    <div id="move-data-container">

                        <h1 id="move-title"></h1>
                        <h2 id="move-class"></h2>
                        <div id="type-pp-data">
                            <h2 id="move-type"></h2>
                            <h2 id="move-pp"></h2>
                        </div>
                        <div id="power-accuracy-data">
                            <h2 id="move-power"></h2>
                            <h2 id="move-accuracy"></h2>
                        </div>

                        <div id="move-effect"></div>

                    </div>
                </div>

                <div id="query-failure-container">
                    <button id="close-alert-button" onClick={this.removeAlertBox}>
                        <img id="close-alert-icon" src={closeIcon} alt="close popup" />
                    </button>
                    <br/>
                    <div id="alert-message-container">
                        <p>Invalid Search Name</p>
                    </div>
                </div>

                <div id="search-container">
                    <input type="search" id="search-input" />
                    <button id="search-button" onClick={this.changePokemon}>
                        <img id="search-icon" src={searchIcon} alt="search button" />
                    </button>
                </div>

                <div id="page-container">

                    {this.state.loading
                        ? "Loading pokemon..."
                        : <Display
                            name={this.state.name}
                            spriteImage={this.state.spriteImage}
                            types={this.state.types}
                        />}

                    <div id="data-container">


                        <h2 id="section-title">Entry</h2>
                        <p id="flavor-text">
                            {this.state.entry}
                        </p>


                        <h2 id="section-title">Abilities</h2>
                        <ul id="ability-list">
                            {this.state.abilities.map((item) =>
                                <li key={item.name}>
                                    <h3 id={"hidden-" + item.hidden} className="ability-name">{item.name}</h3>
                                    <p className="ability-effect">{item.effect}</p>
                                </li>
                            )}
                        </ul>

                        <h2 id="section-title">Stats</h2>
                        {this.state.loading
                            ? "Loading Stats..."
                            : <Chart
                                chartData={this.state.chartData}
                                name={this.state.name}
                            />}

                        <h2 id="section-title">Moves</h2>
                        <div id="move-list">
                            {this.state.moves.map((item) =>
                                <div id={item.move.name} className="move"
                                    key={item.move.name}
                                    onClick={() => { moveDetails(item.move.name, this.state.moves) }}>
                                    {item.move.name}
                                </div>
                            )}
                        </div>

                    </div>

                </div>
            </div>
        )
    }

}

export default Controller;