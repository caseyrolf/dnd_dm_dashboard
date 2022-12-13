let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let dbConfig = require('./database/db');

// Express Route
const characterRoute = require('../backend/routes/character.route');
const enemyRoute = require('../backend/routes/enemy.route')

// Connecting MongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/reactdb").then(() => {
console.log('Database successfully connected!')
},
error => {
	console.log('Could not connect to database : ' + error)
}
)

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));
app.use(cors());
app.use('/characters', characterRoute)
app.use('/enemies', enemyRoute)


// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
console.log('Connected to port ' + port)
})

// 404 Error
app.use((req, res, next) => {
res.status(404).send('Error 404!')
});

app.use(function (err, req, res, next) {
console.error(err.message);
if (!err.statusCode) err.statusCode = 500;
res.status(err.statusCode).send(err.message);
});
