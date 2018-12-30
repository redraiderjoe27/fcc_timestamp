// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const moment = require('moment');
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index2.html');
});


// your first API endpoint... 


app.get("/api/timestamp/:date_string?", (req, res) => {
  // parameter from route
  let dt = req.params.date_string;
  // check if parameter is null
  if (dt == null){
    res.json({unix: moment().unix(), utc: moment().utc(), test: "was null"});
  }
  // if parameter is valid then convert to unix & utc time
  else if (moment(dt).isValid()) {
    res.json({unix: moment(dt).unix(), utc: moment(dt).utc()});
  }
  // date was not blank or valid
  res.json({error: "invalid date"});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});