
function InfiniteSlope( x )
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
  var   cd      = undefined;

  var   nk      = undefined;
  var   tek     = undefined;
  var   trk     = undefined;
  var   eta     = undefined;

  var   nd      = undefined;
  var   ted     = undefined;
  var   trd     = undefined;
  var   mu      = undefined;

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

 }; // end InifiniteSlope() : Infinite slope stability determined from force equilibrium
 
