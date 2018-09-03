const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error,db) => {
    if(error){
        return console.log('Unable to connect with database ',error);
    }
    console.log('Connected to database');
    db.collection('Todos').find().toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs,undefined,2));
    }).catch((err) => {
        console.log(err);
    });
    
    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count: ${count}`);
    }).catch((err) => {
        console.log(err);
    });

    db.collection('Users').find({name:'Sujay'}).toArray().then((docs) => {
        console.log(docs);
    }).catch((err) => {
        console.log(err);
    });
})