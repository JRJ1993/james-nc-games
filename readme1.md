James-nc games readme,

the website - https://james-nc-games.herokuapp.com/api

the website is a small database of board games with reviews and comments on the reviews.

to clone this repo you need to use the command
- git clone https://github.com/JRJ1993/james-nc-games

to install the dependencies ues the command
- npm install

to seed the database locally use the command
- npm run setup-dbs

to run the tests in this project use the command
- npm run test

to create the two env files that will be need you will need to:
- create two new files .env.development and .env.test
- inside the .env.deployment file type PGDATABASE=nc_games
- inside the .env.test file type PGDATABASE=nc_games_test

you will need:
- Node.js v16.9.1
- Postgres 13.4