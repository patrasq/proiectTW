const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const app = express();

const userRoute = require('./routes/userRoute');
const inventoryRoute = require('./routes/inventoryRoute');

const accessLog = require('./middleware/accessLog');
const authenticated = require('./middleware/authenticated');

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true}));

app.use('/users', accessLog, userRoute);
app.use('/inventory', accessLog, inventoryRoute);

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
