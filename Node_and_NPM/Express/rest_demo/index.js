const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/tacos', (req,res) => {
    res.send('GET /tacos response')
})

app.post('/tacos', (req,res) => {
    const {meat, qty} = req.body;
    res.send(`Ok! here's your ${qty} quantities of ${meat}`)
    console.log(req.body);
})

app.listen(3000, () =>{
    console.log('Listening on port 3000!')
})
