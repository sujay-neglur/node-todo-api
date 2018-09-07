const expect = require('expect');
const request= require('supertest');
const {app} = require('../server');
const{ObjectID}=require('mongodb');
const {Todo}= require('../models/todo');

todos=[{
    _id: new ObjectID(),
    text:'first to do'
},{
    _id:new ObjectID(),
    text:'second to do',
    completed:true,
    completedAt:333
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos)
    }).then(() => done());
});

describe('POST /todos',() => {
    it('should create a new todo', (done) => {
        var text= 'Test todo text';
        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect(response => {
            expect(response.body.text).toBe(text);
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }
            Todo.find({text}).then(todos => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch(err => done(err));
        });
    });

    it('should not create a todo with empty body', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
            if(err){
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(2)
                done();
            }).catch(err => done(err));
        });
    });
});

describe('GET /todos', () => {
    it('should get all the todos in the database', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect(result => {
            expect(result.body.todos.length).toBe(2);
        }).end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return a todo doc', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect(result => {
            expect(result.body.text).toBe(todos[0].text);
        }).end(done);
    });

    it('should return 404 for invalid object id', (done) => {
        request(app)
        .get(`/todos/${123}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 for doc not found',(done) => {
        request(app)
        .get(`/todos/${new ObjectID().toHexString()}`)
        .expect(404)
        .end(done);
    });
});

describe('PATCH /todos/:id', ()=> {
    it('should update the todo', (done) => {
       var hexId= todos[0]._id.toHexString();
       var updateObject={
        text:'editing first to do',
        completed:true
       }
       request(app)
       .patch(`/todos/${hexId}`)
       .send(updateObject)
       .expect(200)
       .expect((result) => {
           expect(result.body.text).toBe(updateObject.text);
           expect(result.body.completed).toBe(updateObject.completed);
           expect(result.body.completedAt).toBeA('number');
       }).end(done);

    });

    it('should toggle the complete attribute', (done) => {
       var hexId= todos[1]._id.toHexString();
       var updateObject={
           completed:false
       };
       request(app)
       .patch(`/todos/${hexId}`)
       .send(updateObject)
       .expect(200)
       .expect(result => {
           expect(result.body.completed).toBe(updateObject.completed);
           expect(result.body.completedAt).toNotExist();
       }).end(done);
    });
});