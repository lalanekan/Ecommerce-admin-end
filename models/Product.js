import mongoose from "mongoose";

const productSchema = mongoose.Schema({
productName:{
    type:String,
    required:true,
},
price:{
    type:Number,
    required: true
},
brand:{
    type: String,
    required:true
},
category:{
    type:String,
    required:true
},
userId:{
    type:String,
}
},
{timestamps:true});

export default mongoose.model("Product", productSchema);