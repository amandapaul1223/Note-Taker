const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
const notes = require('./db/db.json');
const { receiveMessageOnPort } = require('worker_threads');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use('/api', api);

app.use(express.static('public'));



//GET Route for  homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//GET Route for saved notes in JSON
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  notes.push(req.body)
  fs.writeFileSync('./db/db.json', JSON.stringify(notes))
  res.json(notes);  
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
