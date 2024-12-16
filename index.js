const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

// MongoDB connection URI (replace with your own MongoDB URI)
const uri = "mongodb+srv://darshil89:darshil89@cluster0.7h8g2.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB:', err));

// Define the form schema
const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

// Create the model based on the schema
const Form = mongoose.model('Form', formSchema);

// POST endpoint to submit form data
app.post('/submit', async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).send("Form submitted successfully!");
  } catch (err) {
    res.status(500).send("Error submitting form: " + err);
  }
});

// GET endpoint to fetch all form submissions
app.get('/entries', async (req, res) => {
  try {
    const entries = await Form.find();
    res.json(entries);
  } catch (err) {
    res.status(500).send("Error fetching entries: " + err);
  }
});

// Set the port for the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
