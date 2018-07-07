const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const path = require('path');
const cors = require('cors');

const schema = require('./schema/schema.js');

if (dotenv.error) {
  console.log('FATAL ERROR .env file not found');
  process.exit(1);
}

const app = express();

app.use(cors());

mongoose
  .connect(
    process.env.APP_MONGODB_URI,
    { useNewUrlParser: true }
  )
  .then(console.log('MongoDB Connected'))
  .catch(err => console.error(err));

const publicPath = path.join(process.cwd(), 'public');

app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
