const express = require("express");
const {getCategories} = require('./controllers/getCategories');
const apiRouter = require('./routes/apiRouter');

const app = express();
app.use(express.json());

app.use("/api", apiRouter);

// app.all('/*', (req, res) => {
//     res.status(404).send({ msg: 'Route not found' });
//   });
  
  
  
//   app.use((err, req, res, next) => {
//     console.log(err);
//     res.sendStatus(500);
//   });
  
  
  module.exports = app;