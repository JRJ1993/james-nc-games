const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const { seed } = require('../db/seeds/seed.js');
const request = require('supertest');
const app = require('../app')

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('Get', () => {
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
                votes: 1,
                comment_count: "0"
              });
        })
    });

    test('should test the bad path for when something is misspelt', () => {
        return request(app)
        .get('/api/reviws/1')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("Route not found");
        })
    });

    test('should test the bad path for when a valid input is put in but with no thing', () => {
        return request(app)
        .get('/api/reviews/99')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("review not found");
        })
    });

    test('should test the bad path for when a valid input is put in but with no thing', () => {
        return request(app)
        .get('/api/reviews/smell')
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Invalid request");
        })
    });

    test('should test the good path for getting a review', () => {
        return request(app)
        .get('/api/reviews')
        .expect(200)
        .then(({body}) => {
            body.reviews.forEach((review) => {
                expect(review).toMatchObject(
                {   review_id: expect.any(Number),
                    title: expect.any(String),
                    designer: expect.any(String),
                    owner: expect.any(String),
                    review_img_url:
                    expect.any(String),
                    review_body: expect.any(String),
                    category: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    comment_count: expect.any(String)
                  }
            );
        })
    })
    });

    test('should test the good path for getting a review', () => {
        return request(app)
        .get('/api/reviews/?order_by=owner')
        .expect(200)
        .then(({body}) => {
            body.reviews.forEach((review) => {
                expect(review).toMatchObject(
                {   review_id: expect.any(Number),
                    title: expect.any(String),
                    designer: expect.any(String),
                    owner: expect.any(String),
                    review_img_url:
                    expect.any(String),
                    review_body: expect.any(String),
                    category: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    comment_count: expect.any(String)
                  }
            );
        })
    })
    });

    test('should test the good path for getting a review', () => {
        return request(app)
        .get('/api/reviews/?order_by=owner&order=asc')
        .expect(200)
        .then(({body}) => {
            body.reviews.forEach((review) => {
                expect(review).toMatchObject(
                {   review_id: expect.any(Number),
                    title: expect.any(String),
                    designer: expect.any(String),
                    owner: expect.any(String),
                    review_img_url:
                    expect.any(String),
                    review_body: expect.any(String),
                    category: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    comment_count: expect.any(String)
                  }
            );
        })
    })
    });

    test('should test the good path for getting a review', () => {
        return request(app)
        .get('/api/reviews/?category=dexterity')
        .expect(200)
        .then(({body}) => {
            body.reviews.forEach((review) => {
                expect(review).toMatchObject(
                {   review_id: expect.any(Number),
                    title: expect.any(String),
                    designer: expect.any(String),
                    owner: expect.any(String),
                    review_img_url:
                    expect.any(String),
                    review_body: expect.any(String),
                    category: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    comment_count: expect.any(String)
                  }
            );
        })
    })
    });
    
    test('should test the good path for getting a review', () => {
        return request(app)
        .get('/api/reviews/?order_by=owner&order=desc&category=dexterity')
        .expect(200)
        .then(({body}) => {
            body.reviews.forEach((review) => {
                expect(review).toMatchObject(
                {   review_id: expect.any(Number),
                    title: expect.any(String),
                    designer: expect.any(String),
                    owner: expect.any(String),
                    review_img_url:
                    expect.any(String),
                    review_body: expect.any(String),
                    category: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    comment_count: expect.any(String)
                  }
            );
        })
    })
    });

    
    
});

describe('Patch', () => {
    test('should update the review with the given info', () => {
        let update = {inc_votes: 2};
        return request(app)
        .patch('/api/reviews/1')
        .send(update)
        .expect(200)
        .then (({body}) => {
            expect(body.reviews.votes).toBe(3);
        })
    });

    test('should test the bad path if an invalid input is used', () => {
        let update = {inc_votes: 'sandwich'};
        return request(app)
        .patch('/api/reviews/1')
        .send(update)
        .expect(400)
        .then (({body}) => {
            expect(body.msg).toBe('this input is invalid');
        })
    });

    test('should test the bad path if an invalid input is used', () => {
        let update = {inc_vtes: 5};
        return request(app)
        .patch('/api/reviews/1')
        .send(update)
        .expect(400)
        .then (({body}) => {
            expect(body.msg).toBe('this input is invalid');
        })
    });

    test('should test the bad path if an invalid input is used', () => {
        let update = {inc_votes: 5};
        return request(app)
        .patch('/api/reviews/999')
        .send(update)
        .expect(404)
        .then (({body}) => {
            expect(body.msg).toBe('review not found');
        })
    });

    test('should test the bad path if an invalid input is used', () => {
        let update = {inc_votes: 5};
        return request(app)
        .patch('/api/reviews/sand')
        .send(update)
        .expect(400)
        .then (({body}) => {
            expect(body.msg).toBe('Invalid request');
        })
    });
});
