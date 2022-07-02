const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const {signin,signup} = require('./controllers/auth');
env.config();

const app = express();

let url = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.hfzng.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;

app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.get('/',(req,res) => {

    res.render('home')
})

app.get('/signup',(req,res) => {
    res.render('signup')
})

app.get('/signin',(req,res) => {
    res.render('login')
})

app.post('/signup',async(req,res) => {
    let {message} = await signup(req,res);

    
    res.render('status',{message})
});

app.post('/signin',async(req,res) => {
    let message = await signin(req,res);

    


    res.render('status',{message});
});




mongoose.connect(url,{useNewUrlParser : true, useUnifiedTopology : true})
.then(() => {
    console.log('Database connected ...');
})
.catch((error) => {
    console.log(error.message)
})


app.listen(process.env.PORT,() => {
    console.log(`Server started running on the port ${process.env.PORT}`);
})

