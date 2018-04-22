const express = require('express');     //require express to require route
const router = express.Router();        //require route module

// @route:        GET api/posts/test
// @description:  Tests posts route
// @access:       public
router.get('/test', (req, res) => res.json({msg : "Posts works"}));


module.exports = router;                //export router to the server.js
