import Inventory from '../models/inventory'
import CustomerBooking from '../models/customerbooking'
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

export const getProductQuantity = async (req, res) => {
    try {
        const findData = await Inventory.aggregate([
            {
                $match: ({ status: 'active', quantity: { $gte: 1 } })
            },
            {
                $sort: { "createdAt": -1 }
            },

            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "productDetails"
                },

            },

        ]);
        res.status(200).json({
            success: true,
            total: findData.length,
            data: findData,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            err: error
        })
    }
};

export const bookProduct = async (req, res) => {
    try {
        const customerId = req.params.id
        const { invetoryId, quantity } = req.body

        const findInventory = await Inventory.findOne({ _id: invetoryId, status: 'active', quantity: { $gte: 1 } })

        if (findInventory != null) {
            const finalQuantity = findInventory.quantity - quantity
            if (findInventory && findInventory.quantity >= quantity) {
                await Inventory.updateOne({ _id: invetoryId, status: 'active' },
                    {
                        $set: {
                            quantity: finalQuantity,
                            // customerId: customerId,
                            // status: 'inactive'
                        }
                    })

                // CustomerBooking 
                const createBooking = new CustomerBooking({
                    productId: findInventory.productId,
                    quantity: quantity,
                    customerId: customerId,
                })
                await createBooking.save()
                // const createInventroy = new Inventory({
                //     productId: findInventory.productId,
                //     quantity: finalQuantity,
                //     status: 'active'
                // })
                // await createInventroy.save()
                res.status(200).json({
                    success: true,
                    data: "book success"
                })

            }
            else
                throw 'Check available proudct.'
        }
        else
            throw 'No data available.'
    }
    catch (error) {
        res.status(400).json({
            success: false,
            err: error
        })
    }
}