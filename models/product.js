import mongoose from 'mongoose';
const Schema = mongoose.Schema
const productSchema = new Schema({
    name: {
        require:true,
        type: String
    },
    description:{
        type:String
    },
    image :{
        type:Array
    },
    
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },

    price:{
        type:Number
    }
 
},
    { timestamps: true }
)
let Product = mongoose.model('product', productSchema);
// Customer.index({ email: 1, })

export default Product