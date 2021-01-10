'use strict' ;


function taylor( x , rfc , nm , em )
 {

  const c_p    =  0;
  const c_q    =  1;
  const c_c    =  2;
  const c_u    =  3;
  const c_a    =  4;
  const c_f    =  5;
  const c_fx   =  6;

  const r_m    =  0;
  const r_rr   =  1;
  const r_rv   =  2;
  const r_rh   =  3;
  const r_mrv  =  4;
  const r_mrh  =  5;
  const r_mrr  =  6;
  const r_rrr  =  7;

  const r_cr   =  8;
  const r_cv   =  9;
  const r_ch   = 10;
  const r_mcv  = 11;
  const r_mch  = 12;
  const r_mcr  = 13;
  const r_rcr  = 14;

  const r_qr   = 15;
  const r_qv   = 16;
  const r_qh   = 17;
  const r_mqr  = 18;
  const r_rqr  = 19;

  const r_rf   = 20;
  
  const r_fmm  = 21;
  const r_fm   = 22;

  const r_rx   = 23;

  var   ns     = x[0].length;

  var   j      = 0;

  if( ! rfc )  var rfc = 0.0;
  if( ! nm  )  var nm  = 100.00;

  var   k      = 0;
  
  if( ! em )   var em =   1.00e-4;

  var   r      = new Array( r_rx );

  for( var i = 0; i < r_rx; ++i )  r[i] = new Array( 1 );

  var   p      = 0;
  var   q      = 0;
  var   c      = 0;
  var   u      = 0;
  var   a      = 0;
  var   f      = 0;
  var   fx     = 0;

  var   fs     = 0;
  var   fm     = 0;
  var   fmm    = 0;

  var   ar     = 0;
  var   ac     = 0;

  var   d      = 0;
  var   dl     = 0;
  var   dr     = 0;

  var   rf     = 0;

  var   rrr    = 0;
  var   rcr    = 0;
  var   rqr    = 0;
  
  var   mc     = 0;
  var   mf     = 0;
  
  var   m      = 0;
  var   mr     = 0;
  var   ml     = 0;

  var   rvs    = 0;
  var   rhs    = 0;

  var   mrr    = 0;
  var   mrv    = 0;
  var   mrh    = 0;

  var   rr     = 0;
  var   rv     = 0;
  var   rh     = 0;

  var   cvs    = 0;
  var   chs    = 0;

  var   mcr    = 0;
  var   mcv    = 0;
  var   mch    = 0;

  var   cr     = 0;
  var   cv     = 0;
  var   ch     = 0;

  var   mqr    = 0;

  var   qr     = 0;
  var   qv     = 0;
  var   qh     = 0;
 
  for( j = 0; j < ns; ++j )
   {

    p    = x[ c_p  ][ j ];
    q    = x[ c_q  ][ j ];
    c    = x[ c_c  ][ j ];
    u    = x[ c_u  ][ j ];
    a    = x[ c_a  ][ j ];
    f    = x[ c_f  ][ j ];
    fx   = x[ c_fx ][ j ];

    fs  += ( 1 / Math.cos( a ) );

    fm  += ( f / Math.cos( a ) );

    rv  += rvs = ( (- p)  + (u  * Math.cos( a )) );

    rh  += rhs = (    q   - (u  * Math.sin( a )) );

    mrv += ( rvs * Math.sin( a ) );

    mrh += ( rhs * Math.cos( a ) );

    cv  += cvs = ( c * Math.sin( a ) );

    ch  += chs = ( c * Math.cos( a ) );

    mcv += ( cvs * Math.sin( a ) );

    mch += ( chs * Math.cos( a ) );

   }; // end for[)

  fm  /= fs;

  mrr  = ( mrh + mrv );

  rr   = Math.sqrt( (rh * rh) + (rv * rv) );

  if( rr )  rrr = Math.abs( mrr / rr );  else  rrr = 0;

  mcr  = ( mch + mcv );
  
  cr   = Math.sqrt( (ch * ch) + (cv * cv) );

  if( cr )  rcr = Math.abs( mcr / cr );  else  rcr = 0;

  rf  = ( 1 + (rfc * (rcr - 1)) );

  d = 1 , dl = dr = m = ml = mr = mc = 0;

  for( k = 0; ((Math.abs( d ) > em) && (k < nm)); ++k )
   {

    mc  = m;

    mqr = (- (mrr + (mc * mcr)) );

    qv  = (- (rv  + (mc * cv))  );

    qh  = (- (rh  + (mc * ch))  );

    qr  = Math.sqrt( (qh * qh) + (qv * qv) );

    if( qr )  rqr = Math.abs( mqr / qr );  else  rqr = 0;

    if( rqr < rf )  fmm = Math.asin( rqr / rf );  else  fmm = ( Math.Pi() / 2 );

    mf = ( Math.tan( fmm ) / Math.tan( fm ) );

    d  = ( mc - mf );

    // ( D - DL ) = ( (M - ML) * ((DR - DL) / (MR - ML)) )

    if( ! k )  dl = d , ml = m , dr = d , mr = m , m = 1;

    else   
     {

      if( (d * dl) > 0 )  dl = d , ml = m;  else  dr = d , mr = m;

        if( dl != dr )  m = ( ml - (dl * ((mr - ml) / (dr - dl))) );  else  m = Math.rand();
     
     }; // end else
    
   }; // end for()

  r[ r_m   ][ r_m ] = m = mc;
  r[ r_rr  ][ r_m ] = rr
  r[ r_rv  ][ r_m ] = rv
  r[ r_rh  ][ r_m ] = rh
  r[ r_mrv ][ r_m ] = mrv
  r[ r_mrh ][ r_m ] = mrh
  r[ r_mrr ][ r_m ] = mrr
  r[ r_rrr ][ r_m ] = rrr

  r[ r_cr  ][ r_m ] = cr
  r[ r_cv  ][ r_m ] = cv
  r[ r_ch  ][ r_m ] = ch
  r[ r_mcv ][ r_m ] = mcv
  r[ r_mch ][ r_m ] = mch
  r[ r_mcr ][ r_m ] = mcr
  r[ r_rcr ][ r_m ] = rcr

  r[ r_qr  ][ r_m ] = qr
  r[ r_qv  ][ r_m ] = qv
  r[ r_qh  ][ r_m ] = qh
  r[ r_mqr ][ r_m ] = mqr
  r[ r_rqr ][ r_m ] = rqr

  r[ r_rf  ][ r_m ] = rf

  r[ r_fmm ][ r_m ] = fmm
  r[ r_fm  ][ r_m ] = fm

  return( r );

 }; // end taylor[) : Slope stability calculation with the method of Taylor
 



