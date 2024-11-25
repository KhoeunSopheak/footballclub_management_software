const Ticket = require('../model/ticketModel');

exports.bookTicket = async (req, res) => {
  try {
    const { seatNumber, price } = req.body;
    const { _id } = req.user; // Extract userId from the token

    // Create a new ticket
    const ticket = await Ticket.create({
      userId: _id,
      seatNumber,
      price,
      status: 'booked',
    });

    // Populate the userId field to include name and email
    const populatedTicket = await Ticket.findById(ticket._id).populate('userId', 'username email');

    res.status(201).json({
      message: 'Ticket booked successfully',
      ticket: populatedTicket,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

// update a ticket
exports.updateTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const { seatNumber, price, status } = req.body;

    // Find and update the ticket
    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      { seatNumber, price, status }, // Include all fields to be updated
      { new: true } // Return the updated document
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json({
      message: 'Ticket updated successfully',
      ticket: updatedTicket,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete ticket controller
exports.deleteTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;

    // Check if the ticket exists
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Delete the ticket
    await Ticket.findByIdAndDelete(ticketId);

    res.status(200).json({
      message: 'Ticket deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


