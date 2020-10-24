
const e  = require( 'events' ) ;



const ee = new e.EventEmitter() ;


var phase = 0 ;


ee.on( 'c1' , ( a ) => { console.log( 'Command: c1 , a=' , a ) ; phase = Math.floor( 5 * Math.random() ) ; } ) ;

ee.on( 'c2' , ( a ) => { console.log( 'Command: c2 , a=' , a ) ; phase = Math.floor( 5 * Math.random() ) ; } ) ;

ee.on( 'c3' , ( a ) => { console.log( 'Command: c3 , a=' , a ) ; phase = Math.floor( 5 * Math.random() ) ; } ) ;

ee.on( 'c4' , ( a ) => { console.log( 'Command: c4 , a=' , a ) ; phase = Math.floor( 5 * Math.random() ) ; } ) ;

ee.on( 'c5' , ( a ) => { console.log( 'Command: c5 , a=' , a ) ; phase = Math.floor( 5 * Math.random() ) ; } ) ;


commands = [ [ 'c1' , 1 ] , [ 'c2' , 2 ] , [ 'c3' , 3 ] , [ 'c4' , 4 ] , [ 'c5' , 5 ] ] ;


for( i = 0; i<5; ++i )  ee.emit( commands[phase][0] , commands[phase][1] ) ;


