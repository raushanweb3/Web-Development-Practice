const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('All Dogs')
})

router.post('/', (req,res) => {
    res.send('Creating a new dog profile')
})

router.get('/:id', (req,res) => {
    res.send('Viewing one Dog')
})

router.get('/:id/edit', (req,res) => {
    res.send('Editing one dog profile')
})

module.exports = router;