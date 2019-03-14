var tls = require('tls');
var fs = require('fs');

var options = {
  key: fs.readFileSync('./keys/server.key'),
  cert: fs.readFileSync('./keys/server.crt'),
  requestCert: true,
  ca: [ fs.readFileSync('./keys/server.crt') ],
  rejectUnauthorized: true
}

var server = tls.createServer(options, function (stream){
  console.log(stream)
  console.log('server conected', stream.authorized ? 'authorized':'unauthorized');
  stream.write('welcome!\n');
  stream.setEncoding('utf8');
  stream.pipe(stream);
})

server.listen(8000,function(){
  console.log('server bound')
})