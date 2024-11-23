const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const route = require('./routes/authRoute');
const footballerroute = require('./routes/footballerRoute');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
dotenv.config();
const PORT = process.env.PORT || 3000;

connectDB();

app.use("/api/auth", route);
app.use("/api", footballerroute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});








