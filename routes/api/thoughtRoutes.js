const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
  } = require('../../controllers/thoughtController');
  
  //Get all thoughts
  router.route('/')
        .get(getThoughts)
        //post a new thought
        .post(createThought)

  //Access single thought by id
router.route('/:thoughtId')
      //get a thought by id
      .get(getSingleThought)
      //update a thought by id
      .put(updateThought)
      //delete a thought by id
      .delete(deleteThought);

////create a reaction 
router.route('/:thoughtId/reactions')
      .post(addReaction);

//Delete a reaction
router.route('/:thoughtId/reactions/:reactionId')
      .delete(removeReaction);

module.exports = router;