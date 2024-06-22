const express = require('express');
const route = express.Router();
const db = require('../firebase')

route.get('/', (req, res) => {
    res.render('index', {title: "Principal", mensage: "Hello, world!"});
});

route.post('/add', (req, res) => {
    try {
        const data = req.query;
        db.ref('users/').push(data);
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

route.put('/updateuser/:Userid', (req, res) =>{
    try {

        const id = req.params.Userid;
        const data = req.query;

        const userRef = db.ref('users/');
        const snap = userRef.orderByChild('id').equalTo(id).once('value', (snapshot)=>{
            if(snapshot.exists()){
                const updates = {};
                snapshot.forEach(childSnapshot => {
                    updates[childSnapshot.key] = data;
                });

                userRef.update(updates);
                res.status(200).send('User updated!')
            }else{
                res.status(404).send("User not found.");
            }
        });
    } catch (error) {
        res.status(500).send("Error: "+error);
    }
});

route.delete('/deleteuser/:Userid', (req, res) => {
    try {
        
        const id = req.params.Userid;

        const userRef = db.ref('users');
        userRef.orderByChild('id').equalTo(id).once('value', (snapshot) => {
            if(snapshot.exists()){
                const d = {};
                snapshot.forEach(chilSnapshot => {
                    d[chilSnapshot.key] = null;
                });

                userRef.update(d);
                res.status(200).send("User deleted");
            }else{
                res.status(404).send('User not found!');
            }
        })
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = route;