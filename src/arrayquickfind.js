
var i = undefined ;
var a = new Array( 20 ) ;

for( i = 0 ; i < a.length ; a[i] = ((i < 10) ? i++ : (1 + i++)) ) ;

var v = 220 ;


// quickfind( a , v ) ;


function quickfind( a , v )
 {

  let ri = undefined ;

  let i  = undefined ;
  let n  = undefined ;
  let nx = undefined ;
  let ai = undefined ;

  let nl = undefined ;
  let nr = undefined ;

  // for( nl = 0 , nr = (a.length - 1) , i = 0 ; a[i] != v; (i == 0) ? (i = nr) : (((a[i] < v) ? (i = Math.floor( ((nl = i) + nr) / 2 )) : i ) , ((a[i] > v) ? (i = Math.floor( (nl + (nr = i)) / 2 )) : i)) ) 

  // for( nl = 0 , nr = (a.length - 1) , i = Math.floor( (nl + nr) / 2 ) ; (((a[i] != v) || (ri = i)) && ((nr-nl) > 1)) ; (((a[i] < v) ? (i = Math.floor( ((nl = i) + nr) / 2 )) : i ) , ((a[i] > v) ? (i = Math.floor( (nl + (nr = i)) / 2 )) : i)) )
	 
  // for( nl = 0 , nr = (a.length - 1) , i = Math.floor( (nl + nr) / 2 ) ; (((a[i] != v) || (ri = i)) && ((nr-nl) > 1)) ; ((a[i] > v) || (nl = i)) , ((a[i] < v) || (nr = i)) , i = Math.floor( (nl + nr) / 2 ) ) 

  for( i = n = Math.ceil( (a.length - 1) / 2 ) ; (((ai = a[i]) != v)  && i && n) ; ri = i += Math.ceil((ai < v) ? (n /= 2) : (n /= -2)) )

    console.log( "nl=" , nl , "nr=" , nr , "i=" , i , "a[i]=" , a[i] ) ;

//  if( a[i] == v )  ri = i ;  else  ri = undefined ;
	 
  console.log( "nl=" , nl , "nr=" , nr , "i=" , i , "a[i]=" , a[i] , "ri=" , ri ) ;

  return( ri ) ;

 } ; // end for() -



function arrayquickfind( v )
 {

  let ri = undefined ;

  let i  = undefined ;
  let nl = undefined ;
  let nr = undefined ;

  // for( nl = 0 , nr = (a.length - 1) , i = 0 ; a[i] != v; (i == 0) ? (i = nr) : (((a[i] < v) ? (i = Math.floor( ((nl = i) + nr) / 2 )) : i ) , ((a[i] > v) ? (i = Math.floor( (nl + (nr = i)) / 2 )) : i)) ) 

  for( nl = 0 , nr = (a.length - 1) , i = Math.floor( (nl + nr) / 2 ) ; ((a[i] != v) && ((nr-nl) > 2)) ; (((a[i] < v) ? (i = Math.floor( ((nl = i) + nr) / 2 )) : i ) , ((a[i] > v) ? (i = Math.floor( (nl + (nr = i)) / 2 )) : i)) )

    console.log( "nl=" , nl , "nr=" , nr , "i=" , i , "a[i]=" , this[i] ) ;


  if( a[i] == v )  ri = i ;  else  ri = undefined ;
	 
  console.log( "nl=" , nl , "nr=" , nr , "i=" , i , "a[i]=" , a[i] , "ri=" , ri ) ;

  return( ri ) ;

 } ; // end for() -

Array.prototype.quickfind = arrayquickfind ;

// a.quickfind( v ) ;

quickfind( a , v ) ;
