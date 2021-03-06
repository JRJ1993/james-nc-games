const db = require('../connection');
const format = require('pg-format');

 const seed = async (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  await db.query(`DROP TABLE IF EXISTS comments;`);
  await db.query(`DROP TABLE IF EXISTS reviews;`);
  await db.query(`DROP TABLE IF EXISTS users;`);
  await db.query(`DROP TABLE IF EXISTS categories;`);

  await db.query
  (`CREATE TABLE
   categories (
  slug VARCHAR PRIMARY KEY,
  description VARCHAR);`);
  await db.query
  (`CREATE TABLE 
  users (
  username VARCHAR PRIMARY KEY,
  avatar_url VARCHAR, 
  name VARCHAR);`);
  await db.query
  (`CREATE TABLE reviews 
  (review_id SERIAL PRIMARY KEY, 
  title VARCHAR, 
  review_body VARCHAR, 
  designer VARCHAR, 
  review_img_url VARCHAR DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg', 
  votes INT DEFAULT 0, 
  category VARCHAR REFERENCES categories(slug), 
  owner VARCHAR REFERENCES users(username), 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`);
  await db.query
  (`CREATE TABLE comments
  (comment_id SERIAL PRIMARY KEY,
  author VARCHAR REFERENCES users(username),
  review_id INT REFERENCES reviews(review_id),
  votes INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  body VARCHAR);`);
  const categoryStr = format(
  `INSERT INTO categories (
  slug,
  description
  ) VALUES %L RETURNING *;`, categoryData.map((categories) => {
    return [categories.slug, categories.description]
  }));
  await db.query(categoryStr);

  const userStr = format(
    `INSERT INTO users (
      username,
      avatar_url,
      name
    ) VALUES %L RETURNING *;`, userData.map((users) => {
      return [users.username, users.avatar_url, users.name]
    }));
    await db.query(userStr);

    const reviewStr = format(
      `INSERT INTO reviews (
        title,
        review_body,
        designer,
        review_img_url,
        votes,
        category,
        owner,
        created_at
      ) VALUES %L RETURNING *;`, reviewData.map((reviews) => {
        return [reviews.title, reviews.review_body, reviews.designer, reviews.review_img_url, reviews.votes, reviews.category, reviews.owner, reviews.created_at]
      }));
      await db.query(reviewStr);

      const commentStr = format(
        `INSERT INTO comments (
          author,
          review_id,
          votes,
          created_at,
          body
        ) VALUES %L RETURNING *;`, commentData.map((comments) => {
          return [comments.author, comments.review_id, comments.votes, comments.created_at, comments.body]
        }));
        await db.query(commentStr);
};

module.exports = {seed};
