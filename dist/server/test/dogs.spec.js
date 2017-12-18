"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var chaiHttp = require("chai-http");
process.env.NODE_ENV = 'test';
var app_1 = require("../app");
var dog_1 = require("../models/dog");
var should = chai.use(chaiHttp).should();
describe('Dogs', function () {
    beforeEach(function (done) {
        dog_1.default.remove({}, function (err) {
            done();
        });
    });
    describe('Backend tests for dogs', function () {
        it('should get all the dogs', function (done) {
            chai.request(app_1.app)
                .get('/api/dogs')
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });
        it('should get dogs count', function (done) {
            chai.request(app_1.app)
                .get('/api/dogs/count')
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('number');
                res.body.should.be.eql(0);
                done();
            });
        });
        it('should create new dog', function (done) {
            var dog = new dog_1.default({ name: 'Fluffy', weight: 4, age: 2 });
            chai.request(app_1.app)
                .post('/api/dog')
                .send(dog)
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.a.property('name');
                res.body.should.have.a.property('weight');
                res.body.should.have.a.property('age');
                done();
            });
        });
        it('should get a dog by its id', function (done) {
            var dog = new dog_1.default({ name: 'Dog', weight: 2, age: 4 });
            dog.save(function (error, newDog) {
                chai.request(app_1.app)
                    .get("/api/dog/" + newDog.id)
                    .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('weight');
                    res.body.should.have.property('age');
                    res.body.should.have.property('_id').eql(newDog.id);
                    done();
                });
            });
        });
        it('should update a dog by its id', function (done) {
            var dog = new dog_1.default({ name: 'Dog', weight: 2, age: 4 });
            dog.save(function (error, newDog) {
                chai.request(app_1.app)
                    .put("/api/dog/" + newDog.id)
                    .send({ weight: 5 })
                    .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
            });
        });
        it('should delete a  by its id', function (done) {
            var dog = new dog_1.default({ name: 'Dog', weight: 2, age: 4 });
            dog.save(function (error, newDog) {
                chai.request(app_1.app)
                    .delete("/api/dog/" + newDog.id)
                    .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=dogs.spec.js.map