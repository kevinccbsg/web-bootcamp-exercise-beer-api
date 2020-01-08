const supertest = require('supertest');

const app = require('../app');
const loadDataFunction = require('../DB/loadDataFunction');
const { Beer } = require('../models');

describe('API tests', () => {
  const request = supertest(app);
  beforeEach(async () => {
    await loadDataFunction();
  });

  describe('User', () => {
    it('POST /v1/user/register', () =>
      request.post('/api/v1/user/register')
        .send({})
        .expect(400));

    it('POST /v1/user/register and get list', () =>
      request.post('/api/v1/user/register')
        .send({ name: 'kevin', email: 'kevin@gmail.com' })
        .expect(201)
        .then(({ body }) => {
          return request.get('/api/v1/beers')
            .set('x-api-key', body.user.apiKey)
            .expect(200)
        })
        .then(({ body }) => {
          body.beers.forEach(beer => {
            expect(beer.likes).toEqual(0);
            expect(beer.comments).toEqual([]);
          });
          expect(body.beers).toHaveLength(80);
        }));

    it('POST /v1/user/register and get beerItem', () =>
      request.post('/api/v1/user/register')
        .send({ name: 'kevin', email: 'kevin@gmail.com' })
        .expect(201)
        .then(({ body }) => {
          return request.get('/api/v1/beers/1')
            .set('x-api-key', body.user.apiKey)
            .expect(200)
        })
        .then(({ body }) => {
          expect(body).toHaveProperty('success');
          expect(body).toHaveProperty('beer');
        }));

    it('POST /v1/user/register and get beerItem', () =>
      request.post('/api/v1/user/register')
        .send({ name: 'kevin', email: 'kevin@gmail.com' })
        .expect(201)
        .then(({ body }) => {
          return request.get('/api/v1/beers/1')
            .set('x-api-key', body.user.apiKey)
            .expect(200)
        })
        .then(({ body }) => {
          expect(body).toHaveProperty('success');
          expect(body).toHaveProperty('beer');
        }));

    it('POST /v1/user/register and comment', () => {
      let apiKey = '';
      return request.post('/api/v1/user/register')
        .send({ name: 'kevin', email: 'kevin@gmail.com' })
        .expect(201)
        .then(({ body }) => {
          apiKey = body.user.apiKey;
          return request.post('/api/v1/beers/1/comment')
            .send({ comment: 'Lorem ipsum dolor' })
            .set('x-api-key', apiKey)
            .expect(202)
        })
        .then(({ body }) => {
          expect(body).toHaveProperty('success');
          expect(body).toHaveProperty('beer');
          expect(body.beer).not.toHaveProperty('comment');
          expect(body.beer.comments).toHaveLength(1);
        });
    });

    it('POST /v1/user/register and like', () => {
      let apiKey = '';
      return request.post('/api/v1/user/register')
        .send({ name: 'kevin', email: 'kevin@gmail.com' })
        .expect(201)
        .then(({ body }) => {
          apiKey = body.user.apiKey;
          return request.post('/api/v1/beers/1/like')
            .set('x-api-key', apiKey)
            .expect(202)
        })
        .then(({ body }) => {
          expect(body).toHaveProperty('success');
          expect(body).toHaveProperty('beer');
          expect(body.beer.likes).toEqual(1);
        });
    });

    it('Add comments and likes', () => {
      let apiKey = '';
      return request.post('/api/v1/user/register')
        .send({ name: 'kevin', email: 'kevin@gmail.com' })
        .expect(201)
        .then(({ body }) => {
          apiKey = body.user.apiKey;
          return Promise.all([
            request.post('/api/v1/beers/1/like')
              .set('x-api-key', apiKey)
              .expect(202),
            request.post('/api/v1/beers/1/comment')
              .send({ comment: 'Lorem ipsum dolor' })
              .set('x-api-key', apiKey)
              .expect(202)],
          );
        })
        .then(() => request.get('/api/v1/beers/1')
          .set('x-api-key', apiKey)
          .expect(200)
        )
        .then(({ body }) => {
          expect(body).toHaveProperty('success');
          expect(body).toHaveProperty('beer');
          expect(body.beer.likes).toEqual(1);
          expect(body.beer.comments).toHaveLength(1);
        });
    });
  });
});
