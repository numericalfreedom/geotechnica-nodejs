

function GroundFailure( x )
 {
 
  const c_0_0  =  1.0e-6;

  const c_r    =  0;
  const c_ff   =  0;
  const c_f    =  1;
  const c_c    =  2;
  const c_a    =  3;
  const c_b    =  4;
  const c_g1   =  5;
  const c_d    =  6;
  const c_g2   =  7;
  const c_ea   =  8;
  const c_eb   =  9;
  const c_dt   = 10;
  const c_ap   = 11;
  const c_bt   = 12;
  const c_w    = 13;
  const c_ngk  = 14;
  const c_tgk  = 15;
  const c_nqr  = 16;
  const c_tqr  = 17;
  const c_gg   = 18;
  const c_gq   = 19;
  const c_gr   = 20;

  const r_n   =  0;
  const r_v   =  1;
  const r_i   =  2;
  const r_l   =  3;
  const r_x   =  4;
  const r_f   =  5;
  const r_r   =  6;

  const r_b   =  0;
  const r_d   =  1;
  const r_c   =  2;

  const r_ed  =  0;
  const r_rd  =  1;
  const r_m   =  2;

  const r_rc  =  3;
  const r_rr  =  7;
  
  var   i     =  0;

  var r  = new Array( r_rr );
  
  for( i = 0; i < r_rr; r[i] = new Array( r_rc ) , ++i );

  var ff   = x[ c_ff  ][ c_r ];
  var f    = x[ c_f   ][ c_r ];
  var c    = x[ c_c   ][ c_r ];
  var a    = x[ c_a   ][ c_r ];
  var b    = x[ c_b   ][ c_r ];
  var g1   = x[ c_g1  ][ c_r ];
  var d    = x[ c_d   ][ c_r ];
  var g2   = x[ c_g2  ][ c_r ];
  var ea   = x[ c_ea  ][ c_r ];
  var eb   = x[ c_eb  ][ c_r ];
  var dt   = x[ c_dt  ][ c_r ];
  var ap   = x[ c_ap  ][ c_r ];
  var bt   = x[ c_bt  ][ c_r ];
  var w    = x[ c_w   ][ c_r ];
  var ngk  = x[ c_ngk ][ c_r ];
  var tgk  = x[ c_tgk ][ c_r ];
  var nqr  = x[ c_nqr ][ c_r ];
  var tqr  = x[ c_tqr ][ c_r ];
  var gg   = x[ c_gg  ][ c_r ];
  var gq   = x[ c_gq  ][ c_r ];
  var gr   = x[ c_gr  ][ c_r ];

  var frad  = Radians(  f );
  var dtrad = Radians( dt );
  var aprad = Radians( ap );
  var btrad = Radians( bt );
  var wrad  = Radians(  w );

  var nk    = ( ngk + nqr );
  var tk    = ( tgk + tqr );

  var fvrad = 0;

  var kp    = 0;
  var vd    = 0;
  var xd    = 0;
  var ib    = 0;
  var id    = 0;

  var nd    = 0;
  var nb    = 0;
  var nc    = 0;
  
  var ma    = 0;
  var mb    = 0;
  var m     = 0;

  var af    = 0;

  if( frad > 0.0 )  fvrad = frad;  else  fvrad = c_0_0;

  kp = Math.tan( (Math.PI / 4.0) + (fvrad / 2.0) );
  
  nd = ( Math.exp( Math.PI * Math.tan( fvrad ) ) * kp * kp ); r[r_n][r_d] = nd;  // Parameter Nd0
  
  nc = ( (nd - 1.0) / Math.tan( fvrad ) ); r[r_n][r_c] = nc;  // Parameter Nc0

  nb = ( (nd - 1.0) * Math.tan( fvrad ) ); r[r_n][r_n] = nb;  // Parameter Nb0

  if( ea > 0.0 )  a -= ( 2.0 * ea );

  if( eb > 0.0 )  b -= ( 2.0 * eb );

  // Foundation form parameter V:
  
  switch( ff )
   {
   
    default:
    case 1:
 
     r[r_v][r_b] = r[r_v][r_d] = r[r_v][r_c] = 1.0;
    
     break;
    
    case 2:

     r[r_v][r_b] = ( 1.0 - (0.3 * (b / a)) );

     r[r_v][r_d] = vd = ( 1.0 + ((b / a) * Math.sin( frad )) );
     
     if( frad )  r[r_v][r_c] = ( ((vd * nd) - 1) / (nd - 1) );  else  r[r_v][r_c] = ( 1.0 + (0.2 * (b / a)) );
    
     break;
    
    case 3:

     r[r_v][r_b] = 0.7;
     
     r[r_v][r_d] = vd = ( 1.0 + Math.sin( frad ) );
     
     if( frad )  r[r_v][r_c] = ( ((vd * nd) - 1) / (nd - 1) );  else  r[r_v][r_c] = 1.2;
   
     break;
   
   }; // end switch( ff )


  // Exponent M for load inclination parameter I:

  switch( ff )
   {
   
    default:
    case 1:

     m = 2.0;
    
     break;
    
    case 2:
    case 3:

     ma = ( (2.0 + (a / b)) / (1 + (a / b)) );

     mb = ( (2.0 + (b / a)) / (1 + (b / a)) );

     m  = ( (ma * Math.cos( wrad ) * Math.cos( wrad )) + (mb * Math.sin( wrad ) * Math.sin( wrad )) );

     break;
   
   }; // end switch( ff )


  // Load inclination parameter I:

  if( frad > 0.0 )
   {
     
    if( dtrad > 0.0 )

     ib = Math.pow( (1.0 - Math.tan( dtrad )) , (m + 1.0) );

    else

     ib = Math.pow( (Math.cos( dtrad ) * (1 - (0.04 * dt))) , (0.64 + (0.028 * f)) );

    r[r_i][r_b] = ib ;

    if( dtrad > 0.0 )

     id = Math.pow( (1.0 - Math.tan( dtrad )) , m );

    else

     id = Math.pow( (Math.cos( dtrad ) * (1.0 - (0.0244 * dt))) , (0.03 + (0.04 * f)) );

    r[r_i][r_d] = id;

    r[r_i][r_c] = ( ((id * nd) - 1.0) / (nd - 1.0) );
     
   } // end if +

  else
   {

    r[r_i][r_b] = r[r_i][r_d] = r[r_i][r_c] = 1.0;

    switch( ff )
     {

      default:
      case 1:
       
       af = b ;
   
       break;
      
      case 2:
      
       af = ( a * b ) ;
      
      case 3:
      
       af = ( b * b * Math.PI ) ;

     }; // end switch()  

    switch( ff )
     {

      default:
      case 1:
       
       r[r_i][r_c] = 1.0;
   
       break;
      
      case 2:         
      case 3:

       if( tk < (af * c) )

        r[r_i][r_c] = ( 0.5 + (0.5 * Math.sqrt( 1.0 - (tk / (af * c)) )) );

     }; // end switch()  

   }; // end else


   // Surface inclination parameter L:
   
   if( frad > 0.0 )
    {
    
     r[r_l][r_b] = Math.pow( (1.0 - (0.5 * Math.tan( btrad ))) , 6.0 );
     
     r[r_l][r_d] = Math.pow( (1.0 - Math.tan( btrad )) , 1.9 );
     
     r[r_l][r_c] = ( ((nd * Math.exp( -0.0349 * bt * Math.tan( frad ) )) - 1.0) / (nd - 1.0) );

    } // end if +
    
   else
    {
    
     r[r_l][r_b] = r[r_l][r_d] = 1.0;
    
     r[r_l][r_c] = ( 1.0 - (0.4 * Math.tan( btrad ) ));

    }; // end else

  
   // Foundation base inclination parameter X:

   if( frad > 0.0 )
    {

     xd = Math.exp( - 0.045 * ap * Math.tan( frad ) );

     r[r_x][r_b] = r[r_x][r_d] = r[r_x][r_c] = xd;

    } // end if +
     
   else
    {
    
     r[r_x][r_b] = r[r_x][r_d] = 1.0;

     r[r_x][r_c] = ( 1.0 - 0.0068 * ap );

    }; // end else


  // Results:

  for( r[r_f][r_b] = r[r_f][r_d] = r[r_f][r_c] = 1 , i = 0; i < r_f; nb = r[r_f][r_b] *= r[i][r_b] , nd = r[r_f][r_d] *= r[i][r_d] , nc = r[r_f][r_c] *= r[i++][r_c] );

  r[r_r][r_ed] = ( (gg * ngk) + (gq * nqr) );

  r[r_r][r_rd] = ( (a * b * ((b * g2 * nb) + (d * g1 * nd) + (c * nc))) / gr );

  r[r_r][r_m]  = ( r[r_r][r_ed] / r[r_r][r_rd] );


  return( r );
  

 }; // end function GroundFailure()


