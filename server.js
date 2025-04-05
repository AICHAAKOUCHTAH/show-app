require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
const showsRouter = require('./routes/shows');
const authRouter = require('./routes/auth');
app.use('/api/shows', showsRouter);
app.use('/api/auth', authRouter);

// Démarrer le serveur
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));