const express = require('express');
const app = express();
const port = 3000
const userRoute = require('./routes/UserRoutes');
const db = require('./firebase');

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './src')

app.use('/users', userRoute)


app.listen(port, () => {
    console.log("Open host in port "+port);
});