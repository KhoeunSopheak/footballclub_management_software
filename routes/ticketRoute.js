// const express = require('express');
// const ticketRouter = express.Router();  // Corrected here
// const { bookTicket, getAllTickets, getTicketById, cancelTicket} = require('../controllers/ticketController');

// ticketRouter.post('/bookTicket', bookTicket);
// ticketRouter.get('/getAllTickets', getAllTickets);
// ticketRouter.get('/getTicketById', getTicketById);
// ticketRouter.put('/cancelTicket', cancelTicket);

// module.exports = ticketRouter;




const express = require('express');
const {
  bookTicket,
  getAllTickets,
  getTicketById,
  cancelTicket,
} = require('../controllers/ticketController');

const ticketRouter = express.Router();

// Route for booking a ticket
ticketRouter.post('/ticket', bookTicket);

// Route for getting all tickets
ticketRouter.get('/tickets', getAllTickets);

// Route for getting a ticket by ID
ticketRouter.get('/tickets/:id', getTicketById);

// Route for canceling a ticket
ticketRouter.put('/tickets/:id', cancelTicket);

module.exports = ticketRouter;
