const express = require('express');     //require express to require route
const router = express.Router();        //require route module

// @route:        GET api/users/test
// @description:  Tests users route
// @access:       public
router.get('/test', (req, res) => res.json({msg : "Users works"}));


module.exports = router;                //export router to the server.js
