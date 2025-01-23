const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 8000;

app.use(cors({
    origin: 'http://localhost:3001', 
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

mongoose.connect('mongodb://127.0.0.1:27017/crm-portal-backend', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB Connection Error:', err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', userRoutes);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
