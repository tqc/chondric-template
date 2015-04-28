(function() {
    exports.enableSourceMaps = function() {

        var sourcemap = require('source-map-support');
        var fs = require('fs');
        sourcemap.install({
            retrieveSourceMap: function(source) {
                // for some reason the default implementation isn't finding the map files
                if (source.indexOf("serverapp") < 0) {
                    return null;
                }
                var mapfile = source.replace(".js", ".js.map");
                return {
                    url: mapfile,
                    map: fs.readFileSync(mapfile, 'utf8')
                };
            }
        });

    };

    exports.runServer = function(port, sslOptions) {

        var express = require("express");
        var app = express();

        app.use("/", express.static("build/dev/web"));

        port = port || 5000;

    if (sslOptions) {
        var https = require('https');
        https.createServer(sslOptions, app).listen(port, function() {
            console.log("https server listening on port " + port);
        });
    } else {
        app.listen(port, function() {
            console.log("http server listening on " + port);
        });
    }



    };

})();
