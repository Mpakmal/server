import pkg from "mongodb";
const { MongoClient, MongoDecompressionError, ServerApiVersion } = pkg;
import { ObjectId } from 'mongodb';

const dbURI = process.env.MONGODB_URI;
const dbname = process.env.MONGODB_DATABASE;

const client = new MongoClient(dbURI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectToDatabase() {
    try {
        await client.connect();
        await client.db().command({ ping: 1 });  // Tes koneksi ke database
        console.log("Koneksi ke database berhasil!");
    } catch (error) {
        console.log("Koneksi ke database gagal", error);
    }
}

connectToDatabase();

export const db = client.db(dbname);