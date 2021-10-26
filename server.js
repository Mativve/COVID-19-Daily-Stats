const express = require('express');
const history = require('connect-history-api-fallback');
const path = require('path');
const serveStatic = require('serve-static');
const enforce = require('express-sslify');

const app = express();
const port = process.env.PORT || 5000;

app.use(history({
    verbose: true
}));

app.use(serveStatic(path.join(__dirname, '/dist')));

app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.listen(port, () => {
    console.log('Server started at http://localhost:'+port);
});