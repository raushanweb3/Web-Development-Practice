const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['fruit', 'vegetable', 'dairy']
    },
    farm: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Farm'
        }
    ]
})

// Creating and exporting the 'Product' model
const Product = mongoose.model('Product', productSchema);
module.exports = Product;