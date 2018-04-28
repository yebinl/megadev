const express = require('express');     //require express to require route
const router = express.Router();        //require route module
const mongoose = require('mongoose');   //require the database
const passport = require('passport');   //require passport to protect the routes


//bring in the post schema
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

//bring in the validation
const validatePostInput = require('../../validation/post');

//all routes
//GET routes--------------------------------------------------------------------
// @route:        GET api/posts/test
// @description:  Tests posts route
// @access:       public
router.get('/test', (req, res) => res.json({msg : "Posts works"}));

// @route:        GET api/posts
// @description:  get posts
// @access:       public
router.get('/', (req, res) => {
  Post.find()
      .sort({ date : -1 })
      .then(post => res.json(post))
      .catch(error => res.status(404).json({ noposts : 'No posts found' }));
});

// @route:        GET api/posts/:post_id
// @description:  get single post by id
// @access:       public
router.get('/:post_id', (req, res) => {
  Post.findById(req.params.post_id)
      .then(post => res.json(post))
      .catch(error => res.status(404).json({ nopostfound : 'No post found with that ID' }));
});


//POST routes--------------------------------------------------------------------
// @route:        POST api/posts
// @description:  create a post for current user
// @access:       private
router.post('/', passport.authenticate('jwt', {session : false}), (req, res) => {
  //check validation first
  const {errors, isValid} = validatePostInput(req.body);
  if(!isValid) {
    //if any errors, send 400 with errors object
    return res.status(400).json(errors);
  }
//create a new post and grab all the infos
  const newPost = new Post({
    text : req.body.text,
    name : req.body.name,
    avatar : req.body.avatar,
    user : req.user.id
  });
  //save the new post to mongodb
  newPost.save()
        .then(post => res.json(post))
        .catch(error => res.status(400).json({ post : 'Ops... Some problems happened. Please try again.' }));
});

// @route:        POST api/posts/like/:post_id
// @description:  post a request to like a post
// @access:       private
router.post("/like/:post_id", passport.authenticate('jwt', {session : false}), (req, res) => {
  //use user id to find the profile, in order to prevent someone use other software to delete data
  Profile.findOne({ user : req.user.id })
        .then(profile => {
          Post.findById(req.params.post_id)
              .then(post => {
                //check if the user already liked it
                if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                  return res.status(400).json({ alreadyliked : 'You have already liked this post'});
                } else {
                  //add user id to likes array
                  post.likes.unshift({ user : req.user.id });
                  post.save().then(post => res.json(post))
                  .catch(error => res.status(400).json({ post : 'Ops... Some problems happened. Please try again.' }));
                }
              }).catch(error => res.status(404).json({postnotfound : 'No such post'}));
        }).catch(error => res.status(401).json({ notauthorized : 'User not authorized' }));
});

// @route:        POST api/posts/unlike/:post_id
// @description:  post a request to unlike a post
// @access:       private
router.post("/unlike/:post_id", passport.authenticate('jwt', {session : false}), (req, res) => {
  //use user id to find the profile, in order to prevent someone use other software to delete data
  Profile.findOne({ user : req.user.id })
        .then(profile => {
          Post.findById(req.params.post_id)
              .then(post => {
                //check if the user already liked it
                if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                  return res.status(400).json({ notliked : 'You haven\'t liked this post yet'});
                } else {
                  //remove user id from likes array
                  //get the remove index first
                  const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);
                  if (removeIndex > -1) {
                    //splice out of array
                    post.likes.splice(removeIndex, 1);
                  } else if (removeIndex === -1) {
                    //no such like
                    return res.status(404).json({ notliked : 'You haven\'t liked this post yet'});
                  }
                  post.save().then(post => res.json(post))
                  .catch(error => res.status(400).json({ post : 'Ops... Some problems happened. Please try again.' }));
                }
              }).catch(error => res.status(404).json({postnotfound : 'No such post'}));
        }).catch(error => res.status(401).json({ notauthorized : 'User not authorized' }));
});

// @route:        POST api/posts/dislike/:post_id
// @description:  post a request to dislike a post
// @access:       private
router.post("/dislike/:post_id", passport.authenticate('jwt', {session : false}), (req, res) => {
  //use user id to find the profile, in order to prevent someone use other software to delete data
  Profile.findOne({ user : req.user.id })
        .then(profile => {
          Post.findById(req.params.post_id)
              .then(post => {
                //check if the user already disliked it
                if(post.dislikes.filter(dislike => dislike.user.toString() === req.user.id).length > 0) {
                  return res.status(400).json({ alreadydisliked : 'You have already disliked this post'});
                } else {
                  //add user id to dislikes array
                  post.dislikes.unshift({ user : req.user.id });
                  post.save().then(post => res.json(post))
                  .catch(error => res.status(400).json({ post : 'Ops... Some problems happened. Please try again.' }));
                }
              }).catch(error => res.status(404).json({postnotfound : 'No such post'}));
        }).catch(error => res.status(401).json({ notauthorized : 'User not authorized' }));
});

