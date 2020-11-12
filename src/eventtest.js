
const EventEmitter = require( 'events' ) ;


let i = 0 ;
let j = 0 ;


const ee = new EventEmitter() ;


ee.on( 'event' , (a,b,c,d,e) => { console.log( 'event occurred !' , a , b , c , d , e ) } ) ;


ee.on( 'increment' , () => { if( Math.random() > 0.95 ) ++i } ) ;


ee.on( 'wait' , () => { ++j ; console.log( 'i=' , i , 'j=' , j ) ; } ) ;


ee.emit( 'event' , 1 , 2 , 3 , 4 , 5 ) ;


while( i < 100 ) ee.emit( 'increment' ) , ee.emit( 'wait' ) ;


