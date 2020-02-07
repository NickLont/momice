const router = require('express').Router()
// const catchErrors = require('../handlers/errorHandlers').catchErrors
const eventsController = require('../controllers/events')

router.get('/all', eventsController.allEvents)
router.post('/event', eventsController.postEvent)
router.get('/event', eventsController.getEvent)

module.exports = router
