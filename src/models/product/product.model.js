import mongoose, { Schema } from "mongoose";

const productSchema = Schema({

},
    {
        timestamp: true
    })

export const Product = new mongoose.model(Product,productSchema);