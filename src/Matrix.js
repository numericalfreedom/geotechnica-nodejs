
function Matrix( nr , nc )
 {

  var d = undefined ;

  if( nc )  nr *= nc ;

  switch( nr )
   {

    case 3:

     d = 1 ;

     break ;

    case 4:
    case 6:

     d = 2 ;

     break ;

    default:

     d = 0 ;

   }

  this.nr = nr ;
  this.nc = nc ;
  this.v = new Array( nr ) ;
  this.d = d ;
  this.i = idx ;

 }


function idx( i , j )
 {

  var r = i ;

  if( this.d )
   {

    if( i - j )  r = ( i + j + this.d ) ;

   } // end if

  else
   {

    r = ( (i * this.nc) + j ) ;

   } ; // end else

  return( this.v[r] ) ;

 }


var a = new Matrix( 9 , 9 ) ;

var i = 0 ;

for( i = 0; i < a.nr ; a.v[i] = (1 + i++) ) ;


console.log( a ) ;

console.log( a.i(0,0) ) ;
console.log( a.i(0,1) ) ;
console.log( a.i(0,2) ) ;
console.log( a.i(1,0) ) ;
console.log( a.i(1,1) ) ;
console.log( a.i(1,2) ) ;
console.log( a.i(2,0) ) ;
console.log( a.i(2,1) ) ;
console.log( a.i(2,2) ) ;
