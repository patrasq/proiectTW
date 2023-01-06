const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const config = require('./config');
const app = express();

const userRoute = require('./routes/userRoute');
const inventoryRoute = require('./routes/inventoryRoute');
const categoryRoute = require('./routes/categoryRoute');
const alertRoute = require('./routes/alertRoute');

const accessLog = require('./middleware/accessLog');
const authenticated = require('./middleware/authenticated');

dotenv.config();
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true}));

// cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/users', accessLog, userRoute);
app.use('/inventory', authenticated, inventoryRoute);
app.use('/categories', authenticated, categoryRoute);
app.use('/alerts', authenticated, alertRoute);

app.get('/', (req, res) => {
  res.send({
    message: 'Foowa API',
    timestamp: new Date().getTime(),
    version: '1.0.0'
  });
});

app.listen(config.PORT, () => {
  console.log(`Listening at http://localhost:${config.PORT}`);
});
