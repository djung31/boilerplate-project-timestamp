const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

chai.should();
describe('/api/hello', () => {
  describe('GET /', () => {
    it('should say hello', done => {
      chai
        .request(app)
        .get('/api/hello/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});

describe('/api/timestamp/', () => {
  describe('GET /', () => {
    it('should respond with the current timestamps', function() {
      return chai
        .request(app)
        .get('/api/timestamp/')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.unix).to.be.a('number');
          expect(res.body.utc).to.be.a('string');
        });
    });
  });
  describe('GET /:date_string', () => {
    it('should respond with the correct timestamps', function() {
      return chai
        .request(app)
        .get('/api/timestamp/2015-12-25')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.unix).to.equal(1451001600000);
          expect(res.body.utc).to.equal('Fri, 25 Dec 2015 00:00:00 GMT');
        });
    });
    it('should respond with null/invalid if the param is invalid', function() {
      return chai
        .request(app)
        .get('/api/timestamp/1450137600000')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.unix).to.equal(null);
          expect(res.body.utc).to.equal('Invalid Date');
        });
    });
  });
});
