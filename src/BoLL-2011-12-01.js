

function TeLL( x , m , l , nm , em )
 {

  return JaLL( x , 0 , 0 , 1 , 1 );

 }; // end function TeLL



function JaLL( x , m , l , nm , em )
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
  const c_s   =  7;
  const c_e   =  8;
  const c_ei  =  9;
  const c_ec  = 10;
  const c_ed  = 11;
  const c_a   = 12;
  const c_b   = 13;
  const c_sc  = 14;
  const c_nc  = 15;

  const c_n   =  0;
  const c_fe  =  1;
  const c_fr  =  2;

  const c_ecn =  3;
  const c_esn =  4;
  const c_scn =  5;
  const c_usn =  6;
  const c_ru  =  7;

  const c_m   =  0;

  if( ! m  ) var m  = 0.00;
  if( ! l  ) var l  = 0.00;

  if( ! nm ) var nm = 100.00;
  if( ! em ) var em =   1.00e-4;
  
  var i  = 0;
  var j  = 0;
  var jx = x[0].length;
  var k  = 0;

  var rj = 0;

  var nr = 0;
  var ns = ( jx + 1 );

  var p   = 0;
  var q   = 0;
  var c   = 0;
  var u   = 0;
  var ap  = 0;
  var ph  = 0;
  var fx  = 0;

  var ei  = 0;
  var ed  = 0;
  var a   = 0;
  var b   = 0;

  var e   = 0;
  var s   = 0;
  var ec  = 0;
  var nc  = 0;
  var sc  = 0;

  var esn = 0;
  var ecn = 0;
  var scn = 0;

  var ulq = 0;
  var usn = 0;
  var ru  = 0;

  var d   = 0;
  var dl  = 0;
  var dr  = 0;
  var ll  = 0;
  var lr  = 0;

  var n   = 0;
  var me  = 0;
  var mr  = 0;

  var mp  = 0;

  var nn  = 0;
  var nx  = 0;

  var rr  = ( c_ru + 1 );
  var rc  = ns;

  var r   = new Array( rr );

  for( i = 0; i < rr; ++i )  for( j = 0 , r[i] = new Array( rc ); j < rc; r[i][j] = 0 , ++j );

  for( mp = 1 , i = 0; ((i < nm) && (Math.abs( m - mp ) >= em)); ++i )
   {

    mp = m;

    for( j = 0 , rj = 1; j < jx; ++j , ++rj )
     {

      p  = x[ c_p  ][ j ];
      q  = x[ c_q  ][ j ];
      c  = x[ c_c  ][ j ];
      u  = x[ c_u  ][ j ];
      ap = x[ c_ap ][ j ]; 
      ph = x[ c_ph ][ j ];
      fx = x[ c_fx ][ j ];
      s  = x[ c_s  ][ j ];
      e  = x[ c_e  ][ j ];
      ei = x[ c_ei ][ j ];
      ec = x[ c_ec ][ j ];
      ed = x[ c_ed ][ j ];
      a  = x[ c_a  ][ j ];
      b  = x[ c_b  ][ j ];
      sc = x[ c_sc ][ j ];
      nc = x[ c_nc ][ j ];

      for( d = 1 , ulq = k = 0; ((k < nm) && (Math.abs( d ) >= em)); ++k )
       {

        if( (! m) && (! l) )

          n  = ( (p * Math.cos( ap )) + (q * Math.sin( ap )) - (u + ulq) );

        else
         {

          n  = ( p + (l * fx * q) - ((u + ulq) * (Math.cos( ap ) + l * fx * Math.sin( ap ))) - (m * c * (Math.sin( ap ) - l * fx * Math.cos( ap ))) );

          n /= ( (Math.cos( ap ) + (m * Math.tan( ph ) * Math.sin( ap ))) + (l * fx * (Math.sin( ap ) - (m * Math.tan( ph ) * Math.cos( ap )))) ); 

         }; // end else

        // Bauer / Gudehus compression law:

        ecn = ( ec * Math.exp( - Math.pow( (n / sc) , nc ) ) );

        if( e > ecn )
         {

          esn = ( e - ((1 - s) * (e - ecn)) );

          if( esn < ec )  scn = ( sc * Math.pow( - Math.log( esn / ec ) , (1 / nc) ) );  else  scn = 0;

          usn = ( n - scn );

         }

        else  esn = e , usn = 0 , scn = n;

        d = ( usn - ulq );

        if( ! k )  dl = d , ll = usn , dr = d , lr = usn , ulq = ( n * Math.random() );

        else  
         {

          if( (d * dl) > 0 )  dl = d , ll = usn;  else  dr = d , lr = usn;

          if( dl != dr )  ulq = ( ll - (dl * ((lr - ll) / (dr - dl))) );  else  ulq = ( n * Math.random() );

         }; // end else

       }; // end for( k )

      u  += usn;

      n  -= usn;

      if( n )  ru  = ( usn / (usn + n) );  else  ru = 0;

      r[ c_n   ][ rj  ] = n;

      r[ c_ecn ][ rj  ] = ecn;
      r[ c_esn ][ rj  ] = esn;
      r[ c_scn ][ rj  ] = scn;
      r[ c_usn ][ rj  ] = usn;
      r[ c_ru  ][ rj  ] = ru;

      r[ c_fe  ][ c_m ] += r[ c_fe ][ rj ] = fe = ( (n * Math.sin( ap )) + (u * Math.sin( ap ) - q) );
      r[ c_fr  ][ c_m ] += r[ c_fr ][ rj ] = fr = ( ((n * Math.tan( ph )) + c) * Math.cos( ap ) );

     }; // end for( j )

    r[ c_n   ][ c_m ] = m = ( r[ c_fe ][ c_m ] / r[ c_fr ][ c_m ] );

   }; // end for( i )

  for( j = 0 , rj = 1; j < jx; ++j , ++rj )
   {

    ph = x[ c_ph ][ j  ];
    s  = x[ c_s  ][ j  ];
    e  = x[ c_e  ][ j  ];
    ei = x[ c_ei ][ j  ];
    ec = x[ c_ec ][ j  ];
    ed = x[ c_ed ][ j  ];
    a  = x[ c_a  ][ j  ];
    b  = x[ c_b  ][ j  ];
    sc = x[ c_sc ][ j  ];
    nc = x[ c_nc ][ j  ];

    n  = r[ c_n  ][ rj ];

    nn = ( (n - (c * Math.cos( ph ))) / (1 + Math.sin( ph )) );
    nx = ( (n + (c * Math.cos( ph ))) / (1 - Math.sin( ph )) );

   }; // end for( j )

  return r;

 }; // end function JaLL



