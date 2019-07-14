
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
    
  else
  
    for( i = 0;  i < nv;  vv[i++] = 0.0 ) ;

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
  this.tfm = tfm ;
  this.val = val ;
  this.eqt = eqt ;
  this.unt = unt ;
  this.cst = cst ;
  this.sum = sum ;
  this.trc = trc ;
  this.enm = enm ;
  this.tsp = tsp ;
  this.tms = tms ;
  this.tma = tma ;
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
  this.xmm = xmm ;
  this.mmd = mmd ;
  this.mdt = mdt ;
  this.mmt = mmt ;
  this.msd = msd ;
  this.mst = mst ;
  this.inv = inv ;
  this.evl = evl ;
  this.evc = evc ;

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



/** Function tfm
 *
 *
 */

function tfm( x )
 {

  let i   = undefined ;
  let j   = undefined ;

  for( i = 0;  i < this.nr;  ++i )

    for( j = 0;  j < this.nc;  ++j )

      if( this.idx( i , j ) < this.nv )

        if( (x.idx( i , j ) < x.nv) && (i < x.nr) && (j < x.nc) )

          this.v[ this.idx( i , j ) ] = x.v[ x.idx( i , j ) ] ;

        else

	  this.v[ this.idx( i , j ) ] = 0 ;

  return ;

 } ; // end function tfm()



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



/** Function tsp
 *
 *
 */

function tsp( x )
 {

  let i = undefined ;
  let j = undefined ;
  
  if( ! this.d )
  
    for( i = 0;  i < this.nr;  ++i )
    
      for( j = 0;  j < this.nc;  ++j )

        this.v[ this.idx( j , i ) ] = x.v[ x.idx( i , j ) ] ;

  return ;

 } ; // end function tsp()



/** Function tms
 *
 *
 */

function tms()
 {

  let i   = undefined ;
  let j   = undefined ;
  let aij = undefined ;
  let aji = undefined ;

  if( ! this.d )

    for( i = 0;  i < this.nr;  ++i )

      for( j = (i + 1);  j < this.nr;  ++j )
       {

        aij = this.v[ this.idx( i , j ) ] ;

	aji = this.v[ this.idx( j , i ) ] ;

        this.v[ this.idx( j , i ) ] = this.v[ this.idx( i , j ) ] = ( (aij + aji) / 2 ) ;

       } ; // end for()

  return ;

 } ; // end function tms()



/** Function tma
 *
 *
 */

function tma()
 {

  let i   = undefined ;
  let j   = undefined ;
  let aij = undefined ;
  let aji = undefined ;

  if( ! this.d )

    for( i = 0;  i < this.nr;  ++i )

      for( j = (i + 1);  j < this.nr;  ++j )
       {

        this.v[ this.idx( i , i ) ] = 0 ;

        aij = this.v[ this.idx( i , j ) ] ; 

        aji = this.v[ this.idx( j , i ) ] ;

        this.v[ this.idx( j , i ) ] = this.v[ this.idx( i , j ) ] = ( (aij - aji) / 2 ) ;

       } ; // end for()

  return ;

 } ; // end function tma()



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



/** Function xmm
 *
 *
 */

function xmm( x , y )
 {

  let i = undefined ;
  let j = undefined ;
  let k = undefined ;
  let a = undefined ;
  let b = undefined ;
  let c = undefined ;
  let d = undefined ;

  let e = [ 1 , 2 , 2 , 1 , 2 , 0 , 0 , 2 , 0 , 1 , 1 , 0 ] ;

  for( j = 0; j < this.nc; ++j )

    for( i = k = 0 , a = 0 , b = 1 , c = 2 , d = 3;  k < e.length; ++i , a += 4 , b += 4 , c += 4 , d += 4 , k += 4 )

      if( (this.idx( i , j ) < this.nv) && (x.idx( e[a] , j ) < x.nv) && (y.idx( e[b] , j ) < y.nv) && (x.idx( e[c] , j ) < x.nv) && (y.idx( e[d] , j ) < y.nv) )
       {

        console.log( i , j , e[a] , e[b] , e[c] , e[d] ) ;

        this.v[ this.idx( i , j ) ] = ( (x.v[ x.idx( e[a] , j ) ] * y.v[ y.idx( e[b] , j ) ]) - (x.v[ x.idx( e[c] , j ) ] * y.v[ y.idx( e[d] , j ) ]) );

       }

  return ;

 } ; // end function xmm()



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



