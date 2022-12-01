import { Router } from "express";

import { mongo_fetch_pokemon } from "../database/mongo.js";

const pokemon_router = Router();

async function get_pokemon(req, res) {
  const name = req.query.name;
  const number = req.query.number;
  const pokemon = await mongo_fetch_pokemon(
    name != undefined ? fix_name(name) : number
  );
  if (pokemon == null) {
    res.send({ error: "Pokemon not found." });
    return;
  }

  // Make pokedex number a three digit string
  pokemon.pokedex_number = fix_pokemon_number(pokemon.pokedex_number);
  pokemon.types = fix_types(pokemon.type1, pokemon.type2);

  res.send({
    name: pokemon.name,
    number: pokemon.pokedex_number,
    types: pokemon.types,
    weight: pokemon.weight_kg,
    generation: pokemon.generation,
    is_legendary: pokemon.is_legendary,
    japanese_name: pokemon.japanese_name,
  });
}

export function fix_name(name) {
  if (name == undefined || name == null) {
    return undefined;
  }
  // converting first letter to uppercase
  const capitalized = name.charAt(0).toUpperCase() + name.slice(1);

  return capitalized;
}

export function fix_pokemon_number(number) {
  if (number == undefined || number == null) {
    return undefined;
  }
  let new_number = String(number);
  while (new_number.length !== 3) {
    new_number = "0" + new_number;
  }

  return new_number;
}

export function fix_types(type1, type2) {
  const types = [type1];
  if (type2 == "") return types;

  types.push(type2);
  return types;
}

pokemon_router.get("/", get_pokemon);

export default pokemon_router;