function FeLL( x , m , l , nm , em )
 {

  return BiLL( x , 0 , 0 , 1 , 1 );

 }; // end function FeLL



function BiLL( x , m , l , nm , em )
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
  const c_s   =  7;
  const c_e   =  8;
  const c_ei  =  9;
  const c_ec  = 10;
  const c_ed  = 11;
  const c_a   = 12;
  const c_b   = 13;
  const c_sc  = 14;
  const c_nc  = 15;

  const c_n   =  0;
  const c_me  =  1;
  const c_mr  =  2;

  const c_ecn =  3;
  const c_esn =  4;
  const c_scn =  5;
  const c_usn =  6;
  const c_ru  =  7;

  const c_m   =  0;

  if( ! m  ) var m  = 0.00;
  if( ! l  ) var l  = 0.00;

  if( ! nm ) var nm = 100.00;
  if( ! em ) var em =   1.00e-4;
  
  var i  = 0;
  var j  = 0;
  var jx = x[0].length;
  var k  = 0;

  var rj = 0;

  var nr = 0;
  var ns = ( jx + 1 );

  var p   = 0;
  var q   = 0;
  var c   = 0;
  var u   = 0;
  var ap  = 0;
  var ph  = 0;
  var fx  = 0;

  var ei  = 0;
  var ed  = 0;
  var a   = 0;
  var b   = 0;

  var e   = 0;
  var s   = 0;
  var ec  = 0;
  var nc  = 0;
  var sc  = 0;

  var esn = 0;
  var ecn = 0;
  var scn = 0;

  var ulq = 0;
  var usn = 0;
  var ru  = 0;

  var d   = 0;
  var dl  = 0;
  var dr  = 0;
  var ll  = 0;
  var lr  = 0;

  var n   = 0;
  var me  = 0;
  var mr  = 0;

  var mp  = 0;

  var nn  = 0;
  var nx  = 0;

  var rr  = ( c_ru + 1 );
  var rc  = ns;

  var r   = new Array( rr );

  for( i = 0; i < rr; ++i )  for( j = 0 , r[i] = new Array( rc ); j < rc; r[i][j] = 0 , ++j );

  for( mp = 1 , i = 0; ((i < nm) && (Math.abs( m - mp ) >= em)); ++i )
   {

    mp = m;

    for( j = 0 , rj = 1; j < jx; ++j , ++rj )
     {

      p  = x[ c_p  ][ j ];
      q  = x[ c_q  ][ j ];
      c  = x[ c_c  ][ j ];
      u  = x[ c_u  ][ j ];
      ap = x[ c_ap ][ j ]; 
      ph = x[ c_ph ][ j ];
      fx = x[ c_fx ][ j ];
      s  = x[ c_s  ][ j ];
      e  = x[ c_e  ][ j ];
      ei = x[ c_ei ][ j ];
      ec = x[ c_ec ][ j ];
      ed = x[ c_ed ][ j ];
      a  = x[ c_a  ][ j ];
      b  = x[ c_b  ][ j ];
      sc = x[ c_sc ][ j ];
      nc = x[ c_nc ][ j ];

      for( d = 1 , ulq = k = 0; ((k < nm) && (Math.abs( d ) >= em)); ++k )
       {

        if( (! m) && (! l) )

          n  = ( (p * Math.cos( ap )) + (q * Math.sin( ap )) - (u + ulq) );

        else
         {

          n  = ( p + (l * fx * q) - ((u + ulq) * (Math.cos( ap ) + l * fx * Math.sin( ap ))) - (m * c * (Math.sin( ap ) - l * fx * Math.cos( ap ))) );

          n /= ( (Math.cos( ap ) + (m * Math.tan( ph ) * Math.sin( ap ))) + (l * fx * (Math.sin( ap ) - (m * Math.tan( ph ) * Math.cos( ap )))) ); 

         }; // end else

        // Bauer / Gudehus compression law:

        ecn = ( ec * Math.exp( - Math.pow( (n / sc) , nc ) ) );

        if( e > ecn )
         {

          esn = ( e - ((1 - s) * (e - ecn)) );

          if( esn < ec )  scn = ( sc * Math.pow( - Math.log( esn / ec ) , (1 / nc) ) );  else  scn = 0;

          usn = ( n - scn );

         }

        else  esn = e , usn = 0 , scn = n;

        d = ( usn - ulq );

        if( ! k )  dl = d , ll = usn , dr = d , lr = usn , ulq = ( n * Math.random() );

        else  
         {

          if( (d * dl) > 0 )  dl = d , ll = usn;  else  dr = d , lr = usn;

          if( dl != dr )  ulq = ( ll - (dl * ((lr - ll) / (dr - dl))) );  else  ulq = ( n * Math.random() );

         }; // end else

       }; // end for( k )

      u  += usn;

      n  -= usn;

      if( n )  ru  = ( usn / (usn + n) );  else  ru = 0;

      r[ c_n   ][ rj  ] = n;

      r[ c_ecn ][ rj  ] = ecn;
      r[ c_esn ][ rj  ] = esn;
      r[ c_scn ][ rj  ] = scn;
      r[ c_usn ][ rj  ] = usn;
      r[ c_ru  ][ rj  ] = ru;

      r[ c_me  ][ c_m ] += r[ c_me ][ rj ] = me = ( (p * Math.sin( ap )) - (q * Math.cos( ap )) );
      r[ c_mr  ][ c_m ] += r[ c_mr ][ rj ] = mr = ( (n * Math.tan( ph )) + c );

     }; // end for( j )

    r[ c_n   ][ c_m ] = m = ( r[ c_me ][ c_m ] / r[ c_mr ][ c_m ] );

   }; // end for( i )

  for( j = 0 , rj = 1; j < jx; ++j , ++rj )
   {

    ph = x[ c_ph ][ j  ];
    s  = x[ c_s  ][ j  ];
    e  = x[ c_e  ][ j  ];
    ei = x[ c_ei ][ j  ];
    ec = x[ c_ec ][ j  ];
    ed = x[ c_ed ][ j  ];
    a  = x[ c_a  ][ j  ];
    b  = x[ c_b  ][ j  ];
    sc = x[ c_sc ][ j  ];
    nc = x[ c_nc ][ j  ];

    n  = r[ c_n  ][ rj ];

    nn = ( (n - (c * Math.cos( ph ))) / (1 + Math.sin( ph )) );
    nx = ( (n + (c * Math.cos( ph ))) / (1 - Math.sin( ph )) );

   }; // end for( j )

  return r;

 }; // end function BiLL