function froehlich( x , rfc )
 {
  
  const c_p    =  0;
  const c_q    =  1;
  const c_c    =  2;
  const c_u    =  3;
  const c_a    =  4;
  const c_f    =  5;
  const c_fx   =  6;

  const r_m    =  0;
  const r_rr   =  1;
  const r_rv   =  2;
  const r_rh   =  3;
  const r_mrv  =  4;
  const r_mrh  =  5;
  const r_mrr  =  6;
  const r_rrr  =  7;

  const r_cr   =  8;
  const r_cv   =  9;
  const r_ch   = 10;
  const r_mcv  = 11;
  const r_mch  = 12;
  const r_mcr  = 13;
  const r_rcr  = 14;

  const r_dtrr = 15;
  const r_dtcr = 16;
  const r_dt   = 17;
  
  const r_fm   = 18;
  const r_xi   = 19;
  
  const r_rf   = 20;

  const r_qr   = 21;
  const r_fr   = 22;

  const r_me   = 23;
  const r_mr   = 24;
  const r_rx   = 25;

  var   ns     = x[0].length;

  var   j      = 0;

  if( ! rfc )  var rfc = 0.0;

  var   r      = new Array( r_rx );

  for( var i = 0; i < r_rx; ++i )  r[i] = new Array( 1 );

  var   p      = 0;
  var   q      = 0;
  var   c      = 0;
  var   u      = 0;
  var   a      = 0;
  var   f      = 0;
  var   fx     = 0;

  var   dtrr   = 0;
  var   dtcr   = 0;
  var   dt     = 0;
  var   fs     = 0;
  var   fm     = 0;
  var   xi     = 0;

  var   qr     = 0;
  var   fr     = 0;
 
  var   mrr    = 0;
  var   mrv    = 0;
  var   mrh    = 0;

  var   rr     = 0;
  var   rv     = 0;
  var   rh     = 0;

  var   rvs    = 0;
  var   rhs    = 0;

  var   mcr    = 0;
  var   mcv    = 0;
  var   mch    = 0;

  var   cr     = 0;
  var   cv     = 0;
  var   ch     = 0;
  
  var   cvs    = 0;
  var   chs    = 0;

  var   rrr    = 0;
  var   rcr    = 0;

  var   rf     = 0;
    
  var   m      = 0;
  var   me     = 0;
  var   mr     = 0;

  for( j = 0; j < ns; ++j )
   {

    p    = x[ c_p  ][ j ];
    q    = x[ c_q  ][ j ];
    c    = x[ c_c  ][ j ];
    u    = x[ c_u  ][ j ];
    a    = x[ c_a  ][ j ];
    f    = x[ c_f  ][ j ];
    fx   = x[ c_fx ][ j ];

    fs  += ( 1 / Math.cos( a ) );

    fm  += ( f / Math.cos( a ) );

    rv  += rvs = ( (- p)  + (u  * Math.cos( a )) );

    rh  += rhs = (    q   - (u  * Math.sin( a )) );

    mrv += ( rvs * Math.sin( a ) );

    mrh += ( rhs * Math.cos( a ) );

    cv  += cvs = ( c * Math.sin( a ) );

    ch  += chs = ( c * Math.cos( a ) );

    mcv += ( cvs * Math.sin( a ) );

    mch += ( chs * Math.cos( a ) );

   }; // end for[)

  fm  /= fs;

  mrr  = ( mrh + mrv );

  rr   = Math.sqrt( (rh * rh) + (rv * rv) );

  if( rr )  rrr  = Math.abs( mrr / rr );  else  rrr  = 0;

  if( rv )  dtrr = Math.atan( rh / rv );  else  dtrr = ( Math.Pi() / 2 );

  mcr  = ( mch + mcv );
  
  cr   = Math.sqrt( (ch * ch) + (cv * cv) );
 
  if( cr )  rcr  = Math.abs( mcr / cr );  else  rcr = 0;

  rf  = ( 1 + (rfc * (rcr - 1)) );

  if( ch )  dtcr = Math.atan( cv / ch );  else  dtcr = ( Math.Pi() / 2 );

  dt   = ( dtrr + dtcr );

  xi   = ( cr / rr );
  
  qr   = ( rr * Math.sqrt( 1 + (xi * xi) - (2 * xi * Math.sin( dt )) ) ); 

  fr   = ( qr * Math.sin( fm ) );

  me   = ( rr * rrr );

  mr   = ( (fr * rf) + (cr * rcr) );

  m    = ( me / mr );

  r[ r_m    ][ r_m ] = m;
  r[ r_rr   ][ r_m ] = rr
  r[ r_rv   ][ r_m ] = rv
  r[ r_rh   ][ r_m ] = rh
  r[ r_mrv  ][ r_m ] = mrv
  r[ r_mrh  ][ r_m ] = mrh
  r[ r_mrr  ][ r_m ] = mrr
  r[ r_rrr  ][ r_m ] = rrr

  r[ r_cr   ][ r_m ] = cr
  r[ r_cv   ][ r_m ] = cv
  r[ r_ch   ][ r_m ] = ch
  r[ r_mcv  ][ r_m ] = mcv
  r[ r_mch  ][ r_m ] = mch
  r[ r_mcr  ][ r_m ] = mcr
  r[ r_rcr  ][ r_m ] = rcr

  r[ r_dtrr ][ r_m ] = dtrr
  r[ r_dtcr ][ r_m ] = dtcr
  r[ r_dt   ][ r_m ] = dt
  r[ r_fm   ][ r_m ] = fm
  r[ r_xi   ][ r_m ] = xi

  r[ r_rf   ][ r_m ] = rf

  r[ r_qr   ][ r_m ] = qr
  r[ r_fr   ][ r_m ] = fr

  r[ r_me   ][ r_m ] = me
  r[ r_mr   ][ r_m ] = mr

  return( r );

 }; // end function froehlich(): Slope stability analysis with the Froehlich method
 
 

