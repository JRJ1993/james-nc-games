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

    test('should test the good path for getting a review by id showing that only one review returns', () => {
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

    test('should test the bad path for when a valid input is put in but with no review associated', () => {
        return request(app)
        .get('/api/reviews/99')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("review not found");
        })
    });

    test('should test the bad path for when an invalid input is put in', () => {
        return request(app)
        .get('/api/reviews/smell')
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Invalid request");
        })
    });

    test('should test the good path for getting the reviews in the correct formate', () => {
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

    test('should test the good path with the query of order_by showing the reviews in the correct formate', () => {
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

    test('should test the good path for getting a review with 2 queries of order_by and order in the correct formate', () => {
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

    test('should test the good path for getting a review with the query of category returning in the correct formate', () => {
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
    
    test('should test the good path for getting all the reviews that fit all the queries', () => {
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

    test('should test the bad path for when reviews is misspelt', () => {
        return request(app)
        .get('/api/reviws?order_by=owner')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("Route not found");
        })
    });

    test('should test the bad path for when one of the queries is misspelt', () => {
        return request(app)
        .get('/api/reviews?orde_f=jim')
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("there is nothing for that query");
        })
    });
    test('should test the bad path for when order query is an invalid input', () => {
        return request(app)
        .get('/api/reviews?order_by=stu')
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Invalid request");
        })
    });
    test('should test the bad path for when category has an invalid input', () => {
        return request(app)
        .get('/api/reviews?category=snad')
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("there is nothing for that query");
        })
    });

    test('should test the good path for getting a reviews comments', () => {
        return request(app)
        .get('/api/reviews/2/comments')
        .expect(200)
        .then(({body}) => {
            body.reviews.forEach((review) => {
                expect(review).toMatchObject(
                {   comment_id: expect.any(Number),
                    body: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    author: expect.any(String)
                  }
            );
        })
    })
    });

    test('should test the bad path for getting a review if the params is valid but has no review associated', () => {
        return request(app)
        .get('/api/reviews/99/comments')
        .expect(404)
        .then(({body}) => {
            expect(body).toEqual({msg:'review input must be a valid number'});
        })
    })

    test('should test the bad path for getting a review if comments is misspelt', () => {
        return request(app)
        .get('/api/reviews/1/coments')
        .expect(404)
        .then(({body}) => {
            expect(body).toEqual({msg:'Route not found'});
        })
    });

    test('should test the bad path for getting a review if the param is an invalid input', () => {
        return request(app)
        .get('/api/reviews/bub/comments')
        .expect(400)
        .then(({body}) => {
            expect(body).toEqual({msg:'review input must be in the form of a valid number'});
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

    test('should test the bad path if a valid input is used but inc_votes is misspelt', () => {
        let update = {inc_vtes: 5};
        return request(app)
        .patch('/api/reviews/1')
        .send(update)
        .expect(400)
        .then (({body}) => {
            expect(body.msg).toBe('this input is invalid');
        })
    });

    test('should test the bad path if a valid input is used but no information is associated', () => {
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

describe('Post', () => {
    test('should show the good path will add the new comment in the correct formate', () => {
        let newComment = {
            username: "mallionaire",
            body: "I am great at this game so it must be amazing as i dont play bad games that i suck at."
        };

        return request(app)
        .post('/api/reviews/1/comments')
        .send(newComment)
        .expect(201)
        .then (({body}) => {
            expect(body.comment.rows[0]).toMatchObject({
                comment_id:expect.any(Number),
                author: expect.any(String),
                review_id: expect.any(Number),
                votes: expect.any(Number),
                created_at: expect.any(String),
                body: expect.any(String)
            })
        })
    });

    test('should show the bad path throws an error if comments is misspelt', () => {
        let newComment = {
            username: "mallionaire",
            body: "I am great at this game so it must be amazing as i dont play bad games that i suck at."
        };

        return request(app)
        .post('/api/reviews/1/commnts')
        .send(newComment)
        .expect(404)
        .then (({body}) => {
            expect(body).toEqual({msg: 'Route not found'});
        })
    });

    test('should show the bad path if a valid input is used for review_id but nothing is associated', () => {
        let newComment = {
            username: "mallionaire",
            body: "I am great at this game so it must be amazing as i dont play bad games that i suck at."
        };

        return request(app)
        .post('/api/reviews/99/comments')
        .send(newComment)
        .expect(400)
        .then (({body}) => {
            expect(body).toEqual({msg: 'Invalid request'});
        })
    });
});

describe('Delete', () => {
    test('should delete a comment', () => {
        return request(app)
        .delete('/api/comments/1')
        .expect(204)
        .then (({body}) => {
            expect(body).toEqual({});
        })
    });

    test('should throw an error if comments is misspelt', () => {
        return request(app)
        .delete('/api/commets/1')
        .expect(404)
        .then (({body}) => {
            expect(body).toEqual({"msg": "Route not found"});
        })
    });

    test('should throw an error if an invalid input is used for the comment_id', () => {
        return request(app)
        .delete('/api/comments/bad')
        .expect(400)
        .then (({body}) => {
            expect(body).toEqual({msg:'review input must be in the form of a valid number'});
        })
    });
});