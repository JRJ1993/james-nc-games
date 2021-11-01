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
    
});
