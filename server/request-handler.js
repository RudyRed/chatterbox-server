/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};




// var messages = [{text: 'Hello', username: 'Gerald', objectId: 0}];
var messages = [];
var rooms = [];


var requestHandler = function(request, response) {
 
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var headers = defaultCorsHeaders;
  var output = '';
  // See the note below about CORS headers.

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'application/json';

  if (request.url !== '/classes/messages') {
    var statusCode = 404;
    headers['Content-Type'] = 'text/plain';
    response.writeHead(statusCode, headers);
    response.end('invlaid link');
  }

  if (request.method === 'OPTIONS') {
    var statusCode = 200;
    headers['Content-Type'] = 'text/plain';
    response.writeHead(statusCode, headers);
    response.end('Allowed methods: GET, POST');
  }


  if (request.method === 'GET' && request.url === '/classes/messages') {
    var statusCode = 200;
    var output = JSON.stringify({results: messages});
    response.writeHead(statusCode, headers);
    response.end(output);
  } else if (request.method === 'POST' && request.url === '/classes/messages') {
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      var statusCode = 201;
      body = JSON.parse(body);
      // body.objectId = nextId;
      messages.push(body);
      var output = JSON.stringify({results: messages});
      response.writeHead(statusCode, headers);
      response.end(output);
    });
  }
};
 
// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a  like file://your/chat/client/index.html,
// which is considered a different domain.url
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

exports.requestHandler = requestHandler;



