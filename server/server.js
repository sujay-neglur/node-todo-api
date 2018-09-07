const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const _ = require('lodash');

var app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json()); //middleware

app.post('/todos', (request, response) => {
    console.log(request.body);
    var todo = new Todo({
        text: request.body.text
    });
    todo.save().then(doc => response.send(doc), (err) => response.status(400).send(err));
});

app.get('/todos', (request, response) => {
    Todo.find().then((todos) => {
        response.send({ todos });
    }, (error) => response.status(400).send(error));
});

app.get('/todos/:id', (request, response) => {
    var id = request.params.id;
    console.log(id);
    if (!ObjectID.isValid(id)) {
        response.status(404).send();
    }
    Todo.findById({
        _id: id
    }).then(todo => {
        if (!todo) {
            response.status(404).send();
        }

        response.send(todo);
    }).catch(error => response.status(400).send());
});

app.delete('/todos/:id', (request, response) => {
    var id = request.params.id;
    if (!ObjectID.isValid(id)) {
        response.status(404).send();
    }

    Todo.findByIdAndRemove(id).then(todo => {
        if (!todo) {
            response.status(404).send();
        }

        response.send(todo);
    }).catch(error => console.log(error));
});

app.patch('/todos/:id', (request, response) => {
    var id = request.params.id;
    var body=_.pick(request.body, ['text','completed']);

    if(!ObjectID.isValid(id)){
        response.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt= new Date().getTime();
    }
    else{
        body.completedAt=null;
        body.completed=false;
    }

    Todo.findByIdAndUpdate(id, {$set:body}, {new:true}).then((todo) => {
        if(!todo){
            response.status(404).send();
        }
        response.send(todo);
    }).catch(e => response.status(400).send());
});

app.listen(port, () => console.log('Started on port ' + port));

module.exports = {
    app
}