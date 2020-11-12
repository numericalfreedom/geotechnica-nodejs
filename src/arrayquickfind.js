
var i = undefined ;
var a = new Array( 20 ) ;

for( i = 0 ; i < a.length ; a[i] = ((i < 10) ? ++i : (1 + (++i))) ) ;

var v = 4 ;


// quickfind( a , v ) ;


function quickfind( a , v , nl , nr )
 {


  if( !nl || (nl <  0)        )  nl = 0 ;
  if( !nr || (nr >= a.length) )  nr = ( a.length - 1 ) ;

  let i  = undefined ;
  let ri = undefined ;


  for( ri = i = Math.floor( (nl + nr) / 2 ) ; ((a[i] != v) && (nl < nr)) ; i = ((a[i] < v) ? Math.floor( ((nl = (i + 1)) + nr) / 2 ) : i) , i = ((a[i] > v) ? Math.floor( (nl + (nr = (i - 1))) / 2 ) : i) , ri = ((a[i] == v) ? i : (-1)) ) 

    console.log( "nl=" , nl , "nr=" , nr , "i=" , i , "a[i]=" , a[i] ) ;

	 
  console.log( "nl=" , nl , "nr=" , nr , "i=" , i , "a[i]=" , a[i] , "ri=" , ri ) ;

  return( ri ) ;

 } ; // end for() -



function arrayquickfind( v , nl , nr )
 {

  if( !nl || (nl <  0)        )  nl = 0 ;
  if( !nr || (nr >= a.length) )  nr = ( a.length - 1 ) ;

  let i  = undefined ;
  let ri = undefined ;


  for( ri = i = Math.floor( (nl + nr) / 2 ) ; ((a[i] != v) && (nl < nr)) ; i = ((a[i] < v) ? Math.floor( ((nl = (i + 1)) + nr) / 2 ) : i) , i = ((a[i] > v) ? Math.floor( (nl + (nr = (i - 1))) / 2 ) : i) , ri = ((a[i] == v) ? i : (-1)) ) 

    console.log( "nl=" , nl , "nr=" , nr , "i=" , i , "a[i]=" , this[i] ) ;

	 
  console.log( "nl=" , nl , "nr=" , nr , "i=" , i , "a[i]=" , a[i] , "ri=" , ri ) ;

  return( ri ) ;

 } ; // end for() -

Array.prototype.quickfind = arrayquickfind ;

a.quickfind( v , 0 , 5 ) ;

quickfind( a , v , 0 , 5 ) ;