// @route:        POST api/posts/undislike/:post_id
// @description:  post a request to unlike a post
// @access:       private
router.post("/undislike/:post_id", passport.authenticate('jwt', {session : false}), (req, res) => {
  //use user id to find the profile, in order to prevent someone use other software to delete data
  Profile.findOne({ user : req.user.id })
        .then(profile => {
          Post.findById(req.params.post_id)
              .then(post => {
                //check if the user already disliked it
                if(post.dislikes.filter(dislike => dislike.user.toString() === req.user.id).length === 0) {
                  return res.status(400).json({ notdisliked : 'You didn\'t dislike this post before'});
                } else {
                  //remove user id from dislikes array
                  //get the remove index first
                  const removeIndex = post.dislikes.map(item => item.user.toString()).indexOf(req.user.id);
                  if (removeIndex > -1) {
                    //splice out of array
                    post.dislikes.splice(removeIndex, 1);
                  } else if (removeIndex === -1) {
                    //no such dislike
                    return res.status(404).json({ notdisliked : 'You haven\'t liked this post yet'});
                  }
                  post.save().then(post => res.json(post))
                  .catch(error => res.status(400).json({ post : 'Ops... Some problems happened. Please try again.' }));
                }
              }).catch(error => res.status(404).json({postnotfound : 'No such post'}));
        }).catch(error => res.status(401).json({ notauthorized : 'User not authorized' }));
});

// @route:        POST api/posts/comment/:post_id
// @description:  post a comment to a post
// @access:       private
router.post('/comment/:post_id', passport.authenticate('jwt', {session : false}), (req, res) => {
  const {errors, isValid} = validatePostInput(req.body);
  if(!isValid) {
    //if any errors, send 400 with errors object
    return res.status(400).json(errors);
  }
  Post.findById(req.params.post_id)
      .then(post => {
        //create a new comment
        const newComment = {
          text : req.body.text,
          name : req.body.name,
          avatar : req.body.avatar,
          user : req.user.id
        }
        //add to comments array
        post.comments.unshift(newComment);
        post.save().then(post => res.json(post))
        .catch(error => res.status(400).json({ post : 'Ops... Some problems happened. Please try again.' }));;
      })
      .catch(error => res.status(404).json({ postnotfound : 'No such post'}));
});


//DELETE routes--------------------------------------------------------------------
// @route:        DELETE api/posts/:post_id
// @description:  delete a post for current user
// @access:       private
router.delete("/:post_id", passport.authenticate('jwt', {session : false}), (req, res) => {
  //use user id to find the profile, in order to prevent someone use other software to delete data
  Profile.findOne({ user : req.user.id })
        .then(profile => {
          Post.findById(req.params.post_id)
              .then(post => {
                //check the post owner
                if(post.user.toString() !== req.user.id) {
                  return res.status(401).json({ notauthorized : 'User not authorized' });
                } else {
                  //delete the post
                  post.remove()
                      .then(() => res.json({success : true}))
                      .catch(error => res.status(400).json({ post : 'Ops... Some problems happened. Please try again.' }));
                }
              }).catch(error => res.status(404).json({postnotfound : 'No such post'}));
        }).catch(error => res.status(401).json({ notauthorized : 'User not authorized' }));
});

// @route:        DELETE api/posts/comment/:post_id/:comment_id
// @description:  delete a comment from a post
// @access:       private
router.delete("/comment/:post_id/:comment_id", passport.authenticate('jwt', {session : false}), (req, res) => {
  Post.findById(req.params.post_id)
      .then(post => {
        //check if comment exists
        if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
          //comment not found
          res.status(404).json({ commentnotexists : 'Comment does not exist'});
        } else {
          //remove comment from comments array
          //get the remove index first
          const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);
          if (removeIndex > -1) {
            //splice out of array
            post.comments.splice(removeIndex, 1);
          } else if (removeIndex === -1) {
            //no such comment
            return res.status(404).json({ nocomment : 'You haven\'t commented this post yet'});
          }
          post.save().then(post => res.json(post))
          .catch(error => res.status(400).json({ post : 'Ops... Some problems happened. Please try again.' }));
        }
      })
      .catch(error => res.status(400).json({ post : 'Ops... Some problems happened. Please try again.' }));
});



module.exports = router;                //export router to the server.js
