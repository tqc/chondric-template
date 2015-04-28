require("envloader").load();

var sslOptions = process.env.USE_SSL ? {
    key: fs.readFileSync(process.env.SSL_KEY_FILE, "utf8"),
    cert: fs.readFileSync(process.env.SSL_CERT_FILE, "utf8")
} : null;

var port = process.env.PORT || 5000;

var server = require("./build/serverapp");
server.enableSourceMaps();
server.runServer(port, sslOptions);
