const express = require('express');
const app = express();
const bookRoutes = require('./routes/books');
const cors = require('cors');

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON
app.use('/books', bookRoutes); // Mount book routes

// Home route
app.get('/', (req, res) => {
  res.send('📚 Welcome to the Book API!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
