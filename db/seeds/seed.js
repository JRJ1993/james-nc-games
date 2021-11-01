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
  body VARCHAR);`)
};

module.exports = seed;
