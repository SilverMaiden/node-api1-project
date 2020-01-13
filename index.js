// implement your API here
//

const express = require('express');
const port = 5000;

const server = express();

const data = require('./data/db');


  server.get('/users', (req, res) => {
    data.find()
    .then(data => {
        res.status(200).json(data)
    })
    .catch(error => {
        console.log(error);
    })
})

  server.get('/users/:id', (req, res) => {
      data.findById(req.params.id)
      .then(data => {
          res.status(200).json(data)
      })
      .catch(error => {
          console.log(error);
      })
  })

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
})
