const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if(error){
        return console.log(error);
    }
    console.log('Connected to database');
    // //deleteMany
    // db.collection('Users').deleteMany({name:'Andrew'}).then((result) => {
    //     console.log(result);
    // }).catch((err) => {
    //     console.log(err);
    // });

    //findOneAndDelete
    db.collection('Users').findOneAndDelete({
        _id:ObjectID('5b8d98dcd2335537c0d46b50')
    }).then(result => console.log(result));

});