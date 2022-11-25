import { Router } from 'express';

import { mongo_fetch_pokemon } from '../database/mongo.js'

const pokemon_router = Router();


async function get_pokemon(req, res){
    const name = req.query.name;
    const number = req.query.number;
    const pokemon = await mongo_fetch_pokemon(name != undefined ? name : number);  
    if (pokemon == null) {
        res.send({error:"Pokemon not found."});
        return;
    }
  
    // Make pokedex number a three digit string
    pokemon.pokedex_number = fix_pokemon_number(pokemon.pokedex_number);
    pokemon.types = fix_types(pokemon);
    
    res.send(
      {
        name: pokemon.name,
        number: pokemon.pokedex_number, 
        types: pokemon.types,
        weight: pokemon.weight_kg,
        generation: pokemon.generation,
        is_legendary: pokemon.is_legendary,
        japanese_name: pokemon.japanese_name

      }
    );
}
  
  
export function fix_pokemon_number(number){
    number = String(number)
    while (number.length !== 3){
      number = '0'+ number;
    }
    
    return number;
}


export function fix_types(pokemon){
    const types = [pokemon.type1]
    if (pokemon.type2 == "") return types;
    
    types.push(pokemon.type2);
    return types;
}


pokemon_router.get('/', get_pokemon);

export default pokemon_router;