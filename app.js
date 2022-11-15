const { MongoClient } = require('mongodb')
const express = require('express')

var cors = require('cors')

const app = express()
app.use(cors())


const PORT = process.env.PORT
const URI = process.env.MONGO_URI;
const DATABASE = process.env.database
const COLLECTION = process.env.collection

const client = new MongoClient(URI);

app.get('/', async (req, res) => {
  let pokemon = await client.db(DATABASE).collection(COLLECTION).findOne({"name": req.query.name});
  if (pokemon == null){
    res.send({error:"No pokemon found"});
    return;
  }
  console.log(pokemon.name)
  res.send({name: pokemon.name, 
    types: [pokemon.type1, pokemon.type2]})
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})