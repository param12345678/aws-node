let chai = require('chai');
let chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
let server = require('../server');
const request = require('supertest');

//Our parent block
describe('Podcast', () => {
   describe('/GET media', () => {
      it('it should GET all the podcast', (done) => {
         chai.request(server)
            .get('/media')
            .end((err, res) => {
               (res).should.have.status(200);
               (res.body).should.be.a('object');
               (res.body.podcasts.length).should.be.eql(1);
               done();
            });
      });
   });

   describe('/GET message', () => {
      it('it should GET a message', (done) => {
         chai.request(server)
            .get('/message')
            .end((err, res) => {
               (res).should.have.status(200);
               (res.body).should.be.a('object');
               done();
            });
      });
   });

   describe('=========check server url==============', () => {
      it('check get req.work or not ', (done) => {
         chai.request(server)
            .get('/')
            .end((err, res) => {
               (res).should.have.status(200);
               (res.body).should.be.a('object');
               done();
            });
      });
   });

   describe('POST Create User Wallet', () => {
      it('should create wallet for the user', () => {
          request(server)
          .post('123456/wallet')
          .send({})
          .expect(201)
          .then((res) => {
           expect(res.headers.location).to.be.eql('1');
           // more validations can be added here as required
      });
   });
  });

   // it('it should post data to the endpoint', (done) => {
   //    const data = {
   //       key1: 'value1',
   //       key2: 'value2',
   //    };
   //    chai.request(server)
   //       .post('/api/some-endpoint')
   //       .send(data)
   //       .end((err, res) => {
   //          res.should.have.status(200);
   //          res.body.should.be.a('object');
   //          res.body.should.have.property('message').eql('Data posted successful');
   //          done();
   //       });
   // });
})


