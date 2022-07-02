const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const {signin,signup} = require('./controllers/auth');


const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

env.config();

const app = express();

const swaggerOptions = {
    swaggerDefinition : {

        info : {
            title : 'User API',
            description : "User API information",
            contact : {
                name : "web developer"

            },
            servers:['http://localhost:5000']
        }
    },

    apis : ['server.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));



let url = 'mongodb://localhost:27017/Node_Web_Users';

app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

/**
 * @swagger
 * /:
 *  
 *  get:
 *      summary : renders the homepage
 *      description : rendering home page
 *      responses : 
 *          '200' : 
 *              description : A successful response
 */

/**
 * @swagger
 * /signup:
 *  
 *  get:
 *      summary : getting the user registration page
 *      description : rendering home page
 *      responses : 
 *          '200' : 
 *              description : A successful response
 *  post:
 *      summary : posting the user details for registering
 *      description : posting the user details
 *      responses :
 *           '201' : 
 *               description : User registration is successful
 */
/**
 * @swagger
 * /signin:
 *  
 *  get:
 *      summary : getting the user login page
 *      description : rendering home page
 *      responses : 
 *          '200' : 
 *              description : A successful response
 *  post:
 *      summary : user can login by posting correct credentials
 *      description : posting the user details
 *      responses :
 *           '201' : 
 *               description : User registration is successful
 */

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

