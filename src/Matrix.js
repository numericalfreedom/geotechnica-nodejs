
/**
 * @fileOverview Matrix class definitions.
 *
 * This is the FleX project.
 *
 *
 *
 * @author       Numericalfreedom Foundation
 * @version      0.0.1
 */
 
 
/**
 *  @constructor
 *  @author: Numericalfreedom Foundation
 *  @param    { number }    nr      Number of rows
 *  @param    { number }    nc      Number of columns
 *  @property { number }    nr      Number of rows
 *  @property { number }    nc      Number of columns
 *  @property { number }    nv      Number of values
 *  @property { Array  }    v       Vector of values
 *  @property { number }    d       Index difference for sparse representation
 *  @property { function }  i       Index function
 *  @returns  { Object }            Matrix  object
 */


function Matrix( nr , nc , nv )
 {

/**
 *  Number of values
 * 
 *  @constant { number } */

  if( ! nv )  var nv = ( nr * nc ) ;

/**
 *  Index difference value
 *  
 *  @type { number } */

  var d = undefined ;

  switch( nv )
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

  this.nr  = nr ;
  this.nc  = nc ;
  this.nv  = nv ;
  this.v   = new Array( nv ) ;
  this.d   = d ;

  this.idx = idx ;
  this.put = put ;
  this.get = get ;
  this.mmm = mmm ;

 } ; // end function Matrix


/**
 *  Index function
 *
 *  @param    { number }    i      Number of rows
 *  @param    { number }    j      Number of columns
 */

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

  return( r ) ;

 } ; // end function idx()



function put( i , j , v )
 {

  return( this.v[ this.idx( i , j ) ] = v ) ;

 }



function get( i , j )
 {

  return( this.v[ this.idx( i , j ) ] ) ;

 }



function mmm( x , y )
 {

  if( this.d )
   {

    for( i = 0; i < this.nr; ++i )

      for( j = i; j < this.nc; ++j )

        if( this.idx( i , j ) < this.nv )

          for( k = this.v[ this.idx( i , j ) ] = 0; k < x.nc; ++k )

            if( ((ix = this.idx( i , k )) < this.nv) && ((iy = this.idx( k , j )) < this.nv) )

              this.v[ this.idx( i , j ) ] += ( x.v[ ix ] * y.v[ iy ] );

   }

  else
   {

    for( i = 0; i < this.nr; ++i )

      for( j = 0; j < this.nc; ++j )

        for( k = this.v[ this.idx( i , j ) ] = 0; k < x.nc; ++k )

          this.v[ this.idx( i , j ) ] += ( x.v[ x.idx( i , k ) ] * y.v[ y.idx( k , j ) ] );

   }

  return ;

 } ; // end function mmm()


var a = new Matrix( 9 , 9 ) ;

var i = 0 ;

for( i = 0; i < a.nv ; a.v[i] = (1 + i++) ) ;


console.log( a ) ;

console.log( a.v[ a.idx( 0 , 0 ) ] ) ;
console.log( a.v[ a.idx( 0 , 1 ) ] ) ;
console.log( a.v[ a.idx( 0 , 2 ) ] ) ;
console.log( a.v[ a.idx( 1 , 0 ) ] ) ;
console.log( a.v[ a.idx( 1 , 1 ) ] ) ;
console.log( a.v[ a.idx( 1 , 2 ) ] ) ;
console.log( a.v[ a.idx( 2 , 0 ) ] ) ;
console.log( a.v[ a.idx( 2 , 1 ) ] ) ;
console.log( a.v[ a.idx( 2 , 2 ) ] ) ;




var x = new Matrix( 3 , 3 , 4 ) ;

for( i = 0; i < x.nv ; x.v[i] = (1 + i++) ) ;


var y = new Matrix( 3 , 3 , 4 ) ;

for( i = 0; i < y.nv ; y.v[i] = (1 + i++) ) ;


var r = new Matrix( 3 , 3 , 4 ) ;


r.mmm( x , y ) ;


console.log( x ) ;

console.log( y ) ;

console.log( r ) ;


var x = new Matrix( 3 , 4 ) ;

for( i = 0; i < x.nv ; x.v[i] = (1 + i++) ) ;


var y = new Matrix( 4 , 3 ) ;

for( i = 0; i < y.nv ; y.v[i] = (1 + i++) ) ;


var r = new Matrix( 3 , 3 ) ;


for( i = 0; i < 4; i++ , r.mmm( x , y ) ) ;

//  if( (i % 2) == 0 )  console.log( i ) ;


console.log( x ) ;

console.log( y ) ;

console.log( r ) ;

