const { v4: uuidv4 } = require('uuid'); // I should add uuid to package.json if I use it, but I'll use simple ID for now

const bookings = [];

exports.createBooking = (req, res) => {
  try {
    const { userId, stationId, timeSlot } = req.body;

    if (!userId || !stationId || !timeSlot) {
      return res.status(400).json({
        success: false,
        message: 'Please provide userId, stationId, and timeSlot'
      });
    }

    const newBooking = {
      bookingId: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      userId,
      stationId,
      timeSlot,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };

    bookings.push(newBooking);

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: newBooking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error creating booking'
    });
  }
};

exports.getBookingById = (req, res) => {
  try {
    const booking = bookings.find(b => b.bookingId === req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error fetching booking'
    });
  }
};

exports.getAllUserBookings = (req, res) => {
    try {
      const userBookings = bookings.filter(b => b.userId === req.params.userId);
      res.status(200).json({
        success: true,
        count: userBookings.length,
        data: userBookings
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error fetching user bookings'
      });
    }
  };
