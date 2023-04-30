const route = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all the tips
route.get('/', (req, res) => {
  readFromFile('./Project/db/db.json').then((data) => res.send(data));
});

route.post('/', (req, res) => {
 
  const { title, text } = req.body;
  if (req.body) {
    const newNote = {
      
      title,
      text,
      id: uuidv4(),
    };
    readFromFile("./Project/db/db.json").then(data => {
      const parsedData = JSON.parse(data);
      parsedData.push(newNote);
      console.log(parsedData);
      writeToFile('./Project/db/db.json',parsedData);
      res.json(`Note added successfully 🚀`);
    })
    
  } else {
    res.error('Error in adding Note');
  }
});

route.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./Project/db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((idNote) => idNote.id !== noteId);
      writeToFile('./Project/db/db.json', result);

      // Respond to the DELETE request
      res.json();
    });
});


module.exports = route;