const {mongoose} = require('./../server/db/mongoose');
const {Todo}= require('../server/models/todo');
const{User}= require('../server/models/user');
const{ObjectID} =require('mongodb');

// var id ='5b90bee6567dbb2542991bdf';
// if(!ObjectID.isValid(id)){
//     console.log('invalid object id');
// }

// Todo.find({
//     _id:id
// }).then(todos => console.log('todos',todos));

// Todo.findOne({
//     _id:id
// }).then(todo => console.log('todo',todo));

// Todo.findById(id).then(todo => {
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('todo by id ',todo);
// }).catch(error => console.log(error));

//for users
User.findById({
    _id:'5b8dae8b0b5f234d8be899e1'
}).then(user => {
    if(!user){
        return console.log('User not found')
    }
    console.log('User', user);
}).catch(error => console.log(error));