const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');



app.use(express.urlencoded({ extended: true })); // Parsing req.body
app.use(express.json()); // parsing JSON
app.use(methodOverride('_method'));
app.set('view engine', 'ejs'); // including EJS
app.set('views', path.join(__dirname, 'views')); // setting up the views directory

// adding a fake comment list
let comments = [
    {
        id: uuid(),
        username: 'skyler',
        comment: 'I liskedfjhgfo lorem ushfd'
    },
    {
        id: uuid(),
        username: 'tyler',
        comment: 'He is a good doggu'
    },
    {
        id: uuid(),
        username: 'patrick',
        comment: 'Did you see that blue moon'
    },
    {
        id: uuid(),
        username: 'Rohit',
        comment: 'How good are donuts'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

// adding one comment and redirecting back to all comments page
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    res.redirect('/comments');
})


// Show route for viewing one particular resource
app.get('/comments/:id', (req, res) => {
    const { id } = req.params; //remember req.params always gives string output
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', { comment })
})

// Setting a route to create a form which can be used to edit the comment
// Patch request is not recognized by the browser. The browser only recognizes get and post request. Hence, we follow a work around that.
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit', { comment })
})


// Updating a particular comment block
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params; // extracting the id which was searched for
    const newCommentText = req.body.comment; // reading the response received for new comment
    const foundComment = comments.find(c => c.id === id); // finding the comment with the id searched for
    foundComment.comment = newCommentText; // replacing the comment portion of the entire comment object for the searched id, with the newly added comment
    res.redirect('/comments') // redirecting to the main all comments page
})

// deleting a comment. Again has a similar method-override bypass method
app.delete('/comments/:id', (req,res) => {
    const { id } = req.params; // extracting the id which was searched for
    comments = comments.filter(c => c.id !== id); // creating a new array excluding the comment block with the searched id
    res.redirect('/comments');
})


app.get('/tacos', (req, res) => {
    res.send('GET /tacos response');
})

app.post('/tacos', (req, res) => {
    res.send('POST /tacos response');
})

app.listen(3000, () => {
    console.log('Listening to port 3000!')
})


// ONE way of following REST compliant code
// post /comments - list all comments
// POST /comments - Create a new comment
// GET /comments/:id - Get one comment (using ID)
// PATCH /comments/:id - Update one comment
// DELETE /comments/:id - Destroy one comment

