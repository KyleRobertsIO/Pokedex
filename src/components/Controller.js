import React, { Component } from 'react';
import axios from 'axios';
import Display from './Display';
import Chart from './Chart';
import AbilityList from './AbilityList';
import '../css/pokedex.css';
import '../css/typeColor.css';
import '../css/controls.css';

var pokemon = 'pichu';

function ucFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class Controller extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pokemon: pokemon,
            name: "",
            spriteImage: "",
            types: [],
            stats: [],
            chartData: {
                labels: ['HP', 'Attack', 'Defence', 'Spa. Attack', 'Spa. Defence', 'Speed'],
                datasets: [{
                    data: [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                    ],
                    backgroundColor: [
                        'rgba(255, 0, 0, 1.0)',
                        'rgba(244, 164, 66, 1.0)',
                        'rgba(255, 206, 0, 1.0)',
                        'rgba(133, 65, 244, 1.0)',
                        'rgba(244, 65, 217, 1.0)',
                        'rgba(65, 223, 244, 1.0)'
                    ]
                }]
            },
            abilities: [],
            moves: [],
            loading: true
        };
        this.changePokemon = this.changePokemon.bind(this);
    }

    componentDidMount() {
        axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemon + '/')
            .then(res => {
                let name = ucFirst(res.data.species.name);
                let spriteImage = res.data.sprites.front_default;
                let types = res.data.types.reverse();
                for (let i = 0; i < types.length; i++) {
                    types[i].type.name = ucFirst(types[i].type.name);
                }
                let stats = res.data.stats.reverse();

                let chartData = {
                    labels: ['HP', 'Attack', 'Defence', 'Spa. Attack', 'Spa. Defence', 'Speed'],
                    datasets: [{
                        data: [
                            stats[0].base_stat,
                            stats[1].base_stat,
                            stats[2].base_stat,
                            stats[3].base_stat,
                            stats[4].base_stat,
                            stats[5].base_stat,
                        ],
                        backgroundColor: [
                            'rgba(255, 0, 0, 1.0)',
                            'rgba(244, 164, 66, 1.0)',
                            'rgba(255, 206, 0, 1.0)',
                            'rgba(133, 65, 244, 1.0)',
                            'rgba(244, 65, 217, 1.0)',
                            'rgba(65, 223, 244, 1.0)'
                        ]
                    }]
                }

                let abilities = res.data.abilities.reverse();
                for (let i = 0; i < abilities.length; i++) {
                    abilities[i].ability.name = ucFirst(abilities[i].ability.name);
                }

                /*let moves = res.data.moves.sort();
                let movesSorted = [];
                for(let i = 0; i < moves.length; i++){
                    movesSorted.push(moves[i].move.name);
                }
                // Sort A->Z
                movesSorted.sort();
                for(let i = 0; i < movesSorted.length; i++){
                    console.log(movesSorted[i]);
                }*/

                let loading = false;
                this.setState({
                    name: name,
                    spriteImage: spriteImage,
                    types: types,
                    stats: stats,
                    chartData: chartData,
                    abilities: abilities,
                    //moves: movesSorted,
                    loading: loading
                });
            })
    }

    changePokemon() {
        let newPokemon = document.getElementById('searchInput').value.toLowerCase();


        axios.get('https://pokeapi.co/api/v2/pokemon/' + newPokemon + '/')
            .then(res => {
                let name = ucFirst(res.data.species.name);
                let spriteImage = res.data.sprites.front_default;
                let types = res.data.types.reverse();
                for (let i = 0; i < types.length; i++) {
                    types[i].type.name = ucFirst(types[i].type.name);
                }
                let stats = res.data.stats.reverse();

                let chartData = {
                    labels: ['HP', 'Attack', 'Defence', 'Spa. Attack', 'Spa. Defence', 'Speed'],
                    datasets: [{
                        data: [
                            stats[0].base_stat,
                            stats[1].base_stat,
                            stats[2].base_stat,
                            stats[3].base_stat,
                            stats[4].base_stat,
                            stats[5].base_stat,
                        ],
                        backgroundColor: [
                            'rgba(255, 0, 0, 1.0)',
                            'rgba(244, 164, 66, 1.0)',
                            'rgba(255, 206, 0, 1.0)',
                            'rgba(133, 65, 244, 1.0)',
                            'rgba(244, 65, 217, 1.0)',
                            'rgba(65, 223, 244, 1.0)'
                        ]
                    }]
                }
                let abilities = res.data.abilities.reverse();
                for (let i = 0; i < abilities.length; i++) {
                    abilities[i].ability.name = ucFirst(abilities[i].ability.name);
                }

                let loading = false;

                this.setState({
                    name: name,
                    spriteImage: spriteImage,
                    types: types,
                    stats: stats,
                    chartData: chartData,
                    abilities: abilities,
                    loading: loading
                });
            })
            .catch((error) => {
                if (error) {
                    console.log("No Existing Pokemon");
                }
            })
    }

    render() {
        return (
            <div>
                <div id="search-container">
                    <center>
                        <input type="search" id="searchInput" />
                        <button id="search-button" onClick={this.changePokemon}>
                            <b>Search</b>
                        </button>
                    </center>
                </div>

                <div id="pokedex-screen">

                    {this.state.loading
                        ? "Loading pokemon..."
                        : <Display
                            name={this.state.name}
                            spriteImage={this.state.spriteImage}
                            types={this.state.types}
                            stats={this.state.stats}
                        />}

                    {this.state.loading
                        ? "Loading Abilties..."
                        : <AbilityList
                            abilities={this.state.abilities}
                            name={this.state.name}
                        />}

                    <hr />

                    <div id="stat-container">

                        <h3>Base Stats:</h3>

                        {this.state.loading
                            ? "Loading Stats..."
                            : <Chart
                                chartData={this.state.chartData}
                                name={this.state.name}
                            />}

                    </div>

                </div>
            </div>
        )
    }

}

export default Controller;