/** Function mdt
 *
 *
 */

function mdt( x , y )
 {

  let i  = undefined ;
  let k  = undefined ;
  let ik = undefined ;
  let ki = undefined ;
  let r  = undefined ;
  let rr = undefined ;

  for( r = 0 , i = 0; i < this.nr; r += rr , ++i )

    if( this.idx( i , i ) < this.nv )

      for( this.v[ this.idx( i , i ) ] = k = 0; k < x.nc; ++k )

        if( ((ik = x.idx( i , k )) < x.nv) && ((ki = y.idx( k , i )) < y.nv) )

          rr = ( this.v[ this.idx( i , i ) ] += (x.v[ ik ] * y.v[ ki ]) );

  return( r ) ;

 } ; // end function mdt()



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

  console.log( 'r=' , r ) ;

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

          r.v[ r.idx( i , k ) ] /= (- akk ) ;

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



/** Function evs
 *
 *
 */

function evs( p , q , r , m , n )
 {

  let d = ( (p * q) - (r * r) ) ;

  return( [ (((r * n) - (q * m)) / d) , (((r * m) - (p * n)) / d) ] ) ;

 } ; // end function evs()



/** Function evl
 *
 *
 */

function evl( x )
 {

  let i    = undefined ;

  let a    = undefined ;
  let b    = undefined ;
  let c    = undefined ;
  let d    = undefined ;
  let e    = undefined ;
  let f    = undefined ;

  let k    = undefined ;
  let l    = undefined ;
  let m    = undefined ;

  let ab   = undefined ;
  let bc   = undefined ;
  let ac   = undefined ;

  let dd   = undefined ;
  let ee   = undefined ;
  let ff   = undefined ;

  let p    = undefined ;
  let q    = undefined ;
  let r    = undefined ;

  let kk   = undefined ;

  let ap   = undefined ;
  let bt   = undefined ;
  
  let lda  = undefined ; 
  let ldb  = undefined ; 
  let ldc  = undefined ; 

  let pi_3   = ( Math.PI / 3 ) ;


  if( x.nv <= 4 )
   {

    a = x.v[0] ;
    b = x.v[1] ;
    d = x.v[2] ;

    c = e = f = 0 ;

    if( x.nv == 4 )
     {

      c = x.v[2] ;
      d = x.v[3] ;

      e = f = 0 ;

     } ; // if{} +


    p = (- (a + b) ) ;

    q = ( (a * b) - (d * d) ) ;

    r = Math.sqrt( (p * p) - (4 * q) ) ;


    this.v[ 0 ] = ( ((- p) + r) / 2 ) ;

    this.v[ 1 ] = ( ((- p) - r) / 2 ) ;

    this.v[ 2 ] = c ;


   } // end if{} +

  else
   {

    a = x.v[0] ;
    b = x.v[1] ;
    c = x.v[2] ;
    d = x.v[3] ;
    e = x.v[4] ;
    f = x.v[5] ;
  
    k = (- (a + b + c) ) ;

    l = ( (ab = (a * b)) + (bc = (b * c)) + (ac = (a * c)) - (dd = (d * d)) - (ee = (e * e)) - (ff = (f * f)) ) ;

    m = ( (a * ff) + (b * ee) + (c * dd) - (a * b * c) - (2 * d * e * f) ) ;


    p = ( l - ((kk = (k * k)) / 3) ) ;
   
    q = ( m + ((2 * k * kk) / 27) - ((k * l) / 3) ) ;


    if( p <= 0 )
     {

      if( ((4 * p * p* p) + (27 * q * q)) > 0 )
       {

        if( p < 0 )
         {

          bt = Math.sqrt( - (p / 3) ) ;

          ap = ( Math.acosh( ((- 3) * Math.abs( q )) / (2 * p * bt) ) / 3 ) ;

         } // end if{} +

	else
	 {

          bt = ap = 0 ;

         } ; // end else

        this.v[ 0 ] = this.v[1] = this.v[2] = ( ((- 2) * (Math.abs( q ) / q) * bt * Math.cosh( ap )) - (k / 3) ) ;

       } // end if{}+

      else
       {

        if( p < 0 )
	 {

          bt = Math.sqrt( - (p / 3) ) ;

          ap = ( Math.acos( (3 * q) / (2 * p * bt) ) / 3 ) ;

	 } // end if{} +

	else
	 {

          bt = ap = 0 ;

         } ; // end else -

        this.v[ 0 ] = ( (2 * bt * Math.cos( ap )) - (k / 3) ) ;

        this.v[ 1 ] = ( (2 * bt * Math.cos( ap - (2 * pi_3) )) - (k / 3) ) ;

        this.v[ 2 ] = ( (2 * bt * Math.cos( ap + (2 * pi_3) )) - (k / 3) ) ;

       } ; // end else -

     } // end if{} +

    else
     {

      bt = Math.sqrt( p / 3 ) ;

      ap = ( Math.asinh( (3 * q) / (2 * p * bt) ) / 3 ) ;

      this.v[ 0 ] = this.v[1] = this.v[2] = ( ((- 2) * bt * Math.sinh( ap )) - (k / 3) ) ;

     } ; // end else -

   } ; // end else -


  debugger ;


  return ;


 } ; // end function evl()



