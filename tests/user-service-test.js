process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let UserService = require('../services/UserService');
let User = require('../models/User');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

let user = {
    firstName: "John",
    lastName: "Doe",
    email: "john_doe@gmail.com",
    password: "11111111"
};
let userId = undefined;
let accessToken = undefined;

describe('UserService', () => {

    before((done) => {
        User.remove({}, (err) => {
            done();
        });
    });
    after((done) => {
        User.remove({}, (err) => {
            done();
        });
    });

    describe('/POST User', () => {
        it('it should create new user', (done) => {
            chai.request(server)
                .post('/user/save')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    userId = res.body._id;
                    done();
                });
        });
    });

    describe('/POST login', () => {
        it('it should not login user as such user does not exist', (done) => {
            let user = {
                email: "test@gmail.com",
                password: "test_password"
            };
            chai.request(server)
                .post('/user/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.have.property('error');
                    done();
                });
        });
        it('it should login user and return userId and accessToken', (done) => {
            chai.request(server)
                .post('/user/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('userId');
                    res.body.should.have.property('accessToken');
                    accessToken = res.body.accessToken;
                    done();
                });
        });
    });

    describe('/GET User', () => {
        it('it should get user by id using token authentication', (done) => {
            chai.request(server)
                .get('/user/get/' + userId)
                .set('authorization', accessToken)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('email');
                    res.body.should.have.property('firstName');
                    res.body.should.have.property('lastName');
                    res.body.should.not.have.property('password');
                    done();
                });
        });
    });


});