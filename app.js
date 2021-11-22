const express = require("express");
const apiRouter = require('./routes/apiRouter');

const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.all('/*', (req, res, next) => {
    res.status(404).send({ msg: 'Route not found' });
  });


  app.use((err, req, res, next) => {
    if (err.code === '22P02') {
    res.status(400).send({msg: 'Invalid request'})
    } else {
      next(err)
    }
  })

  app.use((err, req, res, next) => {
    if (err.code === '42703') {
    res.status(400).send({msg: 'Invalid request'})
    } else {
      next(err)
    }
  })

  app.use((err, req, res, next) => {
    if (err.code === '23503') {
    res.status(400).send({msg: 'Invalid request'})
    } else {
      next(err)
    }
  })

  app.use((err, req, res, next) => {
    if(err.status && err.msg) {
      res.status(err.status).send({msg: err.msg})
    } else {
      next(err)
    }
  })
  
  app.use((err, req, res, next) => {
    console.log(err);
    res.sendStatus(500);
  });
  
  
  module.exports = app;