const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema (
    {
        //set custom Id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
        },
        reationBody: {
            type: String,
            required: true,
            maxLength: 250
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
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
            maxLength: 250
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
        // Use ReactionSchema to validate data
        reactions: [ReactionsSchema]
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
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

//Create the Thought model using the Thought schema
const Thought = model('Thought', ThoughtSchema);

//Export Thought module
module.exports = Thought