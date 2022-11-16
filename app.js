const { MongoClient } = require('mongodb')
const express = require('express')

var cors = require('cors')

const app = express()
app.use(cors())


const PORT = process.env.PORT
const URI = process.env.MONGO_URI;
const DATABASE = process.env.DATABASE
const COLLECTION = process.env.COLLECTION

const client = new MongoClient(URI);

app.get('/', async (req, res) => {
  let pokemon = await client.db(DATABASE).collection(COLLECTION).findOne({"name": req.query.name});
  if (pokemon == null){
    res.send({error:"No pokemon found"});
    return;
  }

  let pokemon_number = String(pokemon.pokedex_number)
  while (pokemon_number.length !== 3){
    pokemon_number = "0"+pokemon_number
  }

  res.send({name: pokemon.name,
    number: pokemon_number, 
    types: [pokemon.type1, pokemon.type2]})
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})