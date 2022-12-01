const http = require("http"); // not global module bcz we  import http

// const { buffer } = require("stream/consumers");
const route =require('./routes');
console.log(route.someText)
// const server=http.createServer(route)
const server=http.createServer(route.handler)
server.listen(5000);