const {MongoClient, ObjectID}= require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
    if(err){
        return console.log(err);
    }

    console.log('Connected to database');

    db.collection('Users').findOneAndUpdate({
        _id:ObjectID('5b8da037d2335537c0d46bf6')
    }, {
        $inc:{
            age:1
        },
        $set:{
            name:'Mike'
        }
    },{
        returnOriginal:false
    }).then(result => console.log(result));
})