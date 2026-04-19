const express = require('express');
const router = express.Router();
const { createBooking, getBookingById, getAllUserBookings } = require('../controllers/bookingController');

router.post('/', createBooking);
router.get('/:id', getBookingById);
router.get('/user/:userId', getAllUserBookings);

module.exports = router;
