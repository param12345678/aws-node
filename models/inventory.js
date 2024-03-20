import mongoose from 'mongoose';
const Schema = mongoose.Schema
const inverntorySchema = new Schema({

    productId: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },

    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'customer',
        // required: true
    },
    status: {
        type: String,
        enum: [
            'active', 'inactive'
        ],
        default: 'active'
    },
    quantity: {
        type: Number
    }

},
    { timestamps: true }
)
let Inventory = mongoose.model('inventory', inverntorySchema);

export default Inventory