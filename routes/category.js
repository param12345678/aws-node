import express from 'express'
const router = express.Router()
import {allCategories, create as _createCategory, deleteCategory, updateCategory,uploadCategoryImg as _upload} from '../controllers/categorycontroller'
import { uploadfiles } from "../middleware/uploadfile"

router.post('/create',_createCategory)
router.get('/listing', allCategories)
router.put('/update', updateCategory)
router.delete('/delete/:id', deleteCategory)
router.post('/images/:id', uploadfiles.single('image'), _upload)

module.exports = router;
