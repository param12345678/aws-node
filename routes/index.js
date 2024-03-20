import express from 'express'
const router = express.Router();


import customer from './customer';
import user from './user';
import category from './category';
import product from './product';
import inventory from './inventory';
import customerbooking from './customerbooking';



router.use('/customer', customer);
router.use('/category', category);
router.use('/product', product);
router.use('/user', user);
router.use('/inventory', inventory);
router.use('/customerbooking', customerbooking);

module.exports = router


