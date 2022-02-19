const mongoose = require('mongoose');
const { Schema } = mongoose;

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/mongooseRelation');
    console.log('Database Connected - Farms')
}

const userSchema = new Schema({
    username: String,
    age: Number
})

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: [{type: Schema.Types.ObjectId , ref: 'User'}]
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweet = async () => {
//     // const user = new User({ username: 'chickenfan99', age: 61})
//     const user = await User.findOne({username: 'chickenfan99'})
//     const tweet2 = new Tweet({text: 'I have the best chicken family', likes: 2343})
//     tweet2.user = user;
//     // user.save();
//     tweet2.save();
// }

// makeTweet();


const findTweet = async () => {
    const t = await Tweet.findOne({}).populate('user', 'username'); // only populating username
    console.log(t);
}

findTweet();





