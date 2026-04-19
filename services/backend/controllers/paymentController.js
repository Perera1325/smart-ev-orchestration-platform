exports.processPayment = (req, res) => {
  try {
    const { bookingId, amount, paymentMethod } = req.body;

    if (!bookingId || !amount || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Please provide bookingId, amount, and paymentMethod'
      });
    }

    // Simulate payment processing
    // In a real app, this would call Stripe, PayPal, or a bank API
    const isSuccess = Math.random() > 0.1; // 90% success rate

    if (isSuccess) {
      res.status(200).json({
        success: true,
        transactionId: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        status: 'COMPLETED',
        message: 'Payment processed successfully',
        data: {
          bookingId,
          amount,
          currency: 'LKR',
          timestamp: new Date().toISOString()
        }
      });
    } else {
      res.status(402).json({
        success: false,
        status: 'FAILED',
        message: 'Payment declined by provider'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error processing payment'
    });
  }
};
