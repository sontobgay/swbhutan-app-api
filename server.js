var logger = require('morgan'),
    cors = require('cors'),
    http = require('http'),
    express = require('express'),
    errorHandler = require('errorhandler'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    helmet = require('helmet'),
    config = require('./config.json');

const options = {
    useMongoClient: true,
}


var app = express();
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
    app.use(errorHandler());
}

var port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;
// mongoose.connect(config.database);
mongoose.connect(config.database, options).then(
    () => { 
        console.log("Connection Succesful");
    },
    err => {
        console.log("Connection Failed");
     }
);

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//Main App Entry Point
app.get('/', function(request, response) {
  response.render('pages/index')
});

//API Routes Entry
app.use(require('./routes/main-event'));
app.use(require('./routes/pitching-event-date'));
app.use(require('./routes/pitchinge-event-agenda'));
app.use(require('./routes/pitching-prize'));
app.use(require('./routes/registration-pitching'));
app.use(require('./routes/registration-main'));
app.use(require('./routes/organiser'));

//View Registered Participants Report Entry Points
app.use(require('./routes/registered-participants-jnec'));
app.use(require('./routes/registered-participants-sherubtse'));
app.use(require('./routes/registered-participants-clcs'));
app.use(require('./routes/registered-participants-cst'));
app.use(require('./routes/registered-participants-gaeddu'));
app.use(require('./routes/registered-participants-cnr'));
app.use(require('./routes/registered-participants-rtc'));



http.createServer(app).listen(port, function (err) {
    console.log('Listening in http://localhost:' + port);
});