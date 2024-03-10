const express = require('express');
const app = express();
const fs = require('fs');

// Define routes for different pages

app.get('/', (req, res) => {
  // Handle homepage content
  res.send('<h1>Welcome to our Construction Management School!</h1>');
});

app.get('/students', (req, res) => {
  // Read student data from JSON file
  const filePath = 'students.json';

  if (!fs.existsSync(filePath)) {
    console.error(`Error: File '${filePath}' not found.`);
    process.exit(1); // Exit the script with an error code
  }

  const studentData = JSON.parse(fs.readFileSync(filePath));

  // Log studentData to the console to check its contents
  console.log('studentData:', studentData);

  // Generate HTML content dynamically using student data
  let studentList = '';
  for (const student of studentData) {
    studentList += `<li><a href="/students/${student.name}">${student.name}</a></li>`;
  }

  res.send(`
    <h1>Our Construction Management Students</h1>
    <ul>${studentList}</ul>
  `);
});

// Define routes for individual student pages with their details
app.get('/students/:studentName', (req, res) => {
  const studentName = req.params.studentName;

  // Read student data from JSON file
  const filePath = 'students.json';

  if (!fs.existsSync(filePath)) {
    console.error(`Error: File '${filePath}' not found.`);
    process.exit(1); // Exit the script with an error code
  }

  const studentData = JSON.parse(fs.readFileSync(filePath));

  // Log studentData to the console to check its contents
  console.log('studentData:', studentData);

  // Find the specific student data based on name
  const student = studentData.find(student => student.name === studentName);

  // Log the selected student to the console
  console.log('selected student:', student);

  if (!student) {
    // Handle case where student is not found (e.g., send a 404 error)
    res.status(404).send('Student not found!');
    return;
  }

  // Render the student page with their details using retrieved data
  res.send(`
    <h1>${student.name}</h1>
    <img src="${student.picture}" alt="${student.name}'s picture">
    <p>Phone: ${student.phone}</p>
    <p><a href="${student.resume}">View Resume</a></p>
    <p><a href="${student.linkedin}">LinkedIn Profile</a></p>
  `);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});