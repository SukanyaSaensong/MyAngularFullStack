import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';
import { app } from '../app';
import Dog from '../models/dog';

const should = chai.use(chaiHttp).should();

describe('Dogs', () => {

  beforeEach(done => {
    Dog.remove({}, err => {
      done();
    });
  });

  describe('Backend tests for dogs', () => {

    it('should get all the dogs', done => {
      chai.request(app)
        .get('/api/dogs')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get dogs count', done => {
      chai.request(app)
        .get('/api/dogs/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('should create new dog', done => {
      const dog = new Dog({ name: 'Fluffy', weight: 4, age: 2 });
      chai.request(app)
        .post('/api/dog')
        .send(dog)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('name');
          res.body.should.have.a.property('weight');
          res.body.should.have.a.property('age');
          done();
        });
    });

    it('should get a dog by its id', done => {
      const dog = new Dog({ name: 'Dog', weight: 2, age: 4 });
      dog.save((error, newDog) => {
        chai.request(app)
          .get(`/api/dog/${newDog.id}`)
          .end((err, res) => {
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

    it('should update a dog by its id', done => {
      const dog = new Dog({ name: 'Dog', weight: 2, age: 4 });
      dog.save((error, newDog) => {
        chai.request(app)
          .put(`/api/dog/${newDog.id}`)
          .send({ weight: 5 })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should delete a  by its id', done => {
      const dog = new Dog({ name: 'Dog', weight: 2, age: 4 });
      dog.save((error, newDog) => {
        chai.request(app)
          .delete(`/api/dog/${newDog.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

});
