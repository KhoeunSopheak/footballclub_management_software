const express = require('express');
const { createFootballer,
        getAllFootballer,
        getFootballerId, 
        updateFootballer,
        deleteFootballer
       } = require('../controllers/footballerController');

const footballerroute = express.Router();

footballerroute.post('/footballer', createFootballer);
footballerroute.get('/footballers', getAllFootballer);
footballerroute.get('/footballers/:id', getFootballerId);
footballerroute.put('/footballers/:id', updateFootballer);
footballerroute.delete('/footballers/:id', deleteFootballer);

module.exports = footballerroute;