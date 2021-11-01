const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const { seed } = require('../db/seeds/seed.js');
const request = require('supertest');
const app = require('../app')

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('Get the categories', () => {
    test('should test the happy path for getting the categories', () => {
        return request(app)
        .get('/api/categories')
        .expect(200)
        .then(({body}) => {
            expect(body.categories.length).toBe(4)
            expect(body.categories[0]).toEqual({
                slug: 'euro game',
                description: 'Abstact games that involve little luck'
              })
        })
    });

    test('should show that if the wrong text is input that a message and 404 code is sent', () => {
        return request(app)
        .get('/api/cat')
        .expect(404)
        .then(({body}) => {
            expect (body).toEqual({"msg": "Route not found"})
        })
    });

    test('should test the good path for getting a review by id', () => {
        return request(app)
        .get('/api/reviews/1')
        .expect(200)
        .then(({body}) => {
            console.log(body)
            expect(body.reviews.length).toBe(1);
        })
    });

    test('should test the good path for getting a review by id', () => {
        return request(app)
        .get('/api/reviews/1')
        .expect(200)
        .then(({body}) => {
            expect(body.reviews[0]).toEqual({
                review_id: 1,
                title: 'Agricola',
                designer: 'Uwe Rosenberg',
                owner: 'mallionaire',
                review_img_url:
                  'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                review_body: 'Farmyard fun!',
                category: 'euro game',
                created_at: '2021-01-18T10:00:20.514Z',
                votes: 1
              });
        })
    });
    
});
