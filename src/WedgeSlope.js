

function WedgeSlope( x , th )
 {
  
  const c_r     =  0;
  const c_h     =  0;
  const c_bt    =  1;

  const c_rh    =  2;
  const c_ph    =  3;
  const c_c     =  4;

  const c_q     =  5;
  const c_ap    =  6;
  const c_fv    =  7;
  const c_fh    =  8;

  const c_gph   =  9;
  const c_gc    = 10;
  const c_gg    = 11;
  const c_gq    = 12;

  const r_r     =  0;
  const r_phd   =  0;
  const r_cd    =  1;
  const r_fe    =  2;
  const r_fr    =  3;
  const r_m     =  4;
  const r_rx    =  5;

  const c_g     = 10;

  var   r       = new Array( r_rx );

  for( var i = 0; i < r_rx; ++i )  r[i] = new Array( 1 );

  var   thrad   = Radians( th );
    
  var   h       = x[ c_h   ][ c_r ];
  var   btrad   = Radians( x[ c_bt ][ c_r ] );

  var   rh      = x[ c_rh  ][ c_r ];
  var   phkrad  = Radians( x[ c_ph ][ c_r ] );
  var   ck      = x[ c_c   ][ c_r ];

  var   q       = x[ c_q   ][ c_r ];
  var   aprad   = Radians( x[ c_ap ][ c_r ] );

  var   fv      = x[ c_fv  ][ c_r ];
  var   fh      = x[ c_fh  ][ c_r ];

  var   gph     = x[ c_gph ][ c_r ];
  var   gc      = x[ c_gc  ][ c_r ];

  var   gg      = x[ c_gg  ][ c_r ];
  var   gq      = x[ c_gq  ][ c_r ];

  var   l       = 0;

  var   fp      = 0;
  var   fq      = 0;

  var   fe      = 0;
  var   fr      = 0;

  var   m       = 0;

  var   phdrad  = Math.atan( Math.tan( phkrad ) / gph );
  var   cd      = ( ck / gc );


  if( thrad > btrad )  thrad = btrad;

  if( aprad > btrad )  aprad = btrad;

  if( aprad < thrad )  aprad = thrad;


  fp = ( (gq * fv) + (gg * (1 / 2) * rh * c_g * h * h * ((1 / Math.tan( thrad )) - (1 / Math.tan( btrad )))) );
 
  if( aprad > thrad ) fp += ( gq * q * h * ((1 / Math.tan( thrad )) - (1 / Math.tan( aprad ))) );

  fq = ( gq * fh );


  l  = ( h / Math.sin( thrad ) );

  fe = (   (fp * Math.sin( thrad )) - (fq * Math.cos( thrad )) );

  fr = ( (((fp * Math.cos( thrad )) + (fq * Math.sin( thrad ))) * Math.tan( phdrad )) + (cd * l) );

  if( fr )  m = ( fe / fr );  else  m = ( Math.tan( btrad ) / Math.tan( phdrad ) );


  r[ r_phd ][ r_r ] = Degrees( phdrad );
  r[ r_cd  ][ r_r ] = cd;
  
  r[ r_fe  ][ r_r ] = fe;
  r[ r_fr  ][ r_r ] = fr;
  r[ r_m   ][ r_r ] = m;

  return( r );
  
 }; // end function WedgeSlope()

