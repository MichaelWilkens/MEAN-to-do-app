const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Todo = require('./models/todo');
const path = require('path')

//heroku deployment port
const PORT = process.env.PORT || 4000;

//initialize express
const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client/dist/to-do-list')));



//express router 
const router = express.Router();

//routes
router.route('/todos').get((req, res) => {
    Todo.find((err, todos) => {
        if (err) {
            console.log(err)
        } else {
            res.json(todos)
        }
    });
});

router.route('/todo/:id').get((req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if (err) {
            console.log(err)
        } else {
            res.json(todo)
        }
    });
});

router.route('/todo/add').post((req, res) => {
    let todo = new Todo(req.body);
    todo.save().then(todo => {
        res.status(200).json({ 'todo': 'Added successfully' })
    })
    .catch(err => {
        res.status(400).send('Failed to create a new record')
    });
});

router.route('/todo/update/:id').post((req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if (!todo) {
            return next(new Error('Could not load the to-do item'))
        } else {
            todo.title = req.body.title;
            todo.isDone = req.body.isDone;
            todo.save().then(todo => {
                res.json('Update done')
            }).catch(err => {
                res.status(400).send('Update failed!')
            });
        };
    });
});

router.route('/todo/delete/:id').get((req, res) => {
    Todo.findByIdAndRemove({ _id: req.params.id }, (err, todo) => {
        if (err) {
            console.log(err)
        } else {
            res.json('Removed successfully!')
        };
    });
});

app.use('/', router);

// Create link to Angular build directory
// var distDir = __dirname + "/dist/";
// app.use(express.static(distDir));

app.get('*', function(req,res){
    // res.sendFile(path.join(__dirname, 'client/dist/to-do-list/index.html'))
    res.redirect('/');
})


//mLab heroku provision deployment server, or localhost for development
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/todo");

//mongoose connection
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection successful');
});

//listener
app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}!`);
});