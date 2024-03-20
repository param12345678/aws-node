import mongoose from 'mongoose';
const Schema = mongoose.Schema
const categorySchema = new Schema({
    category_name: {
        require:true,
        type: String
    },
    description:{
        type:String
    },
    image :{
        type:Array
    },
 
},
    { timestamps: true }
)
let Category = mongoose.model('category', categorySchema);
// Customer.index({ email: 1, })

export default Category