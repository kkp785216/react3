const connectToMongoose = require('./db');
const express = require('express')
const cors = require('cors')

// Access to fetch at 'http://localhost:5000/api/notes/fetchallnotes' from origin 'http://localhost:3000' has been blocked by CORS policy

connectToMongoose();

const app = express()
const port = 5000

app.use(cors());
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
    res.send('Hello world');
})

app.get('/*', (req, res) => {
  res.send('Page Not found')
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})