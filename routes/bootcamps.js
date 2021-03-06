const express = require('express');
const { 
  getBootcamps, 
  getBootcamp, 
  newBootcamp, 
  updateBootcamp, 
  deleteBootcamp, 
  getBootcampsInRadius 
} = require('../controllers/bootcamps');

// Include other resource router
const courseRouter = require('./courses');

const router = express.Router();

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router
.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router
.route('/')
.get(getBootcamps)
.post(newBootcamp);

router
.route('/:id')
.get(getBootcamp)
.put(updateBootcamp)
.delete(deleteBootcamp);

module.exports = router;