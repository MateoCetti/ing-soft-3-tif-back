const { MongoClient } = require('mongodb')
const express = require('express')

var cors = require('cors')

const app = express()
app.use(cors())


const port = 3030
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

app.get('/', async (req, res) => {
  let pokemon = await client.db("pokemon_db").collection("pokemon_collection").findOne({"name": req.query.name});
  if (pokemon == null){
    res.send({error:"No pokemon found"});
    return;
  }
  console.log(pokemon.name)
  res.send({name: pokemon.name, 
    types: [pokemon.type1, pokemon.type2]})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})