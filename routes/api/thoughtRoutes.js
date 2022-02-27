const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts <GET, POST>
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId <GET, PUT, DELETE>
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)

// /api/thoughts/:thoughtId/reactions <POST, DELETE>
router.route('/:thoughtId/reactions').post(createReaction)
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;