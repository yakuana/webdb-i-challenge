const express = require('express');

const db = require('./data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    db('accounts') 
        .then(posts => {
            res.status(200).json(posts); 
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
            res.status(200).json(accounts) 
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
            res.status(200).json(response) 
        })
        .catch(error => {
            res.status(500).json({
                message: 'Failed to add account', 
                error: error 
            })
        })


});

router.put('/:id', (req, res) => {
    const update = req.body; 
    const { id } = req.params

    db('accounts')
        .where('id', id)
        .update(update) 
        .then(response  => {
            if (response === 1) {
                console.log(`Updated account number ${id}`)
            } else {
                console.log(`Unsuccessful update of account number ${id}`)
            }
            res.status(200).json(response) 
            
        })
        .catch(error => {
            res.status(500).json({
                message: 'Failed to update account with this id', 
                error: error 
            })
        })
});

router.delete('/:id', (req, res) => {
    db('accounts')
        .where({ id: req.params.id })
        .del()
        .then(response  => {
            if (response === 1) {
                console.log(`Deleted account number ${req.params.id}`)
            } else {
                console.log(`Could not delete account number ${req.params.id}`)
            }
            res.status(200).json(response)
            
        })
        .catch(error => {
            res.status(500).json({
                message: 'Failed to delete account with this id', 
                error: error 
            })
        })
});

module.exports = router;