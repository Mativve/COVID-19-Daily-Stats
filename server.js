// const express = require('express');
// const serveStatic = require('serve-static');
// const history = require('connect-history-api-fallback');
// const enforce = require('express-sslify');

// const app = express();

// app.use(enforce.HTTPS({ trustProtoHeader: true }));
// app.use(serveStatic(__dirname + '/dist'));
// app.use(history());

// app.listen(process.env.PORT || 5000);


const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');
const enforce = require('express-sslify');

const app = express();

const staticFileMiddleware = express.static(path.join(__dirname + '/dist'));
app.use(staticFileMiddleware);

app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(history({
  disableDotRule: true,
  verbose: true
}));

app.get('/', function (req, res) {
  res.render(path.join(__dirname + '/dist/index.html'));
});

var server = app.listen(process.env.PORT || 5000, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});