const expect = require('expect');
const request= require('supertest');
const {app} = require('../server');
const {Todo}= require('../models/todo');

todos=[{
    text:'first to do'
},{
    text:'second to do'
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