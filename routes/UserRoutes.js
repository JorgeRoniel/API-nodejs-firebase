const express = require('express');
const route = express.Router();
const userController = require('../controllers/UserController');
const db = require("../firebase")

route.get('/', (req, res) => {
    res.render('index', {title: "Principal", mensage: "Hello, world!"});
});

route.post('/add', (req, res) => {
    try {
        const data = req.query;
        const docRef = db.ref('users/').push(data);
        res.status(200).send("User add!");
    } catch (error) {
        res.status(500).send("Erro:"+error);
    }
});

route.get('/listusers', (req,res)=>{
    
    const data = db.ref('users/');

    data.once('value', (snapshot) =>{
        const dt = snapshot.val();
        res.status(200).json(dt);
    })
});

module.exports = route;