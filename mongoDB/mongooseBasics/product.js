const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    console.log('Connection established!!');
    await mongoose.connect('mongodb://localhost:27017/shopApp');
}

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        min: [0, 'Price must be positive you dummy!'],
        required: true
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
})

// defining an instance method on schema
productSchema.methods.greet = function () {
    // console.log('Hellowww from the product!');
    console.log(`Hellowww from ${this.name}`)
}

// defining an instance method on schema to toggle onSale property
productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();
}

// defining another instance method to add categories to the product
productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save();
}

// Defining a static method
productSchema.statics.fireSale = function () {
    return this.updateMany({}, { onSale: true, price: 0 });
}

// Creating model
const Product = mongoose.model('Product', productSchema);

const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: 'Mountain Bike' });
    // foundProduct.greet();
    console.log(foundProduct);
    await foundProduct.toggleOnSale(); // finding takes time in database that's why await
    console.log(foundProduct);
    await foundProduct.addCategory('mountain');
    console.log(foundProduct);
}

Product.fireSale().then(res => console.log(res))

// findProduct();





















// const bike = new Product({ name: 'Tire Pump', price: 30, categories: ['cycling'], size: 'S'  })
// bike.save()
//     .then(data => {
//         console.log('It worked', data);
//     }).catch(err => {
//         console.log('Some error occured: ', err);
//     })

// // Product.findOneAndUpdate({ name: 'Tire Pump'}, { price: 80 }, { new: true, runValidators: true })
// //     .then(data => {
// //         console.log('It worked', data);
// //     }).catch(err => {
// //         console.log('Some error occured: ', err);
// //     })
