
function Borowicka( x )
 {
   
  const c_p   =  0;
  const c_q   =  1;
  const c_c   =  2;
  const c_u   =  3;
  const c_ap  =  4;
  const c_ph  =  5;
  const c_fx  =  6;

  const c_n   =  0;

  const c_ca  =  1;
  const c_cb  =  2;
  const c_cc  =  3;
  const c_cd  =  4;
  const c_ce  =  5;
  const c_cf  =  6;
  const c_cg  =  7;
  const c_ch  =  8;

  const c_m   =  0;

  const c_m1  =  1;
  const c_m2  =  2;

  const c_l   =  3;

  const c_l1  =  4;
  const c_l2  =  5;

  const c_ra  =  6;
  const c_rb  =  7;
  const c_rc  =  8;
  
  var i  = 0;
  var j  = 0;
  var k  = 0;
  var kx = x[0].length;
 
  var rk = 0;

  var nr = 0;
  var ns = ( kx + 1 );

  var p   = 0;
  var q   = 0;
  var c   = 0;
  var u   = 0;
  var ap  = 0;
  var ph  = 0;
  var fx  = 0;

  var m   = 0;

  var m1  = 0;
  var m2  = 0;

  var l   = 0;
   
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

  var rr  = ( c_ch + 1 );
  var rc  = ( ns + 1 );

  var r   = new Array( rr );

  for( i = 0; i < rr; ++i )  for( j = 0 , r[i] = new Array( rc ); j < rc; r[i][j] = 0 , ++j );

  ca = cb = cc = cd = ce = cf = cg = ch = 0;

  for( k = 0 , rk = 1; k < kx; ++k , ++rk )
   {

    p  = x[ c_p  ][ k ];
    q  = x[ c_q  ][ k ];
    c  = x[ c_c  ][ k ];
    u  = x[ c_u  ][ k ];
    ap = x[ c_ap ][ k ]; 
    ph = x[ c_ph ][ k ];
    fx = x[ c_fx ][ k ];

    n   = ( fx * ((p * Math.cos( ap )) + (q * Math.sin( ap )) - u) );
  
    r[ c_n   ][ rk ] = n;

    ca += r[ c_ca ][ rk ] = ( n * Math.tan( ph ) * Math.sin( ap ) );
    cb += r[ c_cb ][ rk ] = ( n * Math.cos( ap ) ); 
    cc += r[ c_cc ][ rk ] = ( c * Math.sin( ap ) );
    cd += r[ c_cd ][ rk ] = ( (u * Math.cos( ap )) - p );
    ce += r[ c_ce ][ rk ] = ( n * Math.tan( ph ) * Math.cos( ap ) );
    cf += r[ c_cf ][ rk ] = (- (n * Math.sin( ap )) );
    cg += r[ c_cg ][ rk ] = ( c * Math.cos( ap ) );
    ch += r[ c_ch ][ rk ] = (- ((u * Math.sin( ap )) - q) );

   }; // end for( k )

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

  if( ra )
   {

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
 
    if( m1 < m2 )  m = m1;  else  m = m2;

    l1 = (- ((m * cc) + cd) / ((m * ca) + cb) );

    r[ c_l1 ][ nr ] = l1;

    l2 = (- ((m * cg) + ch) / ((m * ce) + cf) );

    r[ c_l2 ][ nr ] = l2;
      
   } // end if() +
     
  else
   {
 
    m = m1 = m2 = Math.abs( - rc / rb );

    r[ c_m1 ][ nr ] = m1;

    r[ c_m2 ][ nr ] = m2;

    l1 = l2 = 0;

    r[ c_l1 ][ nr ] = l1;

    r[ c_l2 ][ nr ] = l2;

   }; // end else

  r[ c_l  ][ nr ] = l;

  r[ c_m  ][ nr ] = m;

  return r;

 }; // end function Borowicka()


