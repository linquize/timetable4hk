console.log("Data Proxy");

var http = require('http');
var fs = require("fs");
var url = require("url");
var path = require("path");

http.createServer(function(request, response) {
  console.log(request.method + " " + request.url);

  if (request.url == "/") {
    response.writeHead(200);
    response.write("node.js data proxy server\n");
    response.end();
    return;
  }

  if (request.url.substr(0, 7) == "/redir/") {
    var rurl = request.url.substr(7);
    console.log("Redirecting to " + request.url);
    http.get(rurl, function(res) {
      var ct = res.headers["content-type"];
      console.log("Server content-type: " + ct);
      var body = '';

      res.on('data', function(chunk) {
        body += chunk;
      });

      res.on('end', function() {
        console.log("Passing info to client " + body.length);
        response.writeHead(200, {"Content-Type": ct});
        response.write(body);
        response.end();
      });
    }).on('error', function(e) {
      console.log("Got error: ", e);
    });

    return;
  }

  var part = url.parse(request.url).pathname;
  if (part.indexOf("..") >= 0) {
    response.writeHead(403, {"Content-Type": "text/plain"});
    response.write(".. not allowed\n");
    response.end();
    return;
  }

  var filename = path.join(process.cwd(), part);
  fs.readFile(filename, "binary", function(err, file) {
    if (err) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(err + "\n");
      response.end();
      return;
    }

    response.writeHead(200);
    response.write(file, "binary");
    response.end();
  });
}).listen(8888);
console.log("listening at port 8888");