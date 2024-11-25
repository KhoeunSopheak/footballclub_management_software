const Ticket = require('../model/ticketModel');

// Book a new ticket
exports.bookTicket = async (req, res) => {
  try {
    const { userId, seatNumber, price, status } = req.body;

    const newTicket = new Ticket({
      userId,
      seatNumber,
      price,
      status,
    });

    await newTicket.save();
    res.status(201).json({ message: 'Ticket booked successfully', ticket: newTicket });
  } catch (error) {
    res.status(500).json({ message: 'Failed to book ticket', error: error.message });
  }
};

// Get all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('userId');
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve tickets', error: error.message });
  }
};

// Get a ticket by ID
exports.getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id).populate('userId');

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve ticket', error: error.message });
  }
};

// Cancel a ticket
exports.cancelTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findByIdAndUpdate(id, { status: 'canceled' }, { new: true });

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json({ message: 'Ticket canceled successfully', ticket });
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel ticket', error: error.message });
  }
};


