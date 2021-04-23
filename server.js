const sequelize = require('./config/database')
const config = require('./config/config').production;
const express = require('express');
const app = express();
const router = require('./routers/routes');
const cors = require('cors');
const bodyParser = require('body-parser');

app.disable('etag');


app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', (req,res) => {
    res.send(`User Microservice v.1.0 ${new Date()}`);
});

app.use('/user-service/v1', router);

app.listen(config.appPort, () => {
    console.log(`Listening on port: ${process.env.PORT}`);
});
module.exports = app;