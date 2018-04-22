const express = require('express');     //require express to require route
const router = express.Router();        //require route module

// @route:        GET api/profiles/test
// @description:  Tests profiles route
// @access:       public
router.get('/test', (req, res) => res.json({msg : "Profiles works"}));


module.exports = router;                //export router to the server.js
