// app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Sample data (replace with your student data)
const students = [
  { id: 1, name: 'John Doe', picture: 'john.jpg', resume: 'john_resume.pdf', website: 'http://john.com' },
  { id: 2, name: 'Jane Smith', picture: 'jane.jpg', resume: 'jane_resume.pdf', website: 'http://jane.com' },
  // Add more students...
];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Render the search form
app.get('/', (req, res) => {
  res.render('index');
});

// Handle the search request
app.post('/search', (req, res) => {
  const query = req.body.query.toLowerCase();
  const results = students.filter(student => student.name.toLowerCase().includes(query));
  res.render('index', { results });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});