/** Function evc
 *
 *
 */

function evc( x )
 {

  let i = undefined ;

  for( i = 0; i < this.nv; ++i ) ;

  return ;

 } ; // end function evc()



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


var x = new Matrix( 3 , 4 , undefined , [ 1 , 1 , 1 , 1 , 3 , 3 , 3 , 3 , 5 , 5 , 5 , 5 ] ) ;

var y = new Matrix( 3 , 4 , undefined , [ 7 , 7 , 7 , 7 , 11 , 11 , 11 , 11 , 13 , 13 , 13 , 13 ] ) ;

var r = new Matrix( 3 , 4 ) ;

console.log( x.v ) ;

console.log( y.v ) ;

r.xmm( x , y ) ;

console.log( r.v ) ;


var x  = new Matrix( 2 , 2 , 3 , [ 1 , 2 , 3 ] ) ;

var y  = new Matrix( 2 , 2 , 3 , [ 1 , 2 , 3 ] ) ;

var r  = new Matrix( 2 , 2 , 3 ) ;

var rr = undefined ;

console.log( x.v ) ;

console.log( y.v ) ;

rr = r.mdt( x , y ) ;

console.log( r.v ) ;

console.log( rr );


var x  = new Matrix( 3 , 4 , undefined , [ 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 , 11 , 12 ] ) ;

var y  = new Matrix( 4 , 3 , undefined , [ 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 , 11 , 12 ] ) ;

var rs = new Matrix( 3 , 3 , undefined ) ;

var ra = new Matrix( 3 , 3 , undefined ) ;

console.log( x.v ) ;

console.log( y.v ) ;


rs.mmd( x , y ) ;

console.log( rs.v ) ;

rs.tms() ;

console.log( rs.v ) ;


ra.mmd( x , y ) ;

console.log( ra.v ) ;

ra.tma() ;

console.log( ra.v ) ;


var x = new Matrix( 3 , 3 , undefined , [ 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 ] ) ;

var y = new Matrix( 3 , 3 , undefined ) ;


var r = new Matrix( 2 , 2 , 3 ) ;

r.tfm( x )

console.log( 'r223=' , r.v ) ;

y.tfm( r )

console.log( 'y=' , y.v ) ;


var r = new Matrix( 3 , 3 , 4 ) ;

r.tfm( x )

console.log( 'r334=' , r.v ) ;

y.tfm( r )

console.log( 'y=' , y.v ) ;


var r = new Matrix( 3 , 3 , 6 ) ;

r.tfm( x )

console.log( 'r334=' , r.v ) ;

y.tfm( r )

console.log( 'y=' , y.v ) ;


var x = new Matrix( 3 , 3 , 6 , [ 4 , 10 , 1 , -14 , -12 , 13 , 0 , 0 , 0 ] ) ;

var r = new Matrix( 3 , 1 , undefined ) ;


console.log( 'x=' , x.v ) ;

r.evl( x ) ;

console.log( r.v ) ;


var x = new Matrix( 3 , 3 , 6 , [ 3 , 0 , 3 , 2 , 4 , 2 , 0 , 0 , 0 ] ) ;

var r = new Matrix( 3 , 1 , undefined ) ;

console.log( 'x=' , x.v ) ;

r.evl( x )

console.log( r.v ) ;


var x = new Matrix( 3 , 3 , 6 , [ 1 , 1 , 2 , 0 , 0 , 0 , 0 , 0 , 0 ] ) ;

var r = new Matrix( 3 , 1 , undefined ) ;

console.log( 'x=' , x.v ) ;

r.evl( x )

console.log( r.v ) ;


console.log( evs( 1 , 2 , 3 , 2 , 3 ) ) ;