function Frohlich( x , rfc )
 {
  
  const c_p    =  0;
  const c_q    =  1;
  const c_c    =  2;
  const c_u    =  3;
  const c_a    =  4;
  const c_f    =  5;
  const c_fx   =  6;

  const r_m    =  0;
  const r_rr   =  1;
  const r_rv   =  2;
  const r_rh   =  3;
  const r_mrv  =  4;
  const r_mrh  =  5;
  const r_mrr  =  6;
  const r_rrr  =  7;

  const r_cr   =  8;
  const r_cv   =  9;
  const r_ch   = 10;
  const r_mcv  = 11;
  const r_mch  = 12;
  const r_mcr  = 13;
  const r_rcr  = 14;

  const r_qr   = 15;
  const r_qv   = 16;
  const r_qh   = 17;
  
  const r_mqr  = 18;
  const r_rqr  = 19;
  
  const r_rf   = 20;

  const r_rqrx = 21;
  const r_rrrx = 22;

  const r_ps   = 23;
  const r_fm   = 24;

  const r_rx   = 25;

  var   ns     = x[0].length;

  var   j      = 0;

  if( ! rfc )  var rfc = 0.0;

  var   r      = new Array( r_rx );

  for( var i = 0; i < r_rx; ++i )  r[i] = new Array( 1 );

  var   p      = 0;
  var   q      = 0;
  var   c      = 0;
  var   u      = 0;
  var   a      = 0;
  var   f      = 0;
  var   fx     = 0;

  var   dtrr   = 0;
  var   dtcr   = 0;
  var   dt     = 0;
  var   fs     = 0;
  var   fm     = 0;
  var   xi     = 0;

  var   qr     = 0;
  var   fr     = 0;
 
  var   mrr    = 0;
  var   mrv    = 0;
  var   mrh    = 0;

  var   rr     = 0;
  var   rv     = 0;
  var   rh     = 0;

  var   rvs    = 0;
  var   rhs    = 0;

  var   mcr    = 0;
  var   mcv    = 0;
  var   mch    = 0;

  var   cr     = 0;
  var   cv     = 0;
  var   ch     = 0;
  
  var   cvs    = 0;
  var   chs    = 0;

  var   rrr    = 0;
  var   rcr    = 0;

  var   rf     = 0;
    
  var   m      = 0;
  var   me     = 0;
  var   mr     = 0;

  for( j = 0; j < ns; ++j )
   {

    p    = x[ c_p  ][ j ];
    q    = x[ c_q  ][ j ];
    c    = x[ c_c  ][ j ];
    u    = x[ c_u  ][ j ];
    a    = x[ c_a  ][ j ];
    f    = x[ c_f  ][ j ];
    fx   = x[ c_fx ][ j ];

    fs  += ( 1 / Math.cos( a ) );

    fm  += ( f / Math.cos( a ) );

    rv  += rvs = ( (- p)  + (u  * Math.cos( a )) );

    rh  += rhs = (    q   - (u  * Math.sin( a )) );

    mrv += ( rvs * Math.sin( a ) );

    mrh += ( rhs * Math.cos( a ) );

    cv  += cvs = ( c * Math.sin( a ) );

    ch  += chs = ( c * Math.cos( a ) );

    mcv += ( cvs * Math.sin( a ) );

    mch += ( chs * Math.cos( a ) );

   }; // end for[)

  fm  /= fs;

  mrr  = ( mrh + mrv );

  rr   = Math.sqrt( (rh * rh) + (rv * rv) );

  if( rr )  rrr  = Math.abs( mrr / rr );  else  rrr  = 0;

  mcr  = ( mch + mcv );
  
  cr   = Math.sqrt( (ch * ch) + (cv * cv) );
 
  if( cr )  rcr  = Math.abs( mcr / cr );  else  rcr = 0;

  qv   = (- (rv + cv) )

  qh   = (- (rh + ch) )

  qr   = Math.sqrt( (qh * qh) + (qv * qv) )

  mqr  = (- (mrr + mcr) )

  rf   = ( 1 + (rfc * (rcr - 1)) );

  if( qr )  rqr = Math.abs( mqr / qr ) , ps = Math.asin( rqr / rf );  else  rqr = ps = 0;

  rqrx = ( rf * Math.sin( fm ) );

  if( rr )  rrrx = ( ((qr * rqrx) + (cr * rcr)) / rr );  else  rrrx = 0;

  if( rrrx )  m = ( rrr / rrrx );  else  m = 0;

  r[ r_m    ][ r_m ] = m;
  r[ r_rr   ][ r_m ] = rr
  r[ r_rv   ][ r_m ] = rv
  r[ r_rh   ][ r_m ] = rh
  r[ r_mrv  ][ r_m ] = mrv
  r[ r_mrh  ][ r_m ] = mrh
  r[ r_mrr  ][ r_m ] = mrr
  r[ r_rrr  ][ r_m ] = rrr

  r[ r_cr   ][ r_m ] = cr
  r[ r_cv   ][ r_m ] = cv
  r[ r_ch   ][ r_m ] = ch
  r[ r_mcv  ][ r_m ] = mcv
  r[ r_mch  ][ r_m ] = mch
  r[ r_mcr  ][ r_m ] = mcr
  r[ r_rcr  ][ r_m ] = rcr

  r[ r_qr   ][ r_m ] = qr
  r[ r_qv   ][ r_m ] = qv
  r[ r_qh   ][ r_m ] = qh
  r[ r_mqr  ][ r_m ] = mqr
  r[ r_rqr  ][ r_m ] = rqr

  r[ r_rf   ][ r_m ] = rf

  r[ r_rqrx ][ r_m ] = rqrx
  r[ r_rrrx ][ r_m ] = rrrx

  r[ r_ps   ][ r_m ] = ps
  r[ r_fm   ][ r_m ] = fm

  return( r );

 }; // end function Frohlich(): Slope stability analysis with the simplified Froehlich method
 
 

