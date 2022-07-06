const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const {signin,signup} = require('./controllers/auth');


const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { getTasks, addTask, updateTask, deleteTask } = require('./controllers/task');

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
            servers:['https://nodejs-web-application.herokuapp.com']
        }
    },

    apis : ['server.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));



let url = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.hfzng.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;

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

/**
 * @swagger
 * /task:
 *  
 *  get:
 *      summary : renders the taskpage
 *      description : task page contains buttons for adding task and viewing task
 *      responses : 
 *          '200' : 
 *              description : A successful response
 */

/**
 * @swagger
 * /tasks:
 *  
 *  get:
 *      summary : renders the tasks page
 *      description : task page views all the tasks
 *      responses : 
 *          '200' : 
 *              description : A successful response
 * 
 *  
 */

/**
 * @swagger
 * /addTask:
 *  
 *  get:
 *      summary : renders the add task page
 *      description : This page contains the form to add the task
 *      responses : 
 *          '200' : 
 *              description : A successful response
 * 
 *  post:
 *      summary : user submits the task details
 *      description : posting the new task 
 *      responses :
 *           '201' : 
 *               description : Adding the task is successful
 */


/**
 * @swagger
 * /editTask/:id:
 *  
 *  post:
 *      summary : edits the task
 *      description : edited task is reflected in the database
 *      responses : 
 *          '200' : 
 *              description : Task edited successfully
 */

/**
 * @swagger
 * /deleteTask/:id:
 *  
 *  get:
 *      summary : deletes the task
 *      description : deleted task is reflected in the database
 *      responses : 
 *          '200' : 
 *              description : Task deleted successfully
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

app.get('/task',(req,res) => {
    res.render('task')
})

app.get('/tasks',async(req,res) => {
    let {tasks} = await getTasks();

    res.render('viewTasks',{tasks})
})

app.get('/addtask',async(req,res) => {
    
    res.render('addTask')
});

app.get('/deleteTask/:id',async(req,res) => {

    let {message} = await deleteTask(req,res);
    res.render('status',{message})

})

app.post('/addTask',async(req,res) => {
    let {message} = await addTask(req,res);

    res.render('status',{message})
})

app.post('/editTask/:id',async(req,res) => {
    
    let {message} = await updateTask(req,res);

    res.render('status',{message})
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

