var fs = require('fs') ;
var readline = require('readline') ;

var rd = readline.createInterface({
  input: fs.createReadStream('test.msh'),
  output: process.stdout,
  console: false
});

rd.on('line', function(line) {
  console.log(line);
});

rd.on('close' , function( line ) {} ) ;
