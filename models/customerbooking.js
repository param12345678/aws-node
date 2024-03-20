import mongoose from 'mongoose';
const Schema = mongoose.Schema
const customerbookingSchema = new Schema({
   
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },

    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'customer',
        required: true
    },
    quantity:{
        type:Number,
    }

 
},
    { timestamps: true }
)
let CustomerBooking = mongoose.model('customerbooking', customerbookingSchema);

export default CustomerBooking