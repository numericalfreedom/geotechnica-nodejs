
function TeLL( x , m , l , nm , em )
 {

  return JaLL( x , 0 , 0 , 1 , 1 );

 }; // end function TeLL



function JaLL( x , m , l , nm , em )
 {

  const c_0_0 =  0.0;
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
  const c_hc  = 14;
  const c_nc  = 15;

  const c_n   =  0;
  const c_fe  =  1;
  const c_fr  =  2;

  const c_ecn =  3;
  const c_esn =  4;
  const c_psn =  5;
  const c_usn =  6;
  const c_ru  =  7;

  const c_m   =  0;

  if( ! m  ) var m  =   0.00;
  if( ! l  ) var l  =   0.00;

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
  
  var cm  = 0;
  var phm = 0;

  var ei  = 0;
  var ed  = 0;
  var a   = 0;
  var b   = 0;

  var e   = 0;
  var s   = 0;
  var ec  = 0;
  var hc  = 0;
  var nc  = 0;

  var esn = 0;
  var ecn = 0;
  var psn = 0;
  var pcn = 0;

  var ulq = 0;
  var usn = 0;
  var ru  = 0;

  var d   = 0;
  var dl  = 0;
  var dr  = 0;
  var ll  = 0;
  var lr  = 0;

  var n   = 0;
  var fe  = 0;
  var fr  = 0;

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

    r[ c_fe  ][ c_m ] = r[ c_fr  ][ c_m ] = 0;

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
      hc = x[ c_hc ][ j ];
      nc = x[ c_nc ][ j ];

      for( d = 1 , ulq = k = 0; ((k < nm) && (Math.abs( d ) >= em)); ++k )
       {

        if( (! m) && (! l) && (! i) )
         {

          n  = ( (p * Math.cos( ap )) + (q * Math.sin( ap )) - (u + ulq) );

         } // end if() +

        else
         {

          n  = ( p + (l * fx * q) - ((u + ulq) * (Math.cos( ap ) + (l * fx * Math.sin( ap )))) - (m * c * (Math.sin( ap ) - (l * fx * Math.cos( ap )))) );

          n /= ( (Math.cos( ap ) + (m * Math.tan( ph ) * Math.sin( ap ))) + (l * fx * (Math.sin( ap ) - (m * Math.tan( ph ) * Math.cos( ap )))) ); 

         }; // end else

        cm  = ( m * c );
        phm = Math.atan( m * Math.tan( ph ) );

        nn  = ( (n - (cm * Math.cos( phm ))) / (1 + Math.sin( phm )) );
        nx  = ( (n + (cm * Math.cos( phm ))) / (1 - Math.sin( phm )) );

        pcn = psn = ( (nx + (2 * nn)) / 3 );

        // Bauer / Gudehus compression law:

        ecn = esn = ( ec * Math.exp( - Math.pow( ((3 * pcn) / hc) , nc ) ) );

        if( e > ecn )
         {

          esn = ( s * e );

          if( esn < ecn )  esn = ecn;

          if( esn < ec  )  psn = ( (hc / 3) * Math.pow( - Math.log( esn / ec ) , (1 / nc) ) );  else  psn = 0;
    
         }

        usn = ( pcn - psn );

        d = ( usn - ulq );

        if( ! k )  dl = d , ll = ulq , dr = d , lr = ulq , ulq = ( n * Math.random() );

        else  
         {

          if( (d * dl) > 0 )  dl = d , ll = ulq;  else  dr = d , lr = ulq;

          if( dl != dr )  ulq = ( ll - (dl * ((lr - ll) / (dr - dl))) );  else  ulq = ( n * Math.random() );

         }; // end else

       }; // end for( k )

      u  += usn;

      n  -= usn;

      if( n )  ru  = ( usn / (usn + n) );  else  ru = 0;

      r[ c_n   ][ rj  ] = n;

      r[ c_ecn ][ rj  ] = ecn;
      r[ c_esn ][ rj  ] = esn;
      r[ c_psn ][ rj  ] = psn;
      r[ c_usn ][ rj  ] = usn;
      r[ c_ru  ][ rj  ] = ru;

      r[ c_fe  ][ c_m ] += r[ c_fe ][ rj ] = fe = ( (n * Math.sin( ap )) + (u * Math.sin( ap ) - q) );
      r[ c_fr  ][ c_m ] += r[ c_fr ][ rj ] = fr = ( ((n * Math.tan( ph )) + c) * Math.cos( ap ) );

     }; // end for( j )

    r[ c_n   ][ c_m ] = m = ( r[ c_fe ][ c_m ] / r[ c_fr ][ c_m ] );

    r[ c_ecn ][ c_m ] = dl;
    r[ c_esn ][ c_m ] = dr;
    r[ c_psn ][ c_m ] = ll;
    r[ c_usn ][ c_m ] = lr;
    r[ c_ru  ][ c_m ] = d;

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
    hc = x[ c_hc ][ j  ];
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
  const c_hc  = 14;
  const c_nc  = 15;

  const c_n   =  0;
  const c_me  =  1;
  const c_mr  =  2;

  const c_ecn =  3;
  const c_esn =  4;
  const c_psn =  5;
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

  var cm  = 0;
  var phm = 0;

  var ei  = 0;
  var ed  = 0;
  var a   = 0;
  var b   = 0;

  var e   = 0;
  var s   = 0;
  var ec  = 0;
  var hc  = 0;
  var nc  = 0;

  var esn = 0;
  var ecn = 0;
  var psn = 0;
  var pcn = 0;

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

    r[ c_me  ][ c_m ] = r[ c_mr  ][ c_m ] = 0;

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
      hc = x[ c_hc ][ j ];
      nc = x[ c_nc ][ j ];

      for( d = 1 , ulq = k = 0; ((k < nm) && (Math.abs( d ) >= em)); ++k )
       {

        if( (! m) && (! l) && (! i) )
         {

          n  = ( (p * Math.cos( ap )) + (q * Math.sin( ap )) - (u + ulq) );

         } // end if() +

        else
         {

          n  = ( p + (l * fx * q) - ((u + ulq) * (Math.cos( ap ) + (l * fx * Math.sin( ap )))) - (m * c * (Math.sin( ap ) - (l * fx * Math.cos( ap )))) );

          n /= ( (Math.cos( ap ) + (m * Math.tan( ph ) * Math.sin( ap ))) + (l * fx * (Math.sin( ap ) - (m * Math.tan( ph ) * Math.cos( ap )))) ); 

         }; // end else

        cm  = ( m * c );
        phm = Math.atan( m * Math.tan( ph ) );

        nn  = ( (n - (cm * Math.cos( phm ))) / (1 + Math.sin( phm )) );
        nx  = ( (n + (cm * Math.cos( phm ))) / (1 - Math.sin( phm )) );

        pcn = psn = ( (nx + (2 * nn)) / 3 );

        // Bauer / Gudehus compression law:

        ecn = esn = ( ec * Math.exp( - Math.pow( ((3 * pcn) / hc) , nc ) ) );

        if( e > ecn )
         {

          esn = ( s * e );

          if( esn < ecn )  esn = ecn;

          if( esn < ec  )  psn = ( (hc / 3) * Math.pow( - Math.log( esn / ec ) , (1 / nc) ) );  else  psn = 0;
    
         }

        usn = ( pcn - psn );

        d = ( usn - ulq );

        if( ! k )  dl = d , ll = ulq , dr = d , lr = ulq , ulq = ( n * Math.random() );

        else  
         {

          if( (d * dl) > 0 )  dl = d , ll = ulq;  else  dr = d , lr = ulq;

          if( dl != dr )  ulq = ( ll - (dl * ((lr - ll) / (dr - dl))) );  else  ulq = ( n * Math.random() );

         }; // end else

       }; // end for( k )

      u  += usn;

      n  -= usn;

      if( n )  ru  = ( usn / (usn + n) );  else  ru = 0;

      r[ c_n   ][ rj  ] = n;

      r[ c_ecn ][ rj  ] = ecn;
      r[ c_esn ][ rj  ] = esn;
      r[ c_psn ][ rj  ] = psn;
      r[ c_usn ][ rj  ] = usn;
      r[ c_ru  ][ rj  ] = ru;

      r[ c_me  ][ c_m ] += r[ c_me ][ rj ] = me = ( (p * Math.sin( ap )) - (q * Math.cos( ap )) );
      r[ c_mr  ][ c_m ] += r[ c_mr ][ rj ] = mr = ( (n * Math.tan( ph )) + c );

     }; // end for( j )

    r[ c_n   ][ c_m ] = m = ( r[ c_me ][ c_m ] / r[ c_mr ][ c_m ] );

    r[ c_ecn ][ c_m ] = dl;
    r[ c_esn ][ c_m ] = dr;
    r[ c_psn ][ c_m ] = ll;
    r[ c_usn ][ c_m ] = lr;
    r[ c_ru  ][ c_m ] = d;

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
    hc = x[ c_hc ][ j  ];
    nc = x[ c_nc ][ j  ];

    n  = r[ c_n  ][ rj ];

    nn = ( (n - (c * Math.cos( ph ))) / (1 + Math.sin( ph )) );
    nx = ( (n + (c * Math.cos( ph ))) / (1 - Math.sin( ph )) );

   }; // end for( j )

  return r;

 }; // end function BiLL




