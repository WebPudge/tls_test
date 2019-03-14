var tls = require('tls');
var fs = require('fs');

var options = {
  host: 'localhost',
  port: 8000,
  key: fs.readFileSync('./keys/client.key'),
  cert: fs.readFileSync('./keys/client.crt'),
  ca: [ fs.readFileSync('./keys/server.crt') ],
  rejectUnauthorized: true
}

var stream = tls.connect(options, function (){
  console.log('client conected', stream.authorized ? 'authorized':'unauthorized');
  process.stdin.pipe(stream)
})

stream.setEncoding('utf8');
stream.on('data', function(data){
  console.log(data);
});
stream.write("hello world");
stream.on('error',function(err){
  console.log(err)
})