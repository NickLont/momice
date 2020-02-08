const router = require('express').Router()
const eventsController = require('../controllers/events')

router.get('/all', eventsController.allEvents)
router.post('/event', eventsController.postEvent)
router.get('/event', eventsController.getEvent)
router.delete('/event', eventsController.deleteEvent)

module.exports = router
