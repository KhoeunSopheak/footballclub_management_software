const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    seatNumber: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['booked', 'canceled', 'pending'],
      default: 'booked',
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