function BoFReGuT( x , l , nl , el )
 {
   
  const c_p   =  0;
  const c_q   =  1;
  const c_c   =  2;
  const c_u   =  3;
  const c_ap  =  4;
  const c_ph  =  5;
  const c_fx  =  6;
  const c_s   =  7;
  const c_e   =  8;
  const c_ei  =  9;
  const c_ec  = 10;
  const c_ed  = 11;
  const c_a   = 12;
  const c_b   = 13;
  const c_sc  = 14;
  const c_nc  = 15;

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

  const c_l   =  3;

  const c_l1  =  4;
  const c_l2  =  5;

  const c_ra  =  6;
  const c_rb  =  7;
  const c_rc  =  8;

  if( ! l  ) var l  =   0.50;
  if( ! nl ) var nl = 100.00;
  if( ! el ) var el =   1.00e-4;
  
  var i  = 0;
  var j  = 0;
  var jx = x[0].length;
 
  var rj = 0;

  var nr = 0;
  var ns = ( jx + 1 );

  var p   = 0;
  var q   = 0;
  var c   = 0;
  var u   = 0;
  var ap  = 0;
  var ph  = 0;

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

  var d   = 0;
  var dl  = 0;
  var dr  = 0;
  var ll  = 0;
  var lr  = 0;

  var n   = 0;

  var nn  = 0;
  var nx  = 0;

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

  for( d = 1 , i = 0; ((i < nl) && (Math.abs( d ) >= el)); ++i )
   {

    ca = cb = cc = cd = ce = cf = cg = ch = 0;

    for( j = 0 , rj = 1; j < jx; ++j , ++rj )
     {

      p  = x[ c_p  ][ j ];
      q  = x[ c_q  ][ j ];
      c  = x[ c_c  ][ j ];
      u  = x[ c_u  ][ j ];
      ap = x[ c_ap ][ j ]; 
      ph = x[ c_ph ][ j ];
      s  = x[ c_s  ][ j ];
      e  = x[ c_e  ][ j ];
      ei = x[ c_ei ][ j ];
      ec = x[ c_ec ][ j ];
      ed = x[ c_ed ][ j ];
      a  = x[ c_a  ][ j ];
      b  = x[ c_b  ][ j ];
      sc = x[ c_sc ][ j ];
      nc = x[ c_nc ][ j ];

      n   = ( l * ((p * Math.cos( ap )) + (q * Math.sin( ap )) - u) );

      // Bauer / Gudehus compression law:

      ecn = ( ec * Math.exp( - Math.pow( (n / sc) , nc ) ) );

      if( e > ecn )
       {
  
        esn = ( e - ((1 - s) * (e - ecn)) );

        if( esn < ec )  scn = ( sc * Math.pow( - Math.log( esn / ec ) , (1 / nc) ) );  else  scn = 0;

        usn = ( n - scn );

       }

      else  esn = e , usn = 0 , scn = n;

      u  += usn;

      n  -= usn;

      if( n )  ru  = ( usn / (usn + n) );  else  ru = 0;

      r[ c_n   ][ rj ] = n;

      r[ c_ecn ][ rj ] = ecn;
      r[ c_esn ][ rj ] = esn;
      r[ c_scn ][ rj ] = scn;
      r[ c_usn ][ rj ] = usn;
      r[ c_ru  ][ rj ] = ru;

      ca += r[ c_ca ][ rj ] = ( n * Math.tan( ph ) * Math.sin( ap ) );
      cb += r[ c_cb ][ rj ] = ( n * Math.cos( ap ) ); 
      cc += r[ c_cc ][ rj ] = ( c * Math.sin( ap ) );
      cd += r[ c_cd ][ rj ] = ( (u * Math.cos( ap )) - p );
      ce += r[ c_ce ][ rj ] = ( n * Math.tan( ph ) * Math.cos( ap ) );
      cf += r[ c_cf ][ rj ] = (- (n * Math.sin( ap )) );
      cg += r[ c_cg ][ rj ] = ( c * Math.cos( ap ) );
      ch += r[ c_ch ][ rj ] = (- ((u * Math.sin( ap )) - q) );

     }; // end for( j )

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

    r[ c_l  ][ nr ] = l;

    r[ c_m  ][ nr ] = m;

    l1 = (- ((m * cc) + cd) / ((m * ca) + cb) );

    r[ c_l1 ][ nr ] = l1;

    l2 = (- ((m * cg) + ch) / ((m * ce) + cf) );

    r[ c_l2 ][ nr ] = l2;

    // Cross check the two lambda solutions:

    if( Math.abs( l1 - l2 ) < el )
     {

      d = ( l1 - l );

      if( ! i )  dl = d , ll = l , dr = d , lr = l , l += l;

      else  
       {

        if( (d * dl) > 0 )  dl = d , ll = l1;  else  dr = d , lr = l1;

        if( dl != dr )  l = ( ll - (dl * ((lr - ll) / (dr - dl))) );  else  l = Math.random();

       }; // end else

     } // end if()

    else  l = Math.random();

    r[ c_ecn ][ nr ] = dl;
    r[ c_esn ][ nr ] = dr;
    r[ c_scn ][ nr ] = ll;
    r[ c_usn ][ nr ] = lr;
    r[ c_ru  ][ nr ] = d;

   }; // end for( i )

  for( j = 0 , rj = 1; j < jx; ++j , ++rj )
   {

    ph = x[ c_ph ][ j  ];
    s  = x[ c_s  ][ j  ];
    e  = x[ c_e  ][ j  ];
    ei = x[ c_ei ][ j  ];
    ec = x[ c_ec ][ j  ];
    ed = x[ c_ed ][ j  ];
    a  = x[ c_a  ][ j  ];
    b  = x[ c_b  ][ j  ];
    sc = x[ c_sc ][ j  ];
    nc = x[ c_nc ][ j  ];

    n  = r[ c_n  ][ rj ];

    nn = ( (n - (c * Math.cos( ph ))) / (1 + Math.sin( ph )) );
    nx = ( (n + (c * Math.cos( ph ))) / (1 - Math.sin( ph )) );

   }; // end for( j )

  return r;

 }; // end function ' BoFReGuT() - BoLL() - Borowicka with Liquefaction Logic : Statically determined, vertical and horizontal force equilibrium


