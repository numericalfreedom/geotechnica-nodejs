
function ShahunyantsOriginal( x )
 {

  const c_0   =  1.0e-4;
  const c_ne  =  1.0e-3;

  const c_p   =  0;
  const c_q   =  1;
  const c_c   =  2;
  const c_u   =  3;
  const c_ap  =  4;
  const c_ph  =  5;
  const c_fx  =  6;

  const r_n   =  0;
  const r_fe  =  1;
  const r_fr  =  2;
  const r_ee  =  3;
  const r_ex  =  4;
  const r_rx  =  5;

  const r_m   =  0;

  if( ! l  ) var l  =   0.00;

  if( ! nm ) var nm = 100.00;
  if( ! em ) var em =   1.00e-4;
  
  var i   = 0;
  var j   = 0;
  var jx  = x[0].length;
  var k   = 0;
  
  var rj  = 0;

  var nr  = 0;
  var ns  = ( jx + 1 );

  var p   = 0;
  var q   = 0;
  var c   = 0;
  var u   = 0;
  var ap  = 0;
  var ph  = 0;
  var fx  = 0;

  var fn  = 0;
  var ft  = 0;
  var fte = 0;
  var ftr = 0;
  var w   = 0;
  
  var m   = 0;

  var ee  = 0;
  var ex  = 0;

  var eep = 0;
  var exp = 0;

  var n   = 0;
  var fe  = 0;
  var fr  = 0;
  var me  = 0;
  var mr  = 0;

  var mp  = 0;

  var nn  = 0;
  var nx  = 0;

  var rc  = ns;

  var r   = new Array( r_rx );

  for( i = 0; i < r_rx; ++i )  for( j = 0 , r[i] = new Array( rc ); j < rc; r[i][j] = 0 , ++j );

  r[ r_fe  ][ r_m ] = r[ r_fr  ][ r_m ] = 0;

  for( j = 0 , rj = 1; j < jx; ++j , ++rj )
   {

    p  = x[ c_p  ][ j ];
    q  = x[ c_q  ][ j ];
    c  = x[ c_c  ][ j ];
    u  = x[ c_u  ][ j ];
    ap = x[ c_ap ][ j ]; 
    ph = x[ c_ph ][ j ];
    fx = x[ c_fx ][ j ];

    fn = ( (p * Math.cos( ap )) + (q * Math.sin( ap )) );
    ft = ( (p * Math.sin( ap )) - (q * Math.cos( ap )) );
    
    w  = ( Math.cos( ph ) / Math.cos( ap - ph ) );

    fte = ftr = 0.0;

    if( ft > 0 )  fte = ft;  else  ftr = Math.abs( ft );

    r[ r_fe ][ r_m ] += r[ r_fe ][ rj ] = fe = ( fte * w );

    r[ r_fr ][ r_m ] += r[ r_fr ][ rj ] = fr = ( (((fn - u) * Math.tan( ph )) + c + ftr ) * w );

   }; // end for( j )

  r[ r_n ][ r_m ] = m = ( r[ r_fe ][ r_m ] / r[ r_fr ][ r_m ] );

  for( j = 0 , rj = 1 , eep = exp = 0; j < jx; ++j , ++rj )
   {

    p  = x[ c_p  ][ j ];
    q  = x[ c_q  ][ j ];
    c  = x[ c_c  ][ j ];
    u  = x[ c_u  ][ j ];
    ap = x[ c_ap ][ j ]; 
    ph = x[ c_ph ][ j ];
    fx = x[ c_fx ][ j ];

    fn = ( (p * Math.cos( ap )) + (q * Math.sin( ap )) );
    ft = ( (p * Math.sin( ap )) - (q * Math.cos( ap )) );
    
    w  = ( Math.cos( ph ) / Math.cos( ap - ph ) );

    r[ r_ee ][ rj ] = ee = ( eep + ((((fn - u) * Math.tan( ph )) + c - ft) * w) );
    r[ r_ee ][ rj ] = ex = 0.0;

    r[ r_n  ][ rj ] = n  = ( (fn - u) - ((ee - eep) * Math.sin( ap )) );

    eep = ee;
    exp = ex;
    
    r[ r_ee ][ r_m ] += me = ( (p * Math.sin( ap )) - (q * Math.cos( ap )) );
    r[ r_ex ][ r_m ] += mr = ( m * ((n * Math.tan( ph )) + c) );

   }; // end for( j )

  return r;

 }; // end function ShahunyantsOriginal()

