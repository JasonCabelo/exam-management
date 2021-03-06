require('dotenv').config({ path: './config.env' });
const express = require("express");
const cors = require('cors');
const connectDB = require("./config/db");
const errorHandler = require('./middleware/error');
const bodyParser = require("body-parser");
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/private', require('./routes/private'));
app.use('/api/exam', require('./routes/exam'));
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log('listening on port ' + PORT)); 

process.on('unhandledRejection', (err, promise) => {
    console.log('Unhandled rejection: ' + err);
    server.close(() => process.exit(1));
});