function Fellenius( x , m , l , nm , em )
 {

  return Bishop( x , 0 , 0 , 1 , 1 );

 }; // end function Fellenius()
 
 


function Bishop( x , m , l , nm , em )
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
  const r_me  =  1;
  const r_mr  =  2;
  const r_rx  =  3;

  const r_m   =  0;
  
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

  var n   = 0;
  var me  = 0;
  var mr  = 0;

  var mp  = 0;

  var nn  = 0;
  var nx  = 0;


  var rc  = ns;

  var r   = new Array( r_rx );

  for( i = 0; i < r_rx; ++i )  for( j = 0 , r[i] = new Array( rc ); j < rc; r[i][j] = 0 , ++j );

  for( mp = 1 , i = 0; ((i < nm) && (Math.abs( m - mp ) >= em)); ++i )
   {

    mp = m;

    r[ r_me  ][ r_m ] = r[ r_mr  ][ r_m ] = 0;

    for( j = 0 , rj = 1; j < jx; ++j , ++rj )
     {

      p  = x[ c_p  ][ j ];
      q  = x[ c_q  ][ j ];
      c  = x[ c_c  ][ j ];
      u  = x[ c_u  ][ j ];
      ap = x[ c_ap ][ j ]; 
      ph = x[ c_ph ][ j ];
      fx = x[ c_fx ][ j ];

      if( (! m) && (! l) && (! i) )
       {

        n  = ( (p * Math.cos( ap )) + (q * Math.sin( ap )) - u );

       } // end if() +

      else
       {

        n  = ( p + (l * fx * q) - (u * (Math.cos( ap ) + (l * fx * Math.sin( ap )))) - (m * c * (Math.sin( ap ) - (l * fx * Math.cos( ap )))) );

        n /= ( (Math.cos( ap ) + (m * Math.tan( ph ) * Math.sin( ap ))) + (l * fx * (Math.sin( ap ) - (m * Math.tan( ph ) * Math.cos( ap )))) ); 

       }; // end else

      r[ r_n  ][ rj  ] = n;

      r[ r_me ][ r_m ] += r[ r_me ][ rj ] = me = ( (p * Math.sin( ap )) - (q * Math.cos( ap )) );
      r[ r_mr ][ r_m ] += r[ r_mr ][ rj ] = mr = ( (n * Math.tan( ph )) + c );

     }; // end for( j )

    r[ r_n ][ r_m ] = m = ( r[ r_me ][ r_m ] / r[ r_mr ][ r_m ] );

   }; // end for( i )

  return r;

 }; // end function Bishop()


