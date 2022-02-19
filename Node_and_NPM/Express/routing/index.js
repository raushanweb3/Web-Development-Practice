const express = require('express'); // Addressing to express framework's package
const app = express(); // running the express framework
const port = 8080; // setting the port

//defining response for the homepage
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Homepage</h1>')
})

// Defining a query string for example - https://www.reddit.com/search/?q=painting
app.get('/search', (req,res) => {
    // console.log(req.query); // displays all the query items
    const { q } = req.query;
    if(!q) {
        console.log('Nothing found if nothing searched')
    }
    res.send(`Search result for ${q}`);
    // res.send (`Here's your seach result for ${req.query}`)
})

// // Defining multi-level path for response
// app.get('/r/:subreddit/:postID', (req,res) => {
//     const { subreddit, postID } = req.params;
//     res.send(`<h1>Viewing post id: ${postID} under the path: ${subreddit}!</h1>`)
// })

// // Defining a pattern based path for response
// app.get('/r/:enterPath', (req, res) => {
//     const { enterPath } = req.params;
//     // const { pathValue } = req.params;
//     res.send(`This is a response to ${enterPath} path!`)
// })

// // defining response to a specific sub-page
// app.get('/cats', (req, res) => {
//     res.send('Meowwwwwwwwwwww')
// })

// Defining a post request. Check via postman for this for now
app.get('/cats', (req,res) => {
    res.send("This is a post request")
})

// defining a general response
app.get('*', (req, res) => {
    res.send('This is a default response to all unknown paths. This should come at the end otherwise code will exit without checking other paths')
})

// Starting the server
app.listen(port, () => {
    console.log(`Server started at ${port}`)
})