
var i = undefined ;
var a = new Array( 20 ) ;

for( i = 0 ; i < a.length ; a[i] = ((i < 10) ? ++i : (1 + (++i))) ) ;

var v = 4 ;


// quickfind( a , v ) ;


function quickfind( a , v )
 {

  let ri = undefined ;
  let i  = undefined ;
  let nl = undefined ;
  let nr = undefined ;


  for( ri = i = Math.floor( ((nl = 0) + (nr = (a.length - 1))) / 2 ) ; ((a[i] != v) && (nl < nr)) ; i = ((a[i] < v) ? Math.floor( ((nl = (i + 1)) + nr) / 2 ) : i) , i = ((a[i] > v) ? Math.floor( (nl + (nr = (i - 1))) / 2 ) : i) , ri = ((a[i] == v) ? i : (-1)) ) 

    console.log( "nl=" , nl , "nr=" , nr , "i=" , i , "a[i]=" , a[i] ) ;

	 
  console.log( "nl=" , nl , "nr=" , nr , "i=" , i , "a[i]=" , a[i] , "ri=" , ri ) ;

  return( ri ) ;

 } ; // end for() -



function arrayquickfind( v )
 {

  let ri = undefined ;
  let i  = undefined ;
  let nl = undefined ;
  let nr = undefined ;


  for( ri = i = Math.floor( ((nl = 0) + (nr = (a.length - 1))) / 2 ) ; ((a[i] != v) && (nl < nr)) ; i = ((a[i] < v) ? Math.floor( ((nl = (i + 1)) + nr) / 2 ) : i) , i = ((a[i] > v) ? Math.floor( (nl + (nr = (i - 1))) / 2 ) : i) , ri = ((a[i] == v) ? i : (-1)) ) 

    console.log( "nl=" , nl , "nr=" , nr , "i=" , i , "a[i]=" , this[i] ) ;

	 
  console.log( "nl=" , nl , "nr=" , nr , "i=" , i , "a[i]=" , a[i] , "ri=" , ri ) ;

  return( ri ) ;

 } ; // end for() -

Array.prototype.quickfind = arrayquickfind ;

a.quickfind( v ) ;

quickfind( a , v ) ;
