const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    console.log('Connection established!!');
    await mongoose.connect('mongodb://localhost:27017/shopApp');
}

const personSchema = new mongoose.Schema({
    first: {
        type: String
    },
    last: {
        type: String
    }
})

personSchema.virtual('fullName').get(function () {
    return `${this.first} ${this.last}`;
})

personSchema.pre('save', async function () {
    this.first = 'Yo';
    this.last = 'Boiii';
    console.log('About to save!!!!');
})

personSchema.post('save', async function () {
    console.log('Just saved!!!!');
})

const Person = mongoose.model('Person', personSchema);