import { MongoClient } from "mongodb";

const URI = process.env.MONGO_URI;
const DATABASE = process.env.DATABASE;
const COLLECTION = process.env.COLLECTION;

export async function mongo_fetch_pokemon(name_or_id) {
  const query = !isNaN(name_or_id)
    ? { pokedex_number: Number(name_or_id) }
    : { name: name_or_id };
  return await fetch_pokemon(query);
}

async function fetch_pokemon(query) {
  const client = new MongoClient(URI);
  const db = client.db(DATABASE);
  const collection = db.collection(COLLECTION);

  const pokemon = await collection.findOne(query);
  client.close();
  return pokemon;
}
