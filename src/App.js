import React, { Component } from 'react';
import axios from 'axios';
import Chart from './components/Chart';
import './css/pokedex.css';

function ucfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var pokemon = "aron";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: pokemon,
      name: undefined,
      spriteImage: undefined,
      typesArray: [],
      stats: [],
      loading: true
    }
    this.changePokemon = this.changePokemon.bind(this);
  }

  changePokemon() {
    let text = document.getElementById('searchInput').value;
    pokemon = text;
    console.log(this.state);
    console.log("State pokemom: " + this.state.pokemon);
    console.log("Pokemon: " + pokemon);
    if (this.state.pokemon !== pokemon) {
      this.setState(state => ({
        pokemon: pokemon
      }))
    }
  }


  componentDidMount() {
    axios.get('https://pokeapi.co/api/v2/pokemon/' + this.state.pokemon + '/')
      .then(res => {
        console.log(res.data);
        let name = ucfirst(res.data.species.name); // Uppercase Name
        let spriteImage = res.data.sprites.front_default; // Sprite

        let types = res.data.types; // Raw types array
        let typesArray = [];
        // Uppercase the type names
        for (var i = 0; i < types.length; i++) {
          let upperCaseType = ucfirst(types[i].type.name);
          typesArray.push(upperCaseType);
        }

        let stats = res.data.stats.reverse();
        console.log(stats);

        let loading = false;

        this.setState({ name, spriteImage, typesArray, stats, loading });
      })
  }

  componentWillUpdate(nextProps, nextState) {
    axios.get('https://pokeapi.co/api/v2/pokemon/' + nextState.pokemon + '/')
      .catch(function(error){
        if(error.response){
          console.log(error.response.status);
        }
      })
      .then(res => {
        let name = ucfirst(res.data.species.name); // Uppercase Name
        let spriteImage = res.data.sprites.front_default; // Sprite

        let types = res.data.types; // Raw types array
        let typesArray = [];
        // Uppercase the type names
        for (var i = 0; i < types.length; i++) {
          let upperCaseType = ucfirst(types[i].type.name);
          typesArray.push(upperCaseType);
        }

        let stats = res.data.stats.reverse();

        let loading = false;

        this.setState({ name, spriteImage, typesArray, stats, loading });
        
      })
      .catch(error => {
        console.log("Error: " + error.response)
      });

    return this.state.pokemon === nextState.pokemon;
  }

  render() {
    return (
      <div className="App">
        <div id="pokedex-screen">

          <div id="sprite-container">
            <img id="sprite" alt="pokemon" src={this.state.spriteImage} />
            <h1 id="pokemon-name">{this.state.name}</h1>
          </div>

          <ul id="type-container">

            {this.state.typesArray.length === 1
              ? <li className="type-icon">{this.state.typesArray[0]}</li>
              : <div>
                <li className="type-icon">{this.state.typesArray[0]}</li>
                <li className="type-icon">{this.state.typesArray[1]}</li>
              </div>}
          </ul>

          <div id="stat-container">

            {this.state.loading
              ? "Loading Stats..."
              : <Chart stats={this.state.stats} />}

          </div>

          <input type="text" id="searchInput" />
          <button onClick={this.changePokemon}>click</button>

        </div>
      </div>
    );
  }


}

export default App;
