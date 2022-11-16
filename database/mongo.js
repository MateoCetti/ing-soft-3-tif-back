import { MongoClient } from "mongodb";

const URI = process.env.MONGO_URI;
const DATABASE = process.env.DATABASE
const COLLECTION = process.env.COLLECTION


export async function mongo_fetch_pokemon(name){
    const client = new MongoClient(URI);
    const db = client.db(DATABASE)
    const collection = db.collection(COLLECTION)
    let pokemon = await collection.findOne({"name": name});
    client.close()
    return pokemon;
}

