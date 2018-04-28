// Require modules
const express = require('express');               //express
const mongoose = require('mongoose');             //mongodb
const bodyParser = require('body-parser');        //bodyParser
const passport = require('passport');             //passport to auth users
const path = require('path');                     //pass module for production line

const users = require('./routes/api/users');      //users routes
const profiles = require('./routes/api/profiles');//profiles routes
const posts = require('./routes/api/posts');      //posts routes

// Initialize the express app
const app = express();


// Database setup
const db = require('./config/keys').mongoURL;     //db configuration with db address and username pswd
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected!'))
  .catch(error => console.log(error));            //db connection

// Middleware part
app.use(bodyParser.urlencoded({ extended : false })); //bodyParser middleware
app.use(bodyParser.json());                           //bodyParser middleware
app.use(passport.initialize());                       //passport middleware
require('./config/passport')(passport);               //passport configuration

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use('/static', express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}



// Routes

// @route:        GET api/posts/test
// @description:  Tests posts route
// @access:       public
app.get('/', (req, res) => {
  res.send('Hello');
});

// @route:        /api/users /api/profiles /api/posts
// @description:  link all the routes to the outside route folder
// @access:       depends
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);



// Listen to the port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}...`));
