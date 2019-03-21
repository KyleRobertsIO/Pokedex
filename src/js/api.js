var axios = require("axios");

function ucFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function getPokemon(pokemon) {
    const json = await axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemon + '/')
        .catch(error => {
            console.log(error);
        })

    // Name
    let name = ucFirst(json.data.name);
    // Types 
    let types = json.data.types.reverse();
    for (let i = 0; i < types.length; i++) {
        types[i].type.name = ucFirst(types[i].type.name);
    }
    // Stats / Chart data
    let stats = json.data.stats.reverse();
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
    // Abilities
    let abilities = [];
    let tempAbilities = json.data.abilities.reverse();
    for (let i = 0; i < tempAbilities.length; i++) {
        let abilityObj = {
            name: ucFirst(tempAbilities[i].ability.name),
            hidden: tempAbilities[i].is_hidden,
            effect: ""
        }
        let abilityJSON = await axios.get(tempAbilities[i].ability.url);
        let text = abilityJSON.data.effect_entries[0].effect;
        abilityObj.effect = text;
        abilities.push(abilityObj);
    }
    // Moves
    let moves = json.data.moves; 
    for(let i = 0; i < moves.length; i++){
        moves[i].move.name = ucFirst(moves[i].move.name);
    } 
    // Open species json
    let speciesURL = json.data.species.url;
    const species = await axios.get(speciesURL);
    // Entry
    let textEntries = species.data.flavor_text_entries;
    let entry = "";
    for (let i = 0; i < textEntries.length; i++) {
        if (textEntries[i].language.name === "en") {
            entry = textEntries[i].flavor_text;
            break;
        }
    }
    // Load
    let loading = false;
    let obj = {
        name: name,
        sprite: json.data.sprites.front_default,
        types: types,
        chartData: chartData,
        abilities: abilities,
        entry: entry,
        moves: moves,
        loading: loading
    }
    return obj;
}

function getMoveObj(name, json){
    // Accuracy
    let accuracy = json.accuracy;
    if(accuracy == null){
        accuracy = 100;
    }
    // PP
    let pp = json.pp;
    // Power
    let power = json.power;
    if(power == null){
        power = 0;
    }
    // Effect
    let effect = json.effect_entries[0].effect;
    let effect_chance = json.effect_chance;
    if(effect_chance != null){
        effect = effect.replace('$effect_chance', effect_chance.toString());
    }
    // Class
    let move_class = ucFirst(json.damage_class.name);
    // Type
    let type = ucFirst(json.type.name);

    let obj = {
        name: name,
        type: type,
        move_class: move_class,
        power: power,
        pp: pp,
        accuracy: accuracy,
        effect: effect
    }
    return obj;
}

function setMoveView(data){
    document.getElementById('move-title').innerText = data.name;
    document.getElementById('move-type').innerText = `Type: ${data.type}`;
    document.getElementById('move-pp').innerText = `PP: ${data.pp}`;
    document.getElementById('move-class').innerText = `Class: ${data.move_class}`;
    if(data.move_class.toLowerCase() != "status"){
        document.getElementById('move-power').innerText = `Power: ${data.power}`;
    }
    document.getElementById('move-accuracy').innerText = `Accuracy: ${data.accuracy}%`;
    document.getElementById('move-effect').innerText = `${data.effect}`;
}

export async function moveDetails(name, moves) {
    let moveData = {};
    document.getElementById('move-details-container').style.display = "block";
    for(let i = 0; i < moves.length; i++){
        if(moves[i].move.name === name){
            let moveJSON = await axios.get(moves[i].move.url);
            moveData = getMoveObj(name, moveJSON.data);
            setMoveView(moveData);
            break;
        }
    }
}