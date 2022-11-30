const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema (
    {
        //set custom Id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //Moment
            get: (createdAtVal) => moment(createdAtVal).format('MM DD, YYYY [at] hh:mm a')
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

//ThoughtSchema
const ThoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //Moment
            get: (createdAtVal) => moment(createdAtVal).format('MM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: String,
            required: true
        },
        // Use reactionSchema to validate data
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

//get total count of reactions
ThoughtSchema.virtual('reactionCount')
             .get(function() {
    return this.reactions.length;
});

//Create the Thought model using the Thought schema
const Thought = model('Thought', ThoughtSchema);

//Export Thought module
module.exports = Thought