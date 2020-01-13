// implement your API here
//

const express = require('express');
const port = 5000;


const data = require('./data/db.js');
const server = express();

server.use(express.json());

//GET all users

  server.get('/api/users', (req, res) => {
    data.find()
    .then(data => {
        res.status(200).json(data)
    })
    .catch(error => {
        res.status(500).json({errorMessage: "The users information could not be retrieved."})
    })
})

//GET user by id
  server.get('/api/users/:id', (req, res) => {
      data.findById(req.params.id)
      .then(data => {
          if (data !== undefined) {
              res.status(200).json(data)
          } else {
              res.status(400).json({message: "The user with the specified ID does not exist."})
          }
      })
      .catch(error => {
          res.status(500).json({errorMessage: "The user information could not be retrieved."})
      })
  })

//POST user
  server.post("/api/users", (req, res) => {
      console.log(req.body)
      const myData = req.body;

      if (myData.name === undefined || myData.bio === undefined) {
          res.status(400).json(`Bad request`)
      } else {
          data.insert(myData)
          .then(data => {
              res.status(201).send(data)
          })
          .catch(error => {
              res.status(500).json({errorMessage: "There was an error while saving the user to the database"})
          })

      }
  })

  //DELETE user
  server.delete("/api/users/:id", (req, res) => {
      const myData = req.params;
      data.remove(myData.id)
      .then(data => {
          if (data !== undefined) {
              res.status(200).json(data);
          } else {
              res.status(404).json({ message: "The user with the specified ID does not exist." })
          }
      })
      .catch(error => {
          res.status(500).json( {errorMessage: "The user could not be removed" })
      })

  })

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
})
