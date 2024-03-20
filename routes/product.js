import express from 'express'
const router = express.Router()
import {allProducts, create , deleteProduct, updateProduct,uploadProductImg,uploadProductImgArray,} from '../controllers/productcontroller'
import { productReqField } from "../middleware/validator"
import { uploadfiles } from "../middleware/uploadfile"
import { bookProduct,getProductQuantity } from '../controllers/inventorycontroller'


// router
router.post('/create',productReqField,create)
router.get('/', allProducts)
router.get('/getproduct', getProductQuantity)
router.put('/update/:id', updateProduct)
router.delete('/delete/product/:id', deleteProduct)
router.post('/uploadimg/:id', uploadfiles.single('image'), uploadProductImg)
router.post('/uploadPhotos/:id', uploadfiles.array('files'), uploadProductImgArray)
router.post('/bookproduct/:id', bookProduct)



module.exports = router;
