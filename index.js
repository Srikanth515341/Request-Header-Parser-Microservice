// index.js
// where your node app starts

// Load environment variables
require('dotenv').config();
var express = require('express');
var app = express();

// Enable CORS for freeCodeCamp testing
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // Some legacy browsers choke on 204

// Serve static files
app.use(express.static('public'));

// Serve the homepage
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Test API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Your main API endpoint for freeCodeCamp
app.get('/api/whoami', (req, res) => {
  let yourIP = req.headers["x-forwarded-for"]?.split(',')[0] || req.socket.remoteAddress || req.connection.remoteAddress || req.ip;
  let yourLanguage = req.header("accept-language");
  let yourSoftware = req.header("user-agent");

  res.json({ ipaddress: yourIP, language: yourLanguage, software: yourSoftware });
});

// Listen for requests
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
