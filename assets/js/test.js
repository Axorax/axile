var http = require("http");

var app = http.createServer(function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ a: 1 }, null, 3));
});
app.listen(process.env.PORT || 3000);
