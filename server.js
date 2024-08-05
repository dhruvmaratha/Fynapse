const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/finapse', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    bankAccount: String,
    panCard: String,
    upiId: String
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    newUser.save((err, user) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(user);
    });
});

app.post('/bank-details', (req, res) => {
    const { email, bankAccount, panCard, upiId } = req.body;
    User.findOneAndUpdate({ email }, { bankAccount, panCard, upiId }, { new: true }, (err, user) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(user);
    });
});

// Start Server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
