import express from 'express'
const router = express.Router()
import {inventories} from '../controllers/customerbookingcontroller'



// router
router.get('/', inventories)



module.exports = router;
