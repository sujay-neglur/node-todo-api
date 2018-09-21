const {SHA256} = require('crypto-js');
const jwt= require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password='password1';

bcrypt.genSalt(10, (error, salt) => {
    bcrypt.hash(password,salt,(error, hash) => {
        console.log(hash);
        bcrypt.compare(password,hash, (error, result) => {
            console.log(result);
        });
    });
})

// var data= {
//     id:10
// };

// var token= jwt.sign(data,'somesecret');
// console.log(token);

// var decoded= jwt.verify(token,'somesecret');
// console.log(decoded);
// var message= 'I am sujay';

// var hash= SHA256(message);

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data={
//     id:4
// };

// var token={
//     data,
//     hash:SHA256(JSON.stringify(data)+'somesecret').toString()
// }

// // token.data.id=5;
// // token.hash=SHA256(JSON.stringify(token.data)).toString();

// var resultHash= SHA256(JSON.stringify(token.data)+'somesecret').toString();

// if(resultHash===token.hash){
//     console.log('Data not changed');
// }
// else{
//     console.log('Data was changed');
// }