function BoLL( x , l , nl , el )
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
  const c_hc  = 14;
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
  const c_psn = 11;
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
  
  var cm  = 0;
  var phm = 0;

  var e   = 0;
  var s   = 0;
  var ec  = 0;
  var nc  = 0;
  var hc  = 0;

  var ecn = 0;
  var esn = 0;

  var pcn = 0;
  var psn = 0;

  var usn = 0;
  var ru  = 0;

  var m   = 0;
  var mp  = 0;

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

    for( m = 1 , mp = j = 0; ((j < nl) && (Math.abs( m - mp ) > el)); ++j )
     {

      mp = m;

      ca = cb = cc = cd = ce = cf = cg = ch = 0;

      for( k = 0 , rk = 1; k < kx; ++k , ++rk )
       {

        p  = x[ c_p  ][ k ];
        q  = x[ c_q  ][ k ];
        c  = x[ c_c  ][ k ];
        u  = x[ c_u  ][ k ];
        ap = x[ c_ap ][ k ]; 
        ph = x[ c_ph ][ k ];
        s  = x[ c_s  ][ k ];
        e  = x[ c_e  ][ k ];
        ei = x[ c_ei ][ k ];
        ec = x[ c_ec ][ k ];
        ed = x[ c_ed ][ k ];
        a  = x[ c_a  ][ k ];
        b  = x[ c_b  ][ k ];
        hc = x[ c_hc ][ k ];
        nc = x[ c_nc ][ k ];

        n   = ( l * ((p * Math.cos( ap )) + (q * Math.sin( ap )) - u) );
      
        cm  = ( m * c );
        phm = Math.atan( m * Math.tan( ph ) );

        nn  = ( (n - (cm * Math.cos( phm ))) / (1 + Math.sin( phm )) );
        nx  = ( (n + (cm * Math.cos( phm ))) / (1 - Math.sin( phm )) );

        pcn = psn = ( (nx + (2 * nn)) / 3 );

        // Bauer / Gudehus compression law:

        ecn = esn = ( ec * Math.exp( - Math.pow( ((3 * pcn) / hc) , nc ) ) );

        if( e > ecn )
         {
  
          esn = ( s * e );

          if( esn < ecn )  esn = ecn;

          if( esn < ec  )  psn = ( (hc / 3) * Math.pow( - Math.log( esn / ec ) , (1 / nc) ) );  else  psn = 0;
    
         }

        usn = ( pcn - psn );

        u  += usn;

        n  -= usn;

        if( n )  ru  = ( usn / (usn + n) );  else  ru = 0;

        r[ c_n   ][ rk ] = n;

        r[ c_ecn ][ rk ] = ecn;
        r[ c_esn ][ rk ] = esn;
        r[ c_psn ][ rk ] = psn;
        r[ c_usn ][ rk ] = usn;
        r[ c_ru  ][ rk ] = ru;

        ca += r[ c_ca ][ rk ] = ( n * Math.tan( ph ) * Math.sin( ap ) );
        cb += r[ c_cb ][ rk ] = ( n * Math.cos( ap ) ); 
        cc += r[ c_cc ][ rk ] = ( c * Math.sin( ap ) );
        cd += r[ c_cd ][ rk ] = ( (u * Math.cos( ap )) - p );
        ce += r[ c_ce ][ rk ] = ( n * Math.tan( ph ) * Math.cos( ap ) );
        cf += r[ c_cf ][ rk ] = (- (n * Math.sin( ap )) );
        cg += r[ c_cg ][ rk ] = ( c * Math.cos( ap ) );
        ch += r[ c_ch ][ rk ] = (- ((u * Math.sin( ap )) - q) );

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

     }; // end for( j )

    r[ c_l  ][ nr ] = l;

    r[ c_m  ][ nr ] = m;

    // Cross check the two lambda solutions:

    if( Math.abs( l1 - l2 ) < el )
     {

      d = ( l1 - l );

      if( ! i )  dl = d , ll = l , dr = d , lr = l , l += l;

      else  
       {

        if( (d * dl) > 0 )  dl = d , ll = l;  else  dr = d , lr = l;

        if( dl != dr )  l = ( ll - (dl * ((lr - ll) / (dr - dl))) );  else  l = Math.random();

       }; // end else

     } // end if()

    else  l = Math.random();

    r[ c_ecn ][ nr ] = dl;
    r[ c_esn ][ nr ] = dr;
    r[ c_psn ][ nr ] = ll;
    r[ c_usn ][ nr ] = lr;
    r[ c_ru  ][ nr ] = d;

   }; // end for( i )

  for( k = 0 , rk = 1; k < kx; ++k , ++rk )
   {

    ph = x[ c_ph ][ k  ];
    s  = x[ c_s  ][ k  ];
    e  = x[ c_e  ][ k  ];
    ei = x[ c_ei ][ k  ];
    ec = x[ c_ec ][ k  ];
    ed = x[ c_ed ][ k  ];
    a  = x[ c_a  ][ k  ];
    b  = x[ c_b  ][ k  ];
    hc = x[ c_hc ][ k  ];
    nc = x[ c_nc ][ k  ];

    n  = r[ c_n  ][ rk ];

    nn = ( (n - (c * Math.cos( ph ))) / (1 + Math.sin( ph )) );
    nx = ( (n + (c * Math.cos( ph ))) / (1 - Math.sin( ph )) );

   }; // end for( k )

  return r;

 }; // end function ' BoFReGuT() - BoLL() - Borowicka with Liquefaction Logic : Statically determined, vertical and horizontal force equilibrium



