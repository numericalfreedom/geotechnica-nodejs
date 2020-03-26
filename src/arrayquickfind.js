
var i = undefined ;
var a = new Array( 20 ) ;

for( i = 0 ; i < a.length ; a[i] = i++ ) ;

var v = 10 ;


// quickfind( a , v ) ;


function quickfind( a , v )
 {


  let i  = undefined ;
  let nl = undefined ;
  let nr = undefined ;


  // for( nl = 0 , nr = (a.length - 1) , i = 0 ; a[i] != v; (i == 0) ? (i = nr) : (((a[i] < v) ? (i = Math.floor( ((nl = i) + nr) / 2 )) : i ) , ((a[i] > v) ? (i = Math.floor( (nl + (nr = i)) / 2 )) : i)) ) 

  for( nl = 0 , nr = (a.length - 1) , i = Math.floor( (nl + nr) / 2 ) ; a[i] != v; (((a[i] < v) ? (i = Math.floor( ((nl = i) + nr) / 2 )) : i ) , ((a[i] > v) ? (i = Math.floor( (nl + (nr = i)) / 2 )) : i)) )

    console.log( "nl=" , nl , "nr=" , nr , "i=" , i , "a[i]=" , a[i] ) ;

  console.log( "nl=" , nl , "nr=" , nr , "i=" , i , "a[i]=" , a[i] ) ;

  return( i ) ;

 } ; // end for() -



function arrayquickfind( v )
 {


  let i  = undefined ;
  let nl = undefined ;
  let nr = undefined ;

  // for( nl = 0 , nr = (a.length - 1) , i = 0 ; a[i] != v; (i == 0) ? (i = nr) : (((a[i] < v) ? (i = Math.floor( ((nl = i) + nr) / 2 )) : i ) , ((a[i] > v) ? (i = Math.floor( (nl + (nr = i)) / 2 )) : i)) ) 

  for( nl = 0 , nr = (a.length - 1) , i = Math.floor( (nl + nr) / 2 ) ; a[i] != v; (((a[i] < v) ? (i = Math.floor( ((nl = i) + nr) / 2 )) : i ) , ((a[i] > v) ? (i = Math.floor( (nl + (nr = i)) / 2 )) : i)) )

    console.log( "nl=" , nl , "nr=" , nr , "i=" , i , "a[i]=" , this[i] ) ;

  console.log( "nl=" , nl , "nr=" , nr , "i=" , i , "a[i]=" , this[i] ) ;

  return( i ) ;

 } ; // end for() -

Array.prototype.quickfind = arrayquickfind ;

a.quickfind( v ) ;

quickfind( a , v ) ;
