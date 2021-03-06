
function BFRT( x , l )
 {

  // L  = 1: Simplified method for initial guess
  // L <> 1: Rigorous method for iteration until L = L1 = L2 !
  // Rigorous method leads to higher serviceability values !

  const c_p   =  0;
  const c_q   =  1;
  const c_c   =  2;
  const c_u   =  3;
  const c_a   =  4;
  const c_f   =  5;
  const c_fx  =  6;
  const c_e   =  7;
  const c_s   =  8;
  const c_ec  =  9;
  const c_nc  = 10;
  const c_sc  = 11;

  const c_n   =  0;

  const c_ca  =  1;
  const c_cb  =  2;
  const c_cc  =  3;
  const c_cd  =  4;
  const c_ce  =  5;
  const c_cf  =  6;
  const c_cg  =  7;
  const c_ch  =  8;

  const c_ecn =  9;
  const c_esn = 10;
  const c_scn = 11;
  const c_usn = 12;
  const c_ru  = 13;

  const c_m   =  0;

  const c_m1  =  1;
  const c_m2  =  2;
  
  const c_l1  =  4;
  const c_l2  =  5;

  const c_ra  =  6;
  const c_rb  =  7;
  const c_rc  =  8;

  var i  = 0;
  var j  = 0;

  var k  = 0;
  var kn = 0;
  var kx = x[0].length;
  var ks = 1;
 
  var rk = 0;

  var nr = 0;
  var ns = ( kx + 1 );

  var p  = 0;
  var q  = 0;
  var c  = 0;
  var u  = 0;
  var a  = 0;
  var f  = 0;

  var e   = 0;
  var s   = 0;
  var ec  = 0;
  var nc  = 0;
  var sc  = 0;

  var esn = 0;
  var ecn = 0;
  var scn = 0;

  var usn = 0;
  var ru  = 0;

  var m   = 0;

  var m1  = 0;
  var m2  = 0;
 
  var l1  = 0;
  var l2  = 0;
  
  var n   = 0;

  var ca  = 0;
  var cb  = 0;
  var cc  = 0;
  var cd  = 0;
  var ce  = 0;
  var cf  = 0;
  var cg  = 0;
  var ch  = 0;

  var ra  = 0;
  var rb  = 0;
  var rc  = 0;

  var rr  = ( c_ru + 1 );
  var rc  = ( ns + 1 );

  var r   = new Array( rr );

  for( i = 0; i < rr; ++i )  for( j = 0 , r[i] = new Array( rc ); j < rc; r[i][j] = 0 , ++j );

  ca = cb = cc = cd = ce = cf = cg = ch = 0;

  for( k = kn; k < kx; k += ks )
   {

    rk = ( k + 1 );

    p  = x[ c_p  ][ k ];
    q  = x[ c_q  ][ k ];
    c  = x[ c_c  ][ k ];
    u  = x[ c_u  ][ k ];
    a  = x[ c_a  ][ k ];
    f  = x[ c_f  ][ k ];
    e  = x[ c_e  ][ k ];
    s  = x[ c_s  ][ k ];
    ec = x[ c_ec ][ k ];
    nc = x[ c_nc ][ k ];
    sc = x[ c_sc ][ k ];

    n   = ( l * ((p * Math.cos( a )) + (q * Math.sin( a )) - u) );

    ecn = ( ec * Math.exp( - Math.pow( (n / sc) , nc ) ) );

    esn = ( e - ((1 - s) * (e - ecn)) )

    scn = ( sc * Math.pow( - Math.log( esn / ec ) , (1 / nc) ) );

    usn = ( n - scn );

    if( n )  ru  = ( usn / n );  else  ru = 0;

    u  += usn;

    r[ c_n   ][ rk ] = n;

    n  -= usn;

    r[ c_ecn ][ rk ] = ecn;
    r[ c_esn ][ rk ] = esn;
    r[ c_scn ][ rk ] = scn;
    r[ c_usn ][ rk ] = usn;
    r[ c_ru  ][ rk ] = ru;

    ca += r[ c_ca ][ rk ] = ( n * Math.tan( f ) * Math.sin( a ) );
    cb += r[ c_cb ][ rk ] = ( n * Math.cos( a ) );
    cc += r[ c_cc ][ rk ] = ( c * Math.sin( a ) );
    cd += r[ c_cd ][ rk ] = ( (u * Math.cos( a )) - p );
    ce += r[ c_ce ][ rk ] = ( n * Math.tan( f ) * Math.cos( a ) );
    cf += r[ c_cf ][ rk ] = (- (n * Math.sin( a )) );
    cg += r[ c_cg ][ rk ] = ( c * Math.cos( a ) );
    ch += r[ c_ch ][ rk ] = (- ((u * Math.sin( a )) - q) );

   }; // end for( k )

  // print( ca , cb , cc , cd , ce , cf , cg , ch );

  r[ c_ca ][ ns ] = ca;
  r[ c_cb ][ ns ] = cb;
  r[ c_cc ][ ns ] = cc;
  r[ c_cd ][ ns ] = cd;
  r[ c_ce ][ ns ] = ce;
  r[ c_cf ][ ns ] = cf;
  r[ c_cg ][ ns ] = cg;
  r[ c_ch ][ ns ] = ch;

  ra = ( (cc * ce) - (ca * cg) );

  rb = ( (cd * ce) + (cc * cf) - (cb * cg) - (ca * ch) );

  rc = ( (cd * cf) - (cb * ch) );

  rc = ( rc / ra );

  rb = ( rb / ra );

  ra = 1;

  r[ c_ra ][ nr ] = ra;
  r[ c_rb ][ nr ] = rb;
  r[ c_rc ][ nr ] = rc;
 
  m1 = Math.abs( ((- rb) + Math.sqrt( (rb * rb) - (4 * ra * rc) )) / 2 );

  r[ c_m1 ][ nr ] = m1;

  m2 = Math.abs( ((- rb) - Math.sqrt( (rb * rb) - (4 * ra * rc) )) / 2 );

  r[ c_m2 ][ nr ] = m2;

  if( m1 < m2 )  m = m1; else  m = m2;

  r[ c_m  ][ nr ] = m;

  l1 = (- ((m * cc) + cd) / ((m * ca) + cb) );

  r[ c_l1 ][ nr ] = l1;

  l2 = (- ((m * cg) + ch) / ((m * ce) + cf) );

  r[ c_l2 ][ nr ] = l2;

  return r;

 }; // end function ' borowicka() : Statically determined, vertical and horizontal force equilibrium
