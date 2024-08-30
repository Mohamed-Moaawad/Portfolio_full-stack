const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const port = 3000;
const app = express();
const DBconnection = require('./Config/DBconfig');
const PageRoute =  require('./Routes/PageRoute');
const LoginRoute = require('./Routes/LoginRoute');
const UserRoute = require('./Routes/UserRoute');
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin:'http://localhost:4200',
    methods: ['GET','POST','DELETE'],
    credentials :true
}));

DBconnection();

app.use('/user',UserRoute);
app.use('/login',LoginRoute);
app.use('/',PageRoute);
app.use('/home', (req, res, next) => {
    const pageName = req.params.pageName;
    express.static(path.join(__dirname, `Controllers/uploads/home`))(req, res, next);
});

app.use('/uploads/home', (req, res, next) => {
    const pageName = req.params.pageName;
    express.static(path.join(__dirname, `Controllers/uploads/home`))(req, res, next);
});

app.use('/:pageName', (req, res, next) => {
    const pageName = req.params.pageName;
    express.static(path.join(__dirname, `Controllers/uploads/${pageName}`))(req, res, next);
});
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})