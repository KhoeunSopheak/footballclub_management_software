const express = require('express');
const {
  bookTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket
} = require('../controllers/ticketController');
const verifyToken = require("../middleware/authMiddleware");

const ticketRouter = express.Router();

// Route for booking a ticket
ticketRouter.post('/ticket',verifyToken ("user"), bookTicket);

// Route for getting all tickets
ticketRouter.get('/tickets',verifyToken ("user", "admin"), getAllTickets);

// Route for getting a ticket by ID
ticketRouter.get('/tickets/:id',verifyToken ("user","admin"), getTicketById);

// Route for update a ticket
ticketRouter.put('/tickets/:id',verifyToken ("admin"), updateTicket);

// Route for delete ticket
ticketRouter.delete('/tickets/:id', verifyToken('admin'), deleteTicket);

module.exports = ticketRouter;
