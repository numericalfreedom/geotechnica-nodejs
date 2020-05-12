

module.exports = { sparse , matrix } ;


function idx( i , j )
 {

  let n  = undefined ;
  let nj = undefined ;
  let nn = this.r[i] ;
  let nx = ( this.r.length - 1 ) ;

  if( i < nx )  nx = ( this.r[i+1] - 1 ) ;

  for( nj = nn; nj < nx; ++nj )

   if( this.c[nj] == j )  n = nj ;

  return( n ) ;

 }


function sparse( r , n )
 {

  this.v = new Array( n ) ;
  this.r = new Array( r )  ;
  this.c = new Array( n ) ;

  this.idx = idx ;

 }



function matrix( nr , nc , nl , nu )
 {

  let i  = undefined ;
  let il = undefined ;
  let iu = undefined ;
  let n  = undefined ;
  let ni = undefined ;
  let nd = undefined ;
  let nv = undefined ;
  let nb = undefined ;
  let nt = undefined ;

  nd = ( (nr < (nc + nl + 1)) ? nr : (nc + nl + 1) ) ;

  nb = ( nd - nl ) ;

  nt = ( nc - nu ) ;

  for( i = 0 , il = 0 , iu = nu , ni = 0 ; i < nd ; ++i )
   {

    console.log( "i= " , i , " il= " , il , " iu= " , iu , " ni= " , ni ) ;     

    if( i < nl ) ++il ;

    else if( (il > 0) && (i >= nc) ) --il ;

    if( (iu > 0) && (i >= nt) ) --iu ;

    ni += ( il + 1 + iu ) ;

   } ; // end for()

 } ; // end function matrix() 

