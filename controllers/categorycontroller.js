import Category from '../models/category'
const { ObjectId } = require('mongodb');

/*
 * Created on Feb 28 2023
 * @author Test
 */
// create category 
export const create = async (req, res) => {
    let { category_name, description } = req.body

    try {
        if (!category_name)
            throw 'category_name is required';

        let createCategory = new Category({
            category_name: category_name,
            description: description ? description : "",
        })
        let saveData = await createCategory.save();
        res.status(201).json({
            success: true,
            data: saveData,
            message: "success"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            err: error
        })
    }
}

// listing all Inventory
export const allCategories = async (req, res) => {
    try {
        const category = await Category.find({}).sort({ createdAt: -1 });
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

//  update category
export const updateCategory = async (req, res) => {
    try {
        const { category_name, description, } = req.body
        const findCategory = await Category.findOne({ category_name: category_name })

        if (findCategory != null) {
            await Category.updateOne(
                { _id: findCategory._id },
                {
                    $set: {
                        description: description,
                    },
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
export const deleteCategory = async (req, res) => {
    try {

        const { id } = req.params    
        if(!id)
        throw 'Id is required'

        const findCategory = await Category.findOne({ _id: (id) })  
        if (findCategory != null) {
            await Category.deleteOne(
                { _id: findCategory._id }, )
            res.status(200).json({
                success: true,
                message: "delete success"
            })
        }
        else 
        throw 'No category find'
        
    } catch (error) {
        res.status(400).json({
            success: false,
            err: error
        })
    }
};

// upload file
export const uploadCategoryImg = async (req, res) => {
    try {
        const id = req.params.id;
        let file = req.file.filename;
        await Category.updateOne({
            _id: id, 
        },
            { $set: {  image: [file], } })
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