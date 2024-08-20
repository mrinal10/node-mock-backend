

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {fetchData} = require('./db/mongo-data-fetch');

const cors = require('cors');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'your_secret_key';

app.use(bodyParser.json());
app.use(cors());

const users = [
  {
    id: 1,
    username: 'test',
    password: bcrypt.hashSync('password', 8)
  }
];

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);

  if (!passwordIsValid) {
    return res.status(401).send({ message: 'Invalid password' });
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 86400 });
  res.status(200).send({ token });
});

app.get('/api/data', async (req, res) => {
    try{
        console.error('fetching data:');
        const data = await fetchData();
        console.log('number of documents reached server :', data);
        res.status(200).json( data );
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});