function Terzaghi( x , m , l , nm , em )
 {

  return Janbu( x , 0 , 0 , 1 , 1 );

 }; // end function Terzaghi




function Janbu( x , m , l , nm , em )
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
  const r_rx  =  3;

  const r_m   =  0;

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

  var n   = 0;
  var fe  = 0;
  var fr  = 0;

  var mp  = 0;

  var nn  = 0;
  var nx  = 0;

  var rc  = ns;

  var r   = new Array( r_rx );

  for( i = 0; i < r_rx; ++i )  for( j = 0 , r[i] = new Array( rc ); j < rc; r[i][j] = 0 , ++j );

  for( mp = 1 , i = 0; ((i < nm) && (Math.abs( m - mp ) >= em)); ++i )
   {

    mp = m;

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

      if( (! m) && (! l) && (! i) )
       {

        n  = ( (p * Math.cos( ap )) + (q * Math.sin( ap )) - u );

       } // end if() +

      else
       {

        n  = ( p + (l * fx * q) - (u * (Math.cos( ap ) + (l * fx * Math.sin( ap )))) - (m * c * (Math.sin( ap ) - (l * fx * Math.cos( ap )))) );

        n /= ( (Math.cos( ap ) + (m * Math.tan( ph ) * Math.sin( ap ))) + (l * fx * (Math.sin( ap ) - (m * Math.tan( ph ) * Math.cos( ap )))) ); 

       }; // end else

      r[ r_n  ][ rj  ] = n;

      r[ r_fe ][ r_m ] += r[ r_fe ][ rj ] = fe = ( (n * Math.sin( ap )) + (u * Math.sin( ap ) - q) );
      r[ r_fr ][ r_m ] += r[ r_fr ][ rj ] = fr = ( ((n * Math.tan( ph )) + c) * Math.cos( ap ) );

     }; // end for( j )

    r[ r_n ][ r_m ] = m = ( r[ r_fe ][ r_m ] / r[ r_fr ][ r_m ] );

   }; // end for( i )

  return r;

 }; // end function Janbu()




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

    n   = ( (p * Math.cos( ap )) + (q * Math.sin( ap )) - u );
  
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




