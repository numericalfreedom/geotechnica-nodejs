'use strict' ;


const g = 10.0 ;


module.exports = { g , degrees , radians , wedgeslope }


function degrees( r )
 {

  return( 180.00 * (r / Math.PI) ) ;

 }


function radians( d )
 {

  return( Math.PI * (d / 180.00) ) ;

 }


function wedgeslope( x , th )
 {
  
  const c_r      =   0 ;

  const c_h      =   0 ;
  const c_bt     =   1 ;

  const c_rh     =   2 ;
  const c_ph     =   3 ;
  const c_c      =   4 ;

  const c_pvgk   =   5 ;
  const c_apvgk  =   6 ;
  const c_bpvgk  =   7 ;

  const c_qvqr   =   8 ;
  const c_aqvqr  =   9 ;
  const c_bqvqr  =  10 ;

  const c_phgk   =  11 ;
  const c_aphgk  =  12 ;
  const c_bphgk  =  13 ;

  const c_qhqr   =  14 ;
  const c_aqhqr  =  15 ;
  const c_bqhqr  =  16 ;

  const c_fvgk   =  17 ;
  const c_afvgk  =  18 ;

  const c_fvqr   =  19 ;
  const c_afvqr  =  20 ;

  const c_fhgk   =  21 ;
  const c_afhgk  =  22 ;

  const c_fhqr   =  23 ;
  const c_afhqr  =  24 ;

  const c_gmph   =  25 ;
  const c_gmc    =  26 ;
  const c_gmg    =  27 ;
  const c_gmq    =  28 ;

  const r_r      =   0 ;

  const r_phd    =   0 ;
  const r_cd     =   1 ;

  const r_bapvgk =   2 ;
  const r_baqvqr =   3 ;
  const r_baphgk =   4 ;
  const r_baqhqr =   5 ;
  const r_bafvgk =   6 ;
  const r_bafvqr =   7 ;
  const r_bafhgk =   8 ;
  const r_bafhqr =   9 ;

  const r_l      =  10 ;
  const r_a      =  11 ;

  const r_gk     =  12 ;
  const r_fvk    =  13 ;
  const r_fhk    =  14 ;
  const r_fpk    =  15 ;
  const r_fqk    =  16 ;
  const r_tk     =  17 ;
  const r_nk     =  18 ;
  const r_fek    =  19 ;
  const r_frk    =  20 ;
  const r_eta    =  21 ;	 

  const r_gd     =  22 ;
  const r_fvd    =  23 ;
  const r_fhd    =  24 ;
  const r_fpd    =  25 ;
  const r_fqd    =  26 ;
  const r_td     =  27 ;
  const r_nd     =  28 ;
  const r_fed    =  29 ;
  const r_frd    =  30 ;
  const r_mu     =  31 ;

  const r_rx     =  32 ;

  const c_g      =  10.00 ;


  var   r       = new Array( r_rx ) ;

  for( var i = 0; i < r_rx; ++i )  r[i] = new Array( 1 ) ;

  const h       = x[ c_h     ][ c_r ] ;
  const btrad   = radians( x[ c_bt ][ c_r ] ) ;

  const rh      = x[ c_rh    ][ c_r ] ;
  const phkrad  = radians( x[ c_ph ][ c_r ] ) ;
  const ck      = x[ c_c     ][ c_r ] ;

  const pvgk   =  x[ c_pvgk  ][ c_r ] ;
  const apvgk  =  x[ c_apvgk ][ c_r ] ;
  const bpvgk  =  x[ c_bpvgk ][ c_r ] ;

  const qvqr   =  x[ c_qvqr  ][ c_r ] ;
  const aqvqr  =  x[ c_aqvqr ][ c_r ] ;
  const bqvqr  =  x[ c_bqvqr ][ c_r ] ;

  const phgk   =  x[ c_phgk  ][ c_r ] ;
  const aphgk  =  x[ c_aphgk ][ c_r ] ;
  const bphgk  =  x[ c_bphgk ][ c_r ] ;

  const qhqr   =  x[ c_qhqr  ][ c_r ] ;
  const aqhqr  =  x[ c_aqhqr ][ c_r ] ;
  const bqhqr  =  x[ c_bqhqr ][ c_r ] ;
  
  const fvgk   =  x[ c_fvgk  ][ c_r ] ;
  const afvgk  =  x[ c_afvgk ][ c_r ] ;

  const fvqr   =  x[ c_fvqr  ][ c_r ] ;
  const afvqr  =  x[ c_afvqr ][ c_r ] ;

  const fhgk   =  x[ c_fhgk  ][ c_r ] ;
  const afhgk  =  x[ c_afhgk ][ c_r ] ;

  const fhqr   =  x[ c_fhqr  ][ c_r ] ;
  const afhqr  =  x[ c_afhqr ][ c_r ] ;

  const gmph   =  x[ c_gmph  ][ c_r ] ;
  const gmc    =  x[ c_gmc   ][ c_r ] ;
  const gmg    =  x[ c_gmg   ][ c_r ] ;
  const gmq    =  x[ c_gmq   ][ c_r ] ;

  const thrad  = radians( th ) ;

  const ath    = ( (h / Math.tan( thrad )) - (h / Math.tan( btrad )) ) ;

  var   phdrad  = Math.atan( Math.tan( phkrad ) / gmph );
  var   phd     = degrees( phdrad ) ;
  var   cd      = ( ck / gmc );

  var   bapvgk  = undefined ;
  var   baqvqr  = undefined ;
  var   baphgk  = undefined ;
  var   baqhqr  = undefined ;
  var   bafvgk  = undefined ;
  var   bafvqr  = undefined ;
  var   bafhgk  = undefined ;
  var   bafhqr  = undefined ;

  var   l       = undefined ;
  var   a       = undefined ;

  var   gk      = undefined ;
  var   fvk     = undefined ;
  var   fhk     = undefined ;
  var   fpk     = undefined ;
  var   fqk     = undefined ;
  var   tk      = undefined ;
  var   nk      = undefined ;
  var   fek     = undefined ;
  var   frk     = undefined ;

  var   gd      = undefined ;
  var   fvd     = undefined ;
  var   fhd     = undefined ;
  var   fpd     = undefined ;
  var   fqd     = undefined ;
  var   td      = undefined ;
  var   nd      = undefined ;
  var   fed     = undefined ;
  var   frd     = undefined ;

  var   eta     = undefined ;
  var   mu      = undefined ;

  const cab     = function( c , a , b ) { var d ; if( c > (a + b) )  d = b ;  else  if( c > a )  d = (c - a) ;  else  d = 0.0 ; return( d ) ; } ;

  bapvgk = cab( ath , apvgk , bpvgk ) ;
  baqvqr = cab( ath , aqvqr , bqvqr ) ;
  baphgk = cab( ath , aphgk , bphgk ) ;
  baqhqr = cab( ath , aqhqr , bqhqr ) ;

  if( ath > afvgk )  bafvgk = 1.0 ;  else  bafvgk = 0.0 ;
  if( ath > afvqr )  bafvqr = 1.0 ;  else  bafvqr = 0.0 ;
  if( ath > afhgk )  bafhgk = 1.0 ;  else  bafhgk = 0.0 ;
  if( ath > afhqr )  bafhqr = 1.0 ;  else  bafhqr = 0.0 ;


  console.log( "ath="    , ath    ) ;
  console.log( "bapvgk=" , bapvgk ) ;
  console.log( "aqvqr="  , aqvqr  ) ;
  console.log( "bqvqr="  , bqvqr  ) ;
  console.log( "baqvqr=" , baqvqr ) ;
  console.log( "baphgk=" , baphgk ) ;
  console.log( "baqhqr=" , baqhqr ) ;


  l  = ( h / Math.sin( thrad ) ) ;

  a  = ( (1 / 2) * h * h * ((1 / Math.tan( thrad )) - (1 / Math.tan( btrad ))) ) ;


  gk = ( a * rh * g ) ;

  fvk = ( (pvgk * bapvgk) + (qvqr * baqvqr) + (fvgk * bafvgk) + (fvqr * bafvqr) ) ;

  fhk = ( (phgk * baphgk) + (qhqr * baqhqr) + fhgk + fhqr ) ;

  fpk = ( gk + fvk ) ;

  fqk = ( fhk ) ;

  fek = tk = ( (fpk * Math.sin( thrad )) - (fqk * Math.cos( thrad )) ) ;

  nk  =      ( (fpk * Math.cos( thrad )) + (fqk * Math.sin( thrad )) ) ;

  frk = ( (nk * Math.tan( phkrad )) + (ck * l) );

  if( fek )  eta = ( frk / fek ) ;  else  eta = 0.0 ;


  gd  = ( gmg * (1 / 2) * rh * c_g * h * h * ((1 / Math.tan( thrad )) - (1 / Math.tan( btrad ))) ) ;

  fvd = ( (gmg * pvgk * bapvgk) + (gmq * qvqr * baqvqr) + (gmg * fvgk * bafvgk) + (gmq * fvqr * bafvqr) ) ;

  fhd = ( (gmg * phgk * baphgk) + (gmq * qhqr * baqhqr) + (gmg * fhgk) + (gmq * fhqr) ) ;

  fpd = ( gd + fvd ) ;

  fqd = ( fhd ) ;

  fed = td = ( (fpd * Math.sin( thrad )) - (fqd * Math.cos( thrad )) );

  nd  =      ( (fpd * Math.cos( thrad )) + (fqd * Math.sin( thrad )) ) ;

  frd = ( (nd * Math.tan( phdrad )) + (cd * l) ) ;

  if( frd )  mu = ( fed / frd ) ;  else  mu = 0.0 ;


  r[ r_phd    ][ r_r ] = phd ;
  r[ r_cd     ][ r_r ] = cd ;

  r[ r_bapvgk ][ r_r ] = bapvgk ;
  r[ r_baqvqr ][ r_r ] = baqvqr ;
  r[ r_baphgk ][ r_r ] = baphgk ;
  r[ r_baqhqr ][ r_r ] = baqhqr ;
  r[ r_bafvgk ][ r_r ] = bafvgk ;
  r[ r_bafvqr ][ r_r ] = bafvqr ;
  r[ r_bafhgk ][ r_r ] = bafhgk ;
  r[ r_bafhqr ][ r_r ] = bafhqr ;

  r[ r_l      ][ r_r ] = l ;
  r[ r_a      ][ r_r ] = a ;

  r[ r_gk     ][ r_r ] = gk ;
  r[ r_fvk    ][ r_r ] = fvk ;
  r[ r_fhk    ][ r_r ] = fhk ;
  r[ r_fpk    ][ r_r ] = fpk ;
  r[ r_fqk    ][ r_r ] = fqk ;
  r[ r_tk     ][ r_r ] = tk ;
  r[ r_nk     ][ r_r ] = nk ;
  r[ r_fek    ][ r_r ] = fek ;
  r[ r_frk    ][ r_r ] = frk ;
  r[ r_eta    ][ r_r ] = eta ;

  r[ r_gd     ][ r_r ] = gd ;
  r[ r_fvd    ][ r_r ] = fvd ;
  r[ r_fhd    ][ r_r ] = fhd ;
  r[ r_fpd    ][ r_r ] = fpd ;
  r[ r_fqd    ][ r_r ] = fqd ;
  r[ r_td     ][ r_r ] = td ;
  r[ r_nd     ][ r_r ] = nd ;
  r[ r_fed    ][ r_r ] = fed ;
  r[ r_frd    ][ r_r ] = frd ;
  r[ r_mu     ][ r_r ] = mu ;


  return( r );

 
 }; // end function wedgeslope()


