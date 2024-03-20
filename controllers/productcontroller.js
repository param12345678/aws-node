import Product from '../models/product'
const { ObjectId } = require('mongodb');
import Inventory from '../models/inventory'


/*
 * Created on Feb 28 2023
 * @author Test
 */
// create product and inventory 
export const create = async (req, res) => {
    let { name, description, image, categoryId, price, quantity } = req.body
    try {
        let createProduct = new Product({
            name: name,
            description: description ? description : "",
            image: image ? image : "",
            categoryId: categoryId,
            price: price
        })
        let saveData = await createProduct.save();

        // inventory
        const createInventroy = new Inventory({
            productId: createProduct._id,
            quantity: quantity

        })
        const saveInventory = await createInventroy.save();
        res.status(201).json({
            success: true,
            data: saveData, saveInventory,
            message: "success"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            err: error
        })
    }
}

//  listing all products
export const allProducts = async (req, res) => {
    try {
        const findProduct = await Product.find({}).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            total:findProduct.length,
            data: findProduct,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            err: error
        })
    }
};



//  update product 
export const updateProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body
        const findProduct = await Product.findOne({ _id: req.params.id })

        const productData = {
            name: name,
            description: description,
            price: price
        };

        if (findProduct != null) {
            await Product.updateOne(
                { _id: findProduct._id },
                {
                    $set: productData
                })
            res.status(200).json({
                success: true,
                message: "update success"
            })
        }
        else {
            throw 'No category find'
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            err: error
        })
    }
};
// delete
export const deleteProduct = async (req, res) => {
    try {

        const { id } = req.params
        if (!id)
            throw 'Id is required'

        const findProduct = await Product.findOne({ _id: id })
        if (findProduct != null) {
            await Product.deleteOne(
                { _id: findProduct._id },)
            res.status(200).json({
                success: true,
                message: "delete success"
            })
        }
        else
            throw 'No Product find.'

    } catch (error) {
        res.status(400).json({
            success: false,
            err: error
        })
    }
};

// upload one image product
export const uploadProductImg = async (req, res) => {
    try {
        const id = req.params.id;
        let file = req.file.filename;
        await Product.updateOne({
            _id: id,
        },
            { $set: { image: [file], } })
        res.status(200).json({
            success: true,
            data: req.file
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            err: error
        })
    }
};
//  upload multipal images 
export const uploadProductImgArray = async (req, res) => {
    try {
        const id = req.params.id;
        let file = req.files.map(item => item.filename)
        await Product.updateOne({
            _id: id,
        },
            { $set: { image: [file], } })
        res.status(200).json({
            success: true,
            data: req.file
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            err: error
        })
    }
}

