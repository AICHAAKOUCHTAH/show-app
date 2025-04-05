// routes/auth.js
const jwt = require('jsonwebtoken');
const db = require('../database');

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const result = await db.run(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, password] // En production: utiliser bcrypt pour le hash
    );
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(400).json({ error: 'Email already exists' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  db.get(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, user) => {
      if (err || !user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      
      res.json({ token });
    }
  );
});