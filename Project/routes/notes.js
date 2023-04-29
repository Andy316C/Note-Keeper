const route = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all the tips
route.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.send(data));
});

route.post('/', (req, res) => {
 
  const { title, text } = req.body;
  if (req.body) {
    const newNote = {
      
      title,
      text,
      id: uuidv4(),
    };
    readFromFile("./db/db.json").then(data => {
      const parsedData = JSON.parse(data);
      parsedData.push(newNote);
      console.log(parsedData);
      writeToFile('./db/db.json',parsedData);
      res.json(`Note added successfully 🚀`);
    })
    
  } else {
    res.error('Error in adding Note');
  }
});


module.exports = route;