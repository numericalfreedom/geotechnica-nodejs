
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



module.exports = { Matrix }


 
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

function Matrix( nr , nc , nv , v )
 {

  let i  = undefined ;
  let ix = undefined ;

/**
 *  Number of values
 * 
 *  @constant { number } */

  if( ! nv )  var nv = ( nr * nc ) ;

  var vv  = new Array( nv ) ;

  if( v && (ix = v.length) && (ix = ((ix < nv) ? ix : nv)) )
 
    for( i = 0;  i < ix;  vv[i] = v[i++] ) ;

/**
 *  Index difference value
 *  
 *  @type { number } */

  let d = 0 ;

  if(  (nr == 2) && (nc == 2)  && (nv == 3) )  d = 1 ;

  if( ((nr == 3) && (nc == 3)) && ((nv == 4) || (nv == 6)) )  d = 2 ;

/** 
 *
 * @properpty {number} nr
 *
 * */

  this.nr  = nr ;
  this.nc  = nc ;
  this.nv  = nv ;
  this.v   = vv ;
  this.d   = d ;

/** 
 *
 * @properpty {Function} idx
 * @returns {number}
 *
 * */

  this.idx = idx ;
  this.val = val ;
  this.eqt = eqt ;
  this.unt = unt ;
  this.cst = cst ;
  this.sum = sum ;
  this.trc = trc ;
  this.enm = enm ;
  this.mma = mma ;
  this.msa = msa ;
  this.mms = mms ;
  this.mss = mss ;
  this.cmm = cmm ;
  this.csm = csm ;
  this.cmd = cmd ;
  this.csd = csd ;
  this.smm = smm ;
  this.dmm = dmm ;
  this.smd = smd ;
  this.vmm = vmm ;
  this.vmd = vmd ;
  this.mmd = mmd ;
  this.mmt = mmt ;
  this.msd = msd ;
  this.mst = mst ;
  this.inv = inv ;

 } ; // end function Matrix


/**
 *  Index function
 *
 *  @description function index
 *
 *  @param    { number }    i      Number of rows
 *  @param    { number }    j      Number of columns
 */

