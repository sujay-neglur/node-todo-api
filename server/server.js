var express= require('express');
var bodyParser= require('body-parser');

var {mongoose}= require('./db/mongoose');
var {Todo}= require('./models/todo');
var {User}= require('./models/user');

var app =express();
app.use(bodyParser.json()); //middleware

app.post('/todos', (request, response) => {
    console.log(request.body);
    var todo= new Todo({
        text:request.body.text
    });
    todo.save().then(doc => response.send(doc), (err) => response.status(400).send(err));
});

app.listen(3000, () => console.log('Started on port 3000'));

