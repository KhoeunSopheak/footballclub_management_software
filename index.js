const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
dotenv.config();
const PORT = process.env.PORT || 3000;

connectDB();

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});








