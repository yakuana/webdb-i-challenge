const express = require('express');

const db = require('./data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    db('accounts') 
        .then(posts => {
            res.status(200).json(posts); 
            // console.log(posts)
        })
        .catch(error => {
            res.status(500).json({
                message: "The server could not retrieve accounts data", 
                error: error
            })
        })
});

router.get('/:id', (req, res) => {
    const { id } = req.params 

    db('accounts')
        .where({ id }) 
        .first()
        .then(accounts => {
            // res.status(200).json(accounts[0]) 
            console.log(accounts)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Failed to get account with this id', 
                error: error 
            })
        })
});

router.post('/', (req, res) => {
    const newAccount = req.body; 
    
    db('accounts')
        .insert(newAccount, 'id') 
        .then(response  => {
            // res.status(200).json(accounts[0]) 
            console.log(response)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Failed to get account with this id', 
                error: error 
            })
        })


});

router.put('/:id', (req, res) => {
    const update = req.body; 

    db('accounts')
        .where('id', req.params.id)
        .update(update) 
        .then(accountNum  => {
            // res.status(200).json(accounts[0]) 
            console.log(`Updated account number ${accountNum}`)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Failed to get account with this id', 
                error: error 
            })
        })
});

router.delete('/:id', (req, res) => {
    db('accounts')
        .where({ id: req.params.id })
        .del()
        .then(accountNum  => {
            // res.status(200).json(accounts[0]) 
            console.log(`deleted account number ${accountNum}`)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Failed to get account with this id', 
                error: error 
            })
        })
});

module.exports = router;