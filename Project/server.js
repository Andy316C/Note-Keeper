// Import Express.js
const express = require('express');
// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');
// Initialize an instance of Express.js
const api= require("./routes");
const app = express();
const PORT = 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', api);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
)

// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);