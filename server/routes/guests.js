const router = require('express').Router()
const guestsController = require('../controllers/guests')

router.get('/all', guestsController.allGuests)
router.post('/guest', guestsController.postGuest)
// router.get('/guest', guestsController.getEvent)
// router.delete('/guest', guestsController.deleteEvent)

module.exports = router
