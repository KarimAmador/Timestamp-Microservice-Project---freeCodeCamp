// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function(req, res) {
  console.log(req.params);

  let timestamp;
  if (!req.params.date) {
    let currentTime = new Date();
    timestamp = { unix: currentTime.getTime(), utc: currentTime.toUTCString() };
  } else if (req.params.date.search(/^\d+-\d+-\d+$/) === -1) {
    timestamp = { unix: Number(req.params.date), utc: new Date(Number(req.params.date)).toUTCString()};
  } else {
    timestamp = { unix: new Date(req.params.date).getTime(), utc: new Date(req.params.date).toUTCString() };
  }

  if (Object.values(timestamp).includes('Invalid Date')) {
    timestamp = { error: 'Invalid Date' };
  }

  res.json(timestamp);
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