function BoFReGuT( x , l , ni , ei )
 {
   
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

  const c_l   =  3;

  const c_l1  =  4;
  const c_l2  =  5;

  const c_ra  =  6;
  const c_rb  =  7;
  const c_rc  =  8;

  if( ! l  ) var l  =   0.50;
  if( ! ni ) var ni = 100.00;
  if( ! ei ) var ei =   1.00e-4;
  
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

  var d   = 0;
  var dl  = 0;
  var dr  = 0;
  var ll  = 0;
  var lr  = 0;

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

  for( d = 1 , j = 0; j < ni; ++j )
   {

    if( Math.abs( d ) > ei )
     {

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


//      Compression factor model:

//      ecn = ( ec - ( nc * Math.LOG10E * Math.log( n / sc ) ) );

//      if( e > ecn )
//       {
  
//        esn = ( e - ((1 - s) * (e - ecn)) );

//        scn = ( sc * Math.pow( 10.00 , (ec - esn) / nc ) );

//        usn = ( n - scn );

//       }

//      else  esn = e , usn = 0 , scn = n;


//      Bauer / Gudehus model:

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

        r[ c_n   ][ rk ] = n;

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

      r[ c_l  ][ nr ] = l;

      r[ c_m  ][ nr ] = m;

      l1 = (- ((m * cc) + cd) / ((m * ca) + cb) );

      r[ c_l1 ][ nr ] = l1;

      l2 = (- ((m * cg) + ch) / ((m * ce) + cf) );

      r[ c_l2 ][ nr ] = l2;

      if( Math.abs( l1 - l2 ) < ei )
       {

        d = ( l1 - l );

        if( ! j )  dl = d , ll = l , dr = d , lr = l , l += l;

        else  
         {

          if( (d * dl) > 0 )  dl = d , ll = l1;  else  dr = d , lr = l1;

          if( dl != dr )  l = ( ll - (dl * ((lr - ll) / (dr - dl))) );  else  l = Math.random();

         }; // end else

       } // end if()

      else l = Math.random();

      r[ c_ecn ][ nr ] = dl;
      r[ c_esn ][ nr ] = dr;
      r[ c_scn ][ nr ] = ll;
      r[ c_usn ][ nr ] = lr;
      r[ c_ru  ][ nr ] = d;

     }; // end if()

   }; // end for( j )

  return r;

 }; // end function ' borowicka() : Statically determined, vertical and horizontal force equilibrium
