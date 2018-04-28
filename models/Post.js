const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create a post Schema
const PostSchema = new Schema({
  user : {
    type : Schema.Types.ObjectId,
    ref : 'users'
  },
  text : {
    type : String,
    require : true
  },
  name : {
    type : String
  },
  avatar : {
    type : String
  },
  date : {
    type : Date,
    default : Date.now
  },
  likes : [
    {
      user : {
        type : Schema.Types.ObjectId,
        ref : 'users'
      }
    }
  ],
  dislikes : [
    {
      user : {
        type : Schema.Types.ObjectId,
        ref : 'users'
      }
    }
  ],
  comments : [
    {
      user : {
        type : Schema.Types.ObjectId,
        ref : 'users'
      },
      text : {
        type : String,
        require : true
      },
      name : {
        type : String
      },
      avatar : {
        type : String
      },
      date : {
        type : Date,
        default : Date.now
      }
    }
  ],
  views : [
    {
      user : {
        type : Schema.Types.ObjectId,
        ref : 'users'
      }
    }
  ]
});


module.exports = Post = mongoose.model('Posts', PostSchema);
