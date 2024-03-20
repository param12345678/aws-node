import express from 'express'
const router = express.Router()
import {inventories} from '../controllers/inventorycontroller'

router.get('/', inventories)


module.exports = router;
