

function GroundFailure( x , ge , gr )
 {
 
  const c_0_0 =  1.0e-6;

  const c_r   =  0;
  const c_ff  =  0;
  const c_f   =  1;
  const c_c   =  2;
  const c_a   =  3;
  const c_b   =  4;
  const c_g1  =  5;
  const c_d   =  6;
  const c_g2  =  7;
  const c_ea  =  8;
  const c_eb  =  9;
  const c_dt  = 10;
  const c_ap  = 11;
  const c_bt  = 12;
  const c_w   = 13;
  const c_s   = 14;
  const c_t   = 15;
  const c_n   = 16;
   
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

  if( ! ge )  var  ge = 1;
  if( ! gr )  var  gr = 1;

  var r  = new Array( r_rr );
  
  for( i = 0; i < r_rr; r[i] = new Array( r_rc ) , ++i );

  var ff = x[ c_ff ][ c_r ];
  var f  = x[ c_f  ][ c_r ];
  var c  = x[ c_c  ][ c_r ];
  var a  = x[ c_a  ][ c_r ];
  var b  = x[ c_b  ][ c_r ];
  var g1 = x[ c_g1 ][ c_r ];
  var d  = x[ c_d  ][ c_r ];
  var g2 = x[ c_g2 ][ c_r ];
  var ea = x[ c_ea ][ c_r ];
  var eb = x[ c_eb ][ c_r ];
  var dt = x[ c_dt ][ c_r ];
  var ap = x[ c_ap ][ c_r ];
  var bt = x[ c_bt ][ c_r ];
  var w  = x[ c_w  ][ c_r ];
  var s  = x[ c_s  ][ c_r ];

  var frad  = Radians(  f );
  var dtrad = Radians( dt );
  var aprad = Radians( ap );
  var btrad = Radians( bt );
  var wrad  = Radians(  w );

  var n     = ( s * Math.cos( dtrad ) );
  var t     = ( s * Math.sin( dtrad ) );

  var fv    = 0;

  var kp    = 0;
  var vd    = 0;
  var xd    = 0;
  var id    = 0;

  var nd    = 0;
  var nb    = 0;
  var nc    = 0;
  
  var ma    = 0;
  var mb    = 0;
  var m     = 0;

  if( frad > 0 )  fv = frad;  else  fv = c_0_0;

  kp = Math.tan( (Math.PI / 4) + (fv / 2) );
  
  nd = ( Math.exp( Math.PI * Math.tan( fv ) ) * kp * kp ); r[r_n][r_d] = nd;  // Parameter Nd0
  
  nc = ( (nd - 1) / Math.tan( fv ) ); r[r_n][r_c] = nc;  // Parameter Nc0

  nb = ( (nd - 1) * Math.tan( fv ) ); r[r_n][r_n] = nb;  // Parameter Nb0

  if( ea > 0 )  a -= ( 2 * ea );

  if( eb > 0 )  b -= ( 2 * eb );

  // Foundation form parameter V:
  
  switch( ff )
   {
   
    default:
    case 1:
 
     r[r_v][r_b] = r[r_v][r_d] = r[r_v][r_c] = 1;
    
     break;
    
    case 2:

     r[r_v][r_b] = ( 1 - (0.3 * (b / a)) );

     r[r_v][r_d] = vd = ( 1 + ((b / a) * Math.sin( frad )) );
     
     if( frad )  r[r_v][r_c] = ( ((vd * nd) - 1) / (nd - 1) );  else  r[r_v][r_c] = ( 1 + (0.2 * (b / a)) );
    
     break;
    
    case 3:

     r[r_v][r_b] = 0.7;
     
     r[r_v][r_d] = vd = ( 1 + Math.sin( frad ) );
     
     if( frad )  r[r_v][r_c] = ( ((vd * nd) - 1) / (nd - 1) );  else  r[r_v][r_c] = 1.2;
   
     break;
   
   }; // end switch( ff )


  // Exponent M for load inclination parameter I:

  switch( ff )
   {
   
    default:
    case 1:

     m = 2;
    
     break;
    
    case 2:
    case 3:

     ma = ( (2 + (a / b)) / (1 + (a / b)) );

     mb = ( (2 + (b / a)) / (1 + (b / a)) );

     m  = ( (ma * Math.cos( wrad ) * Math.cos( wrad )) + (mb * Math.sin( wrad ) * Math.sin( wrad )) );

     break;
   
   }; // end switch( ff )


  // Load inclination parameter I:

  if( frad > 0 )
   {
     
    if( dtrad >= 0 )

     r[r_i][r_b] = Math.pow( (1 - Math.tan( dtrad )) , (m + 1) );

    else

     r[r_i][r_b] = Math.pow( (Math.cos( dtrad ) * (1 - (0.04 * dt))) , (0.64 + (0.028 * f)) );

    if( dtrad > 0 )

     id = Math.pow( (1 - Math.tan( dtrad )) , m );

    else

     id = Math.pow( (Math.cos( dtrad ) * (1 - (0.0244 * dt))) , (0.03 + (0.04 * f)) );

    r[r_i][r_d] = id;

    r[r_i][r_c] = ( ((id * nd) - 1) / (nd - 1) );
     
   } // end if +

  else
   {

    r[r_i][r_b] = r[r_i][r_d] = r[r_i][r_c] = 1;

    if( a > 0 )

      if( t < (a * c) )

        r[r_i][r_c] = ( 0.5 + (0.5 * Math.sqrt( 1 - (t / (a * c)) )) );

      else
        
        r[r_i][r_c] = 0.5;

   }; // end else


   // Surface inclination parameter L:
   
   if( frad > 0 )
    {
    
     r[r_l][r_b] = Math.pow( (1 - (0.5 * Math.tan( btrad ))) , 6 );
     
     r[r_l][r_d] = Math.pow( (1 - Math.tan( btrad )) , 1.9 );
     
     r[r_l][r_c] = ( ((nd * Math.exp( -0.0349 * bt * Math.tan( frad ) )) - 1) / (nd - 1) );

    } // end if +
    
   else
    {
    
     r[r_l][r_b] = r[r_l][r_d] = 1;
    
     r[r_l][r_c] = ( 1 - (0.4 * Math.tan( btrad ) ));

    }; // end else

  
   // Foundation base inclination parameter X:

   if( frad > 0 )
    {

     xd = Math.exp( - 0.045 * ap * Math.tan( frad ) );

     r[r_x][r_b] = r[r_x][r_d] = r[r_x][r_c] = xd;

    } // end if +
     
   else
    {
    
     r[r_x][r_b] = r[r_x][r_d] = 1;

     r[r_x][r_c] = ( 1 - 0.0068 * ap );

    }; // end else


  // Results:

  for( r[r_f][r_b] = r[r_f][r_d] = r[r_f][r_c] = 1 , i = 0; i < r_f; nb = r[r_f][r_b] *= r[i][r_b] , nd = r[r_f][r_d] *= r[i][r_d] , nc = r[r_f][r_c] *= r[i++][r_c] );

  r[r_r][r_ed] = ( ge * n );

  r[r_r][r_rd] = ( a * b * ((b * g2 * nb) + (d * g1 * nd) + (c * nc) ) / gr );

  r[r_r][r_m]  = ( r[r_r][r_ed] / r[r_r][r_rd] );


  return( r );
  

 }; // end function GroundFailure()


