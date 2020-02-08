const router = require('express').Router()
const guestsController = require('../controllers/guests')

router.get('/all', guestsController.allGuests)
router.post('/guest', guestsController.postGuest)
router.delete('/guest', guestsController.deleteGuest)

module.exports = router