function idx( i , j )
 {

  let r = i ;

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



/** Function val
 *
 *  @description function put
 */

function val( i , j , v )
 {

  var r = undefined ; 

  if( ! v )
   
    r = this.v[ this.idx( i , j ) ] ;
  
  else 

    r = this.v[ this.idx( i , j ) ] = v

  return( r ) ;

 } ; // end function val()


/** Function eqt
 *
 *
 */

function eqt( x )
 {
  
  let i = undefined ;

  for( i = 0; i < this.nv; this.v[ i ] = x.v[ i++ ] ) ;

  return ;

 } ; // end function eqt()



/** Function cst
 *
 *
 */

function cst( s )
 {

  let i = undefined ;

  for( i = 0; i < this.nv; this.v[ i++ ] = s ) ;

  return ;

 } ; // end function cst()



/** Function unt
 *
 *
 */

function unt( s )
 {
  
  let i = undefined ;

  for( i = 0; i < 3; this.v[ i++ ] = s ) ;

  return ;

 } ; // end function unt ()



/** Function sum
 *
 *
 */

function sum()
 {

  let i = undefined ;
  let r = undefined ;

  for( i = r = 0; i < this.nv; r += this.v[ i++ ] ) ;

  return( r ) ;

 } ; // end function sum()



/** Function trc
 *
 *
 */

function trc()
 {

  let i = undefined ;
  let r = undefined ;

  for( i = r = 0; i < this.nr; r += this.v[ i++ ] ) ;

  return( r ) ;

 } ; // end function trc()



/** Function enm
 *
 *
 */

function enm( x )
 {

  let i = undefined ;
  let r = undefined ;
  let v = undefined ;

  for( i = r = 0; i < this.nv; v = this.v[ i++ ] , r += (v * v)  ) ;

  return( Math.sqrt( r ) ) ;

 } ; // end function enm()



/** Function mma
 *
 *
 */

function mma( x , y )
 {
  
  let i = undefined ;

  for( i = 0; i < this.nv; this.v[ i ] = ( x.v[ i ] + y.v[ i++ ] ) ) ;

  return ;

 } ; // end function mma()



/** Function msa
 *
 *
 */

function msa( x )
 {

  let i = undefined ;

  for( i = 0; i < this.nv; this.v[ i ] += x.v[ i++ ] ) ;

  return ;

 } ; // end function msa()



/** Function mms
 *
 *
 */

function mms( x , y )
 {
  
  let i = undefined ;

  for( i = 0; i < this.nv; this.v[ i ] = ( x.v[ i ] - y.v[ i++ ] ) ) ;

  return ;

 } ; // end function mms()



/** Function mss
 *
 *
 */

function mss( x )
 {

  let i = undefined ;

  for( i = 0; i < this.nv; this.v[ i ] -= x.v[ i++ ] ) ;

  return ;

 } ; // end function mss()



/** Function cmm
 *
 *
 */

function cmm( c , x )
 {

  let i = undefined ;

  for( i = 0; i < this.nv; this.v[ i ] = ( c * x.v[ i++ ] ) ) ;

  return ;

 } ; // end function cmm()



/** Function csm
 *
 *
 */

function csm( c )
 {

  let i = undefined ;

  for( i = 0; i < this.nv; this.v[ i ] *= c , ++i ) ;

  return ;

 } ; // end function csm()



/** Function cmd
 *
 *
 */

function cmd( c , x )
 {

  let i = undefined ;

  for( i = 0; i < this.nv; ++i )

    if( c )

      this.v[ i ] = ( x.v[ i ] / c ) ;

    else

      this.v[ i ] = undefined ;

  return ;

 } ; // end function cmd()



/** Function csd
 *
 *
 */

function csd( c )
 {

  let i = undefined ;

  for( i = 0; i < this.nv; ++i )

    if( c )

      this.v[ i ] /= c ;

    else

      this.v[ i ] = undefined ;

  return ;

 } ; // end function csd()



/** Function smm
 *
 *
 */

function smm( x , y )
 {

  let i = undefined ;

  for( i = 0; i < this.nv; ++i )

    this.v[ i ] = ( x.v[ i ] * y.v[ i ] ) ;

  return ;

 } ; // end function smm()



/** Function dmm
 *
 *
 */

function dmm( x , y )
 {

  let i = undefined ;
  let r = undefined ;

  for( r = i = 0; i < this.nv; ++i )

    r += this.v[ i ] = ( x.v[ i ] * y.v[ i ] ) ;

  return( r ) ;

 } ; // end function dmm()



/** Function smd
 *
 *
 */

function smd( x , y )
 {

  let i = undefined ;

  for( i = 0; i < this.nv; ++i )

    if( y.v[ i ] )

      this.v[ i ] = ( x.v[ i ] / y.v[ i ] ) ;

    else

      this.v[ i ] = undefined ;

  return ;

 } ; // end function smd()



/** Function vmm
 *
 *
 */

function vmm( x , y )
 {

  let i = undefined ;
  let j = undefined ;

  for( i = 0; i < x.nv; ++i )
  
    for( j = 0; j < y.nv; ++j )

      this.v[ this.idx( i , j ) ] = ( x.v[ i ] * y.v[ j ] ) ;

  return ;

 } ; // end function vmm()



/** Function vmd
 *
 *
 */

function vmd( x , y )
 {

  let i = undefined ;
  let j = undefined ;

  for( i = 0; i < x.nv; ++i )
  
    for( j = 0; j < y.nv; ++j )

      if( y.v[ j ] )

        this.v[ this.idx( i , j ) ] = ( x.v[ i ] / y.v[ j ] ) ;

      else
	
	this.v[ this.idx( i , j ) ] = 0.0 ;

  return ;

 } ; // end function vmd()



/** Function mmd
 *
 *
 */

function mmd( x , y )
 {

  let i  = undefined ;
  let j  = undefined ;
  let k  = undefined ;
  let ik = undefined ;
  let kj = undefined ;

  if( this.d )
   {

    for( i = 0; i < this.nr; ++i )

      for( j = i; j < this.nc; ++j )

        if( this.idx( i , j ) < this.nv )

          for( this.v[ this.idx( i , j ) ] = k = 0; k < x.nc; ++k )

            if( ((ik = x.idx( i , k )) < x.nv) && ((kj = y.idx( k , j )) < y.nv) )

              this.v[ this.idx( i , j ) ] += ( x.v[ ik ] * y.v[ kj ] );

   }

  else
   {

    for( i = 0; i < this.nr; ++i )

      for( j = 0; j < this.nc; ++j )

        for( this.v[ this.idx( i , j ) ] = k = 0; k < x.nc; ++k )

          this.v[ this.idx( i , j ) ] += ( x.v[ x.idx( i , k ) ] * y.v[ y.idx( k , j ) ] );

   }

  return ;

 } ; // end function mmd()


/** Function mmt
 *
 *
 */

function mmt( x , y , z )
 {

  let i  = undefined ;
  let j  = undefined ;
  let m  = undefined ;
  let n  = undefined ;
  let im = undefined ;
  let mn = undefined ;
  let nj = undefined ;

  if( this.d )
   {

    for( i = 0; i < this.nr; ++i )

      for( j = i; j < this.nc; ++j )

        if( this.idx( i , j ) < this.nv )

          for( this.v[ this.idx( i , j ) ] = m = 0; m < y.nr; ++m )

            for( n = 0; n < y.nc; ++n )

              if( ((im = x.idx( i , m )) < x.nv) && ((mn = y.idx( m , n )) < y.nv) && ((nj = z.idx( n , j )) < z.nv) )

                this.v[ this.idx( i , j ) ] += ( x.v[ im ] * y.v[ mn ] * z.v[ nj ] );

   }

  else
   {

    for( i = 0; i < this.nr; ++i )

      for( j = 0; j < this.nc; ++j )

        for( m = this.v[ this.idx( i , j ) ] = 0; m < y.nr; ++m )

          for( n = 0; n < y.nc; ++n )

            this.v[ this.idx( i , j ) ] += ( x.v[ x.idx( i , m ) ] * y.v[ y.idx( m , n ) ] * z.v[ z.idx( n , j ) ] );

   }
  
  return( this.trc() ) ;

 } ; // end function mmt()



/** Function msd
 *
 *
 */

function msd( x )
 {

  let i  = undefined ;
  let j  = undefined ;
  let k  = undefined ;
  let ik = undefined ;
  let kj = undefined ;
  
  if( this.d )
   {

    for( i = 0; i < this.nr; ++i )

      for( j = i; j < this.nc; ++j )

        if( this.idx( i , j ) < this.nv )

          for( k = this.v[ this.idx( i , j ) ] = 0; k < x.nc; ++k )

            if( ((ik = x.idx( i , k )) < x.nv) && ((kj = x.idx( k , j )) < x.nv) )

              this.v[ this.idx( i , j ) ] += ( x.v[ ik ] * x.v[ kj ] );

   }
  
  else
   {

    for( i = 0; i < this.nr; ++i )

      for( j = 0; j < this.nc; ++j )

        for( k = this.v[ this.idx( i , j ) ] = 0; k < x.nc; ++k )

          this.v[ this.idx( i , j ) ] += ( x.v[ x.idx( i , k ) ] * x.v[ x.idx( k , j ) ] );

   }
  
  return( this.trc() ) ;
 
 } ; // end function msd()



/** Function mst
 *
 *
 */

function mst( x )
 {

  let i  = undefined ;
  let j  = undefined ;
  let m  = undefined ;
  let n  = undefined ;
  let im = undefined ;
  let mn = undefined ;
  let nj = undefined ;

  if( this.d )
   {

    for( i = 0; i < this.nr; ++i )

      for( j = i; j < this.nc; ++j )

        if( this.idx( i , j ) < this.nv )

          for( m = this.v[ this.idx( i , j ) ] = 0; m < x.nr; ++m )

            for( n = 0; n < x.nc; ++n )

              if( ((im = x.idx( i , m )) < x.nv) && ((mn = x.idx( m , n )) < x.nv) && ((nj = x.idx( n , j )) < x.nv)  )

                this.v[ this.idx( i , j ) ] += ( x.v[ im ] * x.v[ mn ] * x.v[ nj ] );

   }

  else
   {

    for( i = 0; i < this.nr; ++i )

      for( j = 0; j < this.nc; ++j )

        for( m = this.v[ this.idx( i , j ) ] = 0; m < x.nr; ++m )

          for( n = 0; n < x.nc; ++n )

            this.v[ this.idx( i , j ) ] += ( x.v[ x.idx( i , m ) ] * x.v[ x.idx( m , n ) ] * x.v[ x.idx( n , j ) ] );

   }
  
  return( this.trc() ) ;

 } ; // end function mst()



/** Function inv
 *
 *
 */

function inv()
 {

  let i   = undefined ;
  let j   = undefined ;
  let k   = undefined ;
  let akk = undefined ;
  let akj = undefined ;
  let aik = undefined ;

  let r = new Matrix( this.nr , this.nc ) ;

  for( i = 0;  i < this.nr;  ++i )

    for( j = 0;  j < this.nc;  ++j )
      
      if( this.idx( i ,  j ) < this.nv )
        
        r.v[ r.idx( i , j ) ] = this.v[ this.idx( i , j ) ] ;

  for( k = 0;  k < r.nr;  ++k )

    if( akk = r.v[ r.idx( k , k ) ] )
     {

      for( i = 0;  i < r.nc;  ++i )

        for( j = 0;  j < r.nr;  ++j )

          if( (i != k) && (j != k) )
           {

            akj = r.v[ r.idx( k , j ) ] ;

            aik = r.v[ r.idx( i , k ) ] ;

            r.v[ r.idx( i , j ) ] -= ( (akj * aik) / akk ) ;

           } ;

      for( i = 0;  i < r.nc;  ++i )

        if( i != k )

          this.v[ this.idx( i , k ) ] /= (- akk ) ;

      for( j = 0;  j < r.nr;  ++j )

        if( k != j )

          r.v[ r.idx( k , j ) ] /= akk ;

      r.v[ r.idx( k , k ) ] = ( 1.0 / akk ) ;

     } // end if{} +

    else

      r.v[ r.idx( k , k ) ] = undefined ;

  for( i = 0;  i < this.nr;  ++i )

    for( j = 0;  j < this.nc;  ++j )
      
      if( this.idx( i ,  j ) < this.nv )
        
        this.v[ this.idx( i , j ) ] = r.v[ r.idx( i , j ) ];

  return ;

 } ; // end function inv()



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


r.mmd( x , y ) ;


console.log( x ) ;

console.log( y ) ;

console.log( r ) ;


var x = new Matrix( 3 , 3 ) ;



var y = new Matrix( 3 , 3 ) ;



var r = new Matrix( 3 , 3 ) ;


for( var ii = 0; ii < 1; ++ii , r.mmd( x , y ) )
 {

  for( i = 0; i < x.nv ; x.v[i] = Math.random() , i++ ) ;

  for( i = 0; i < y.nv ; y.v[i] = Math.random() , i++ ) ;

  if( (ii % 1e6) == 0 )  console.log( ii ) ;

 }


console.log( x ) ;

console.log( y ) ;

console.log( r ) ;



var xx = new Matrix( 3 , 1 ) ;

var yy = new Matrix( 3 , 1 ) ;

var rr = new Matrix( 3 , 3 ) ;


for( i = 0; i < xx.nv ; xx.v[i] = (1 + i++) ) ;

for( i = 0; i < yy.nv ; yy.v[i] = (1 + i++) ) ;


rr.vmm( xx , yy ) ;


console.log( rr ) ;



xx.cmm( 2.0 , yy ) ;


console.log( xx ) ;



xx.cmd( 2.0 , yy ) ;


console.log( xx ) ;


let e = xx.enm() ;

console.log( e ) ;


var x = new Matrix( 3 , 3 , undefined , [ 1 , 2 , 3 , 5 , 7 , 11 , 13 , 17 , 19 ] ) ;

var y = new Matrix( 3 , 3 , undefined , [ 1 , 2 , 3 , 5 , 7 , 11 , 13 , 17 , 19 ] ) ;

var r = new Matrix( 3 , 3 ) ;

y.eqt( x ) ;

console.log( y ) ;

console.log( x ) ;

console.log( y.v ) ;

console.log( x.v ) ;

x.inv()

console.log( x.v ) ;

r.mmd( x , y ) ;

console.log( r.v ) ;


var x = new Matrix( 3 , 3 , undefined , [ 1 , 5 , 0 , 5 , 2 , 0 , 0 , 0 , 3 ] ) ;

var y = new Matrix( 3 , 3 , undefined , [ 1 , 5 , 0 , 5 , 2 , 0 , 0 , 0 , 3 ] ) ;

var r = new Matrix( 3 , 3 ) ;

y.eqt( x ) ;

// console.log( y ) ;

// console.log( x ) ;

console.log( y.v ) ;

console.log( x.v ) ;

x.inv()

console.log( x.v ) ;

r.mmd( x , y ) ;

console.log( r.v ) ;



var x = new Matrix( 3 , 3 , 4 , [ 1 , 2 , 3 , 5 ] ) ;

var y = new Matrix( 3 , 3 , 4 , [ 1 , 2 , 3 , 5 ] ) ;

var r = new Matrix( 3 , 3 , 4 ) ;

y.eqt( x ) ;

// console.log( y ) ;

// console.log( x ) ;

console.log( y.v ) ;

console.log( x.v ) ;

x.inv()

console.log( y.v ) ;

console.log( x.v ) ;

r.mmd( x , y ) ;

console.log( r.v ) ;
