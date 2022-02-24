const bcrypt = require('bcrypt');

const hashPwd = async (plainPwd) => {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(plainPwd, salt);
    // console.log(salt);
    // console.log(hash);
    return hash;
}

const login = async (plainTxt) => {
    const hashed = await hashPwd(plainTxt);
    const comparison = await bcrypt.compare(plainTxt, hashed)
    if (comparison) {
        console.log('Login successful!!');
    } else {
        console.log('Incorrect! Try again.')
    }
}

login('monkey');