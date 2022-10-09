const express = require('express');
const connectDB = require('./config/db');
const config = require('config');

const app = express();
const cors = require('cors')
app.use(cors())

// Connect Database
connectDB();

//Init Middleware
app.use(express.json({extended : false}));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) => res.send('API running'));

// Define Routes
app.use('/api/students', require('./routes/api/students'));
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/hostels', require('./routes/api/hostels'));
app.use('/api/rooms', require('./routes/api/rooms'));
app.use('/api/notices', require('./routes/api/notices'));
app.use('/api/complaints', require('./routes/api/complaints'));
app.use('/api/application', require('./routes/api/applications'));
app.use('/api/fees', require('./routes/api/fees'));
  
const PORT = config.get('PORT') || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
