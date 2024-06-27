const express = require('express');
const data = require('./data.json');


const app = express();


app.set('view engine', 'pug');
app.use('/static', express.static('public'));



// GLOBAL things
app.use((req, res, next) => {
  res.locals.profilePic = '/static/images/profile.png';
  next();
});

// INDEX page things
app.get('/', (req, res) => {
   // res.locals
  const projects = data.projects;
 
  res.render('index', { 
    testText: "Testing Data from data.json",
    projectName: projects[3].project_name,
    projectDesc: projects[3].description,
    projectImage1: projects[3].image_urls[0]
  });
});

// ABOUT page things
app.get('/about', (req, res) => {
  res.render('about');
});



app.listen(3000, () => {
  console.log("The app is running on localhost:3000")
});















