
function FroehlichOriginal( x , rfc )
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

 }; // end function FroehlichOriginal(): Slope stability analysis with the Froehlich method
 
