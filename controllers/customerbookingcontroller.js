import Inventory from '../models/inventory'
const { ObjectId } = require('mongodb');

/*
 * Created on Feb 28 2023
 * @author Test
 */


// listing all category
export const inventories = async (req, res) => {
    try {
        const category = await Inventory.find({}).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: category,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            err: error
        })
    }
};
