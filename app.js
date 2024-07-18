const express = require('express');
const data = require('./data.json');
const projects = data.projects;

const app = express();


app.set('view engine', 'pug');
app.use('/static', express.static('public'));



// GLOBAL things
app.use((req, res, next) => {
  res.locals.profilePic = '/static/images/profile2.jpg';
  next();
});

// INDEX page things
app.get('/', (req, res) => {
  res.render('index', { projects });
});


// ABOUT page things
app.get('/about', (req, res) => {
  res.render('about');
  
});


// PROJECT pages
app.get('/project/:id', (req, res) => {
  const singleProj = projects[req.params.id];

  res.render('project', { 
    projectName: singleProj.project_name,
    projectDesc: singleProj.description,
    technologies: singleProj.technologies,
    projectImage1: singleProj.image_urls[0],
    projectImage2: singleProj.image_urls[1],
    projectImage3: singleProj.image_urls[2],
    screenshotAlt: "A screenshot of the project",
    liveDemo: singleProj.live_link,
    gitHubLink: singleProj.github_link
    
  });
});


/* ERROR HANDLERS */

/* 404 handler */ 
app.use((req, res, next) => {
  const err = new Error("This page does not exist.");
  err.status = 404;
  console.log("404 error. This page does not exist.");
  next(err);
});

/* Global error handler */
app.use((err, req, res, next) => {
  if ( err.status === 404 ) {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');  
  } else {
    err.message = "There's been a server error."
    res.locals.error = err;
    res.status(err.status);
    res.render('error'); 
  }
  
});


app.listen(3000, () => {
  console.log("The app is running on localhost:3000")
});















