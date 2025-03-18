import { MongoClient } from 'mongodb';
import * as AddingMango from './addMongo';
import * as ReadingMango from './readMongo';
import * as EditMango from './editMongo';

const uri = "mongodb://localhost:27017";
export const client = new MongoClient(uri);

export const add = AddingMango;
export const read = ReadingMango;
export const edit = EditMango

export async function connect() {
    await client.connect();
    await client.db("SEL").command({ ping: 1 });
    console.log("Connected successfully to server");
}

export function close() {
    client.close();
}