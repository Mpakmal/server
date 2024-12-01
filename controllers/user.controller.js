import { db } from '../config/db.js';
import { ObjectId } from 'mongodb';

const collection = db.collection('users'); // Menggunakan collection untuk koleksi users

export const test = async (req, res) => { 
    try {
        let results = await collection.find({}).toArray();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error });
    }
};

export const getUser = async (req, res, next) => { 
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const user = await collection.findOne(query);

        if (!user) {
            return next({ status: 404, message: 'User Not Found' });
        }
        res.status(200).json(user);
    } catch (error) {
        next({ status: 500, error });
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const update = { $set: req.body }; // Menggunakan data dari req.body untuk memperbarui user
        const options = { returnDocument: "after" }; // Mengembalikan dokumen setelah pembaruan

        const result = await collection.findOneAndUpdate(query, update, options);
        
        if (!result.value) {
            return next({ status: 404, message: 'User Not Found' });
        }
        
        res.status(200).json(result.value);
    } catch (error) {
        next({ status: 500, error });
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const result = await collection.deleteOne(query);

        if (result.deletedCount === 0) {
            return next({ status: 404, message: 'User Not Found' });
        }

        res.status(200).json({ message: 'User successfully deleted' });
    } catch (error) {
        next({ status: 500, error });
    }
};