function WedgeSlope( x , th )
 {
  
  const c_r   = 0;
  const c_h   = 0;
  const c_bt  = 1;

  const c_rh  = 2;
  const c_ph  = 3;
  const c_c   = 4;

  const c_p   = 5;
  const c_ap  = 6;
  const c_fv  = 7;
  const c_fh  = 8;
  
  const r_r   = 0;
  const r_fe  = 0;
  const r_fr  = 1;
  const r_m   = 2;
  const r_rx  = 3;

  const c_g   = 10;

  var   r     = new Array( r_rx );

  for( var i = 0; i < r_rx; ++i )  r[i] = new Array( 1 );

  var   thrad = Radians( th );
    
  var   h     = x[ c_h  ][ c_r ];
  var   btrad = Radians( x[ c_bt ][ c_r ] );

  var   rh    = x[ c_rh ][ c_r ];
  var   phrad = Radians( x[ c_ph ][ c_r ] );
  var   c     = x[ c_c  ][ c_r ];

  var   p     = x[ c_p  ][ c_r ];
  var   aprad = Radians( x[ c_ap ][ c_r ] );

  var   fv    = x[ c_fv ][ c_r ];
  var   fh    = x[ c_fh ][ c_r ];

  var   l     = 0;

  var   fp    = 0;
  var   fq    = 0;

  var   fe    = 0;
  var   fr    = 0;

  var   m     = 0;
  
  if( thrad > btrad )  thrad = btrad;

  if( aprad > btrad )  aprad = btrad;

  fp = ( fv + ((1 / 2) * rh * c_g * h * h * ((1 / Math.tan( thrad )) - (1 / Math.tan( btrad )))) );
 
  if( aprad > thrad ) fp += ( p * h * ((1 / Math.tan( thrad )) - (1 / Math.tan( aprad ))) );

  fq = fh;

  l  = ( h / Math.tan( thrad ) );

  fe = (  ((fp * Math.sin( thrad )) - (fq * Math.cos( thrad ))) * Math.sin( thrad ) );

  fr = ( (((fp * Math.cos( thrad )) + (fq * Math.sin( thrad ))) * Math.cos( thrad ) * Math.tan( phrad ) ) + (c * l) );

  if( fr )  m = ( fe / fr );  else  m = ( Math.tan( btrad ) / Math.tan( phrad ) );
  
  r[ r_fe ][ r_r ] = fe;
  r[ r_fr ][ r_r ] = fr;
  r[ r_m  ][ r_r ] = m;

  return( r );
  
 }; // end function WedgeSlope()
 



