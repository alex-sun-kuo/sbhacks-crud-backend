var express = require('express'); // Express web server framework

var app = express();

require('./routes.js')(app);  // bring in our endpoints

var server = app.listen(process.env.PORT || 8888, () => {
  console.log('Listening on port %s', server.address().port);
});
