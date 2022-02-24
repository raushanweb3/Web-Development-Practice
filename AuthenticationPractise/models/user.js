const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be blank']
    },
    password: { // remember this is the hash of the password - not the password itself
        type: String,
        required: [true, 'Password cannot be blank']
    }
})

// creating a method on userSchema for shortening the password verification method
userSchema.statics.findAndValidate = async function (username, password) {
    const foundUser = await this.findOne({ username }) // here this refers to the particular schema or model
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false;
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12); //password is already being passed on this function by using 'this' keyword
    next();
})

module.exports = mongoose.model('User', userSchema);