function Radians( d )
 {
  var r = ( (d / 180.0) * Math.PI );
  return r;
 }



function Degrees( r )
 {
  var d = ( (r / Math.PI) * 180.0 );
  return d;
 }





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



function infiniteSlope( x )
 {

  const c_0_0   =  0;

  const c_bt    =  0;
  const c_p     =  1;
  const c_q     =  2;
  const c_hn    =  3;
  const c_hr    =  4;
  const c_rhn   =  5;
  const c_rhr   =  6;
  const c_phk   =  7;
  const c_ck    =  8;
  const c_iin   =  9;
  const c_iit   = 10;
  const c_gph   = 11;
  const c_gc    = 12;
  const c_gg    = 13;
  const c_gp    = 14;
  const c_gq    = 15;
  const c_gs    = 16;

  const r_phd   =  0;
  const r_cd    =  1;
  const r_nk    =  2;
  const r_tek   =  3;
  const r_trk   =  4;
  const r_eta   =  5;
  const r_nd    =  6;
  const r_ted   =  7;
  const r_trd   =  8;
  const r_mu    =  9;
  const r_rx    = 10; 

  const c_g     = 10;
  const c_rhw   = 1000;
  var   gmw     = ( c_rhw * c_g );

  var   btrad   = Radians( x[c_bt][0] );
  var   p       = x[c_p][0];
  var   q       = x[c_q][0];
  var   hn      = x[c_hn][0];
  var   hr      = x[c_hr][0];
  var   rhn     = x[c_rhn][0];
  var   rhr     = x[c_rhr][0];
  var   phkrad  = Radians( x[c_phk][0] ); if( phkrad < c_0_0 )  phkrad = c_0_0;
  var   ck      = x[c_ck][0];
  var   iin     = x[c_iin][0];
  var   iit     = x[c_iit][0];
  var   gph     = x[c_gph][0];
  var   gc      = x[c_gc][0];
  var   gg      = x[c_gg][0];
  var   gp      = x[c_gp][0];
  var   gq      = x[c_gq][0];
  var   gs      = x[c_gs][0];

  var   gmn     = ( rhn * c_g );
  var   gmr     = ( rhr * c_g );

  var   sbt     = Math.sin( btrad );
  var   cbt     = Math.cos( btrad );

  var   phdrad  = Math.atan( Math.tan( phkrad ) / gph );

  var   r       = new Array( r_rx );

  for( var i = 0; i < r_rx; ++i )  r[i] = new Array( 1 );

  r[r_phd][0]   = Degrees( phdrad );
  r[r_cd][0]    = cd  = ( ck / gc );

  r[r_nk][0]    = nk  = ( (p * cbt) + (q * cbt) + (hn * gmn * cbt) + (hr * (gmr - gmw) * cbt) + (iin * gmw * hr) );
  r[r_tek][0]   = tek = ( (p * sbt) + (q * sbt) + (hn * gmn * sbt) + (hr * (gmr - gmw) * sbt) + (iit * gmw * hr) );
  r[r_trk][0]   = trk = ( (nk * Math.tan( phkrad )) + ck );
  r[r_eta][0]   = eta = ( trk / tek );
  
  r[r_nd][0]    = nd  = ( (gp * p * cbt) + (gq * q * cbt) + (gg * hn * gmn * cbt) + (gg * hr * (gmr - gmw) * cbt) + (gs * iin * gmw * hr) );
  r[r_ted][0]   = ted = ( (gp * p * sbt) + (gq * q * sbt) + (gg * hn * gmn * sbt) + (gg * hr * (gmr - gmw) * sbt) + (gs * iit * gmw * hr) );
  r[r_trd][0]   = trd = ( (nd * Math.tan( phdrad )) + cd );
  r[r_mu][0]    = mu  = ( ted / trd );

  return( r );

 }; // end infiniteslope() : Infinite slope stability determined from force equilibrium



