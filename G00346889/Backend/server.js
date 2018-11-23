/*
    Cathal Butler - Node Express Server,GET & POST Requests.
    https://www.tutorialspoint.com/nodejs/nodejs_express_framework.htm

    INSTALLED PACKAGES:
    npm install express --save
    npm install body-parser --save
    npm install mongoose
    npm install -g nodemon          : https://nodemon.io/

    Help Webpages:
    https://mongoosejs.com/docs/index.html
    https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
*/
//Varables
var express = require('express');
var app = express();
var bodyParser = require('body-parser'); // Need for post methods

//Mongoose & mLab Variables
const mongoose = require('mongoose');
const usr = 'admin';
const passwrd = 'admin18';
const dbName = 'tasks';
const mongoDB = 'mongodb://' + usr + ':' + passwrd + '@ds117965.mlab.com:17965/' + dbName;

//CONNECTION TO DATABASE
mongoose.connect(mongoDB);
//Is the only current workaround for the findAndModify deprecation warning
mongoose.set('useFindAndModify', false);
//Get the default connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:')); //Print error if cant connect to DB

// Create application/x-www-form-urlencoded parser 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//ALLOW ACCRESS-CONTROL -  added the following lines to your server to avoid a CORS error
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS"); //Needed to stop access control error with methods
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//A data model using Schema Interface to represent the Post. 
//Define a schema
var Schema = mongoose.Schema;

var tastsSchema = new Schema({   //Title & content for creating and listing data
    task_name: String,
    note: String,
    priority: Number,
    date: String,
    isComplete: Boolean //Used for updaing if the task is complete
});
// Compile model from schema
var tastsModel = mongoose.model('tasks', tastsSchema);

/**
 * @title CREATE POST REQUEST.
 * @desc posts the created task data to the database.
 * @note pass a spread of docs and a callback. Logs the data to the server console.
 */
app.post('/api/tasks', function (req, res, err) {
    //Wrap in a responce to be used to dislpay message on server console.
    response = {
        task_name: req.body.task_name,
        note: req.body.note,
        priority: req.body.priority,
        date: req.body.date,
        isComplete: req.body.isComplete
    };
    console.log('\nTask added!\n', response, '\n');

    //Create post with 'title' & 'content' delivered to uMabDB
    tastsModel.create({
        task_name: req.body.task_name,
        note: req.body.note,
        priority: req.body.priority,
        date: req.body.date,
        isComplete: req.body.isComplete
    }, function (err, task) {
        if (err) return res.status(500).send("There was a problem adding the information to the database.");
        //Saved!
        res.status(200).send(task);//End res.status.json
    });//End create
});//End POST REQUEST function


/**
 * @title GET REQUEST, find().
 * @desc gets all tasks data from the database.
 * @note executes immediately, passing results to callback. Logs the data to the server console.
 */
app.get('/api/tasks/:isComplete', function (req, res) {
    tastsModel.find({
        isComplete: req.params.isComplete
    }, function (err, tasks) {
        if (err) return res.status(500).send("There was a problem finding the tasks.");
        res.status(200).send(tasks);
        console.log("\nRetrieved tasks from database:\n");
    });//End .find
});//End GET REQUEST

/**
 * @title DELETE REQUEST, findByIdAndRemove().
 * @desc deletes a task by its id number from the database.
 * @note executes immediately, passing results to callback. Logs the data to the server console.
 */
app.delete('/api/tasks/:id', function (req, res) {
    tastsModel.findByIdAndRemove(
        req.params.id
        , function (err, task) { //function take error arugement to handle any errors. Second parameters is data coming back from the server. 
            if (err) return res.status(500).send("There was a problem deleting the task.");
            res.status(200).json("Task " + task.task_name + " was deleted.");
            console.log('\nDelected taks from database\n'); //Log the delete
        });
});//End DELETE REQUEST

/**
 * @title GET REQUEST, findById()
 * @desc gets a task by its id number from the database.
 * @note executes immediately, passing results to callback. Logs the data to the server console.
 */
app.get('/api/tasks/edit/:id', function (req, res) { //Had to change link ending in order to stop the worng GET funtion being called in here by edit page
    tastsModel.find({ //findById() method returns data a different way to find()
        _id: req.params.id
    },
        function (err, task) {
            if (err) return res.status(500).send("There was a problem finding the task.");
            if (!task) return res.status(404).send("No task found.");
            res.status(200).send(task);
            console.log('\nTask found from database\n'); //Log the delete
        });
});// End GET REQUEST


/**
 * @title PUT REQUEST, findByIdAndUpdate().
 * @desc finds a task by its id number in the database and updates it.
 * @note executes immediately, passing results to callback. Logs the data to the server console.
 */
app.put('/api/tasks/edit/:id', function (req, res) {
    tastsModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        function (err, task) {
            if (err) return res.status(500).send("There was a problem updating the task.");
            res.status(200).send(task);
            console.log('\nTask updated in database\n'); //Log the delete
        });
});// End PUT REQUEST

/**
 * @title PUT REQUEST, findByIdAndUpdate().
 * @desc finds a task by its id number in the database and updates it.
 * @note executes immediately, passing results to callback. Logs the data to the server console.
 */
app.put('/api/tasks/update/:id', function (req, res) {
    tastsModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        function (err, task) {
            if (err) return res.status(500).send("There was a problem updating the task.");
            res.status(200).send(task);
            console.log('\nTask status has been updated in database\n', task); //Log the delete
        });
});// End PUT REQUEST

/**
 * @title PUT REQUEST, findByIdAndUpdate().
 * @desc finds a task by its id number in the database and updates it.
 * @note executes immediately, passing results to callback. Logs the data to the server console.
 */
app.put('/api/tasks/update/note/:id', function (req, res) {
    tastsModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        function (err, task) {
            if (err) return res.status(500).send("There was a problem updating the task.");
            res.status(200).send(task);
            console.log('\nTask status has been updated in database\n', task); //Log the delete
        });
});// End PUT REQUEST


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
});
