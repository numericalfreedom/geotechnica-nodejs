
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


function Matrix( nr , nc )
 {

  if( ! nc )  var nc = 1 ;

/**
 *  Number of values
 * 
 *  @constant { number } */

  const nv = ( nr * nc ) ;

/**
 *  Index difference value
 *  
 *  @type { number } */

  var   d = undefined ;

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

  this.nr = nr ;
  this.nc = nc ;
  this.nv = nv ;
  this.v  = new Array( nv ) ;
  this.d  = d ;
  this.i  = idx ;

 } ; // end function Matrix


/**
 *  Index function
 *
 *  @param    { number }    i      Number of rows
 *  @param    { number }    j      Number of columns
 */

function idx( i , j )
 {

  var r  = undefined ;
  var ri = i ;

  if( this.d )
   {

    if( i - j )  ri = ( i + j + this.d ) ;

   } // end if

  else
   {

    ri = ( (i * this.nc) + j ) ;

   } ; // end else

  if( ri < this.nv )

   rv = this.v[ri] ;
   
  else
  
   rv = 0.0 ;

  return( rv ) ;

 } ; // end function idx()


var a = new Matrix( 9 , 9 ) ;

var i = 0 ;

for( i = 0; i < a.nv ; a.v[i] = (1 + i++) ) ;


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

