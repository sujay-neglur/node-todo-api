const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if(error){
        return console.log('Unable to connect with database ',error);
    }
    console.log('Connected to database');
    db.collection('Todos').insertOne({
        text:'Something to do',
        completed:false
    }, (error,result) => {
        if(error){
            return console.log('unable to insert ',error);
        }
        console.log(JSON.stringify(result.ops,undefined,2));
    });

    db.collection('Users').insertOne({
        name:'Sujay',
        age:24,
        location:'Montreal'
    }, (error,result) => {
        if(error){
            return console.log('unable to insert ',error);
        }
        console.log(JSON.stringify(result.ops,undefined,2));
    });

    db.close();
});