function wedgeslope( x , th )
 {
  
  const c_r      =   0 ;

  const c_h      =   0 ;
  const c_bt     =   1 ;

  const c_rh     =   2 ;
  const c_phk    =   3 ;
  const c_ck     =   4 ;

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
  const phkrad  = radians( x[ c_phk ][ c_r ] ) ;
  const ck      = x[ c_ck    ][ c_r ] ;

  const pvgk    =  x[ c_pvgk  ][ c_r ] ;
  const apvgk   =  x[ c_apvgk ][ c_r ] ;
  const bpvgk   =  x[ c_bpvgk ][ c_r ] ;

  const qvqr    =  x[ c_qvqr  ][ c_r ] ;
  const aqvqr   =  x[ c_aqvqr ][ c_r ] ;
  const bqvqr   =  x[ c_bqvqr ][ c_r ] ;

  const phgk    =  x[ c_phgk  ][ c_r ] ;
  const aphgk   =  x[ c_aphgk ][ c_r ] ;
  const bphgk   =  x[ c_bphgk ][ c_r ] ;

  const qhqr    =  x[ c_qhqr  ][ c_r ] ;
  const aqhqr   =  x[ c_aqhqr ][ c_r ] ;
  const bqhqr   =  x[ c_bqhqr ][ c_r ] ;
  
  const fvgk    =  x[ c_fvgk  ][ c_r ] ;
  const afvgk   =  x[ c_afvgk ][ c_r ] ;

  const fvqr    =  x[ c_fvqr  ][ c_r ] ;
  const afvqr   =  x[ c_afvqr ][ c_r ] ;

  const fhgk    =  x[ c_fhgk  ][ c_r ] ;
  const afhgk   =  x[ c_afhgk ][ c_r ] ;

  const fhqr    =  x[ c_fhqr  ][ c_r ] ;
  const afhqr   =  x[ c_afhqr ][ c_r ] ;
 
  const gmph    =  x[ c_gmph  ][ c_r ] ;
  const gmc     =  x[ c_gmc   ][ c_r ] ;
  const gmg     =  x[ c_gmg   ][ c_r ] ;
  const gmq     =  x[ c_gmq   ][ c_r ] ;

  const thrad   = radians( th ) ;

  const ath     = ( (h / Math.tan( thrad )) - (h / Math.tan( btrad )) ) ;

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


