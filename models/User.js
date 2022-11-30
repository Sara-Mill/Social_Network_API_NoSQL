const { Schema, model } = require('mongoose');


// Schema to create User model
const UserSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        //use rgex to validate correct email
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
      },
      thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }],
      friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false
    }
  );

  //get total count of friends
  UserSchema.virtual('friendCount')
            .get(function() {
    return this.friends.length;
  })

  //create the User model using the User Schema
  const User = model('User', UserSchema);

  //Export User module
  module.exports = User;