const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const matchroute = require('./routes/matchRoute');
const route = require('./routes/authRoute');
const footballerroute = require('./routes/footballerRoute');
const connectDB = require('./config/db');
const ticketRouter = require('./routes/ticketRoute');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
dotenv.config();
const PORT = process.env.PORT || 3000;

connectDB();


app.use("/api", matchroute);
app.use("/api/auth", route);
app.use('/api', ticketRouter);
app.use("/api/football", footballerroute);

app.listen(PORT, () => {
  console.log(`Server is running on :${PORT}`);
});








