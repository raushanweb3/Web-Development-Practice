const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require('path');
const methodOverride = require('method-override')

main().catch(err => console.log(err));

async function main() {
    // await mongoose.connect('mongodb://localhost:27017/mongoExpressRel');
    await mongoose.connect('mongodb://localhost:27017/RStest');
    console.log('Mongoose & Express Relation: Database Connected')
}

const Product = require('./models/product');
const Farm = require('./models/farm')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

/////////  FARM ROUTES  ////////////////////////////////////////

app.get('/farms', async (req, res) => {
    const farms = await Farm.find({});
    res.render('farms/index', { farms })
})

app.get('/farms/new', (req, res) => {
    res.render('farms/new')
})

app.post('/farms', async (req, res) => {
    const farm = new Farm(req.body);
    await farm.save();
    res.render(`farms/show`, { farm });
})

app.get('/farms/:id', async(req,res) => {
    const farm = await Farm.findById(req.params.id).populate('products');
    res.render('farms/show', {farm});
})

// adding products in a form
app.get('/farms/:id/products/new', async (req,res) => {
    const {id} = req.params
    const farm = await Farm.findById(req.params.id).populate('products');
    res.render('products/new', {categories, farm});
})

app.post('/farms/:id/products', async (req,res) => {
    const {id} = req.params
    const farm = await Farm.findById(id);
    const {name, price, category} = req.body;
    const product = new Product({name, price, category})
    farm.products.push(product); // adding product id to the form
    product.farm = farm;
    await farm.save();
    await product.save();
    res.redirect(`/farms/${id}`)
})


// Edit and delete farms functionality below this

app.get('/farms/:id', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    res.render('farms/show', { farm })
})

app.put('/farms/:id', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`${farm._id}`)
})

app.get('/farms/:id/edit', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    res.render('farms/edit', {farm})
})

app.delete('/farms/:id', async(req,res) => {
    const {id} = req.params;
    const deletedFarm = await Farm.findByIdAndDelete(id); // this alone doesn't ensures all the associated products in the farm are deleted

    //for deleting associated products we'll use middleware and it is first defined in the farm.js - schema page ----> go there first

    res.redirect('/farms')
})

/////////  PRODUCT ROUTES  ////////////////////////////////////////

app.get('/', (req, res) => {
    res.render('home')
})

const categories = ['fruit', 'vegetable', 'dairy'];

app.get('/products', async (req, res) => {
    //check if the url has requested for a particular category - like a category filter
    const { category } = req.query;
    // if there is a category in the url query render only the products that belong to the queried categories
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    } else { // otherwise render all products
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }
})

// going to new product creation form
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})
// posting the new product creation form. Creating product and adding to the database
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})
// visiting a product page
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/show', { product })
})

// getting to the edit page. Displaying the edit form
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render(`products/edit`, { product, categories })
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = Product.findByIdAndUpdate(id);
    res.render(`products/${product._id}`);
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products')
})


app.listen(3000, () => {
    console.log('Listening on Port 3000!!')
})