
const a = require('./build/Release/addon.node');

const m = [ 11 , 12 , 13 , 14 , 15 , 16 , 17 , 18 , 19 ] ;

const n = [ 21 , 22 , 23 , 24 , 25 , 26 , 27 , 28 , 29 ] ;

const q = [ [ 1 , 2 , 3 ] , [ 4 , 5 , 6 ] , [ 7 , 8 , 9 ] , [ 10 ] ] ;

var r = a.arrayaddeigenvalue( m , n , q ) ;

console.log( r ) ;


const mm = [ 1 , 0 , 0 , 0 , 2 , 0 , 0 , 0 , 3 ] ;

const nn = [ 1 , 0 , 0 , 0 , 2 , 0 , 0 , 0 , 3 ] ;

const qq = [ [ 1 , 2 , 3 ] , [ 2 , 1 , 3 ] , [ 3 , 2 , 1 ] , [ 13 ] ] ;

var rr = a.arrayaddeigenvalue( mm , nn , qq ) ;

console.log( rr ) ;


