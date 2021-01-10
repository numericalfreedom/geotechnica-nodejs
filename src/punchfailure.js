


function PunchFailure( x , ge , gr )
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
  const c_t   = 14;
  const c_n   = 15;
   
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
  var   j     =  0;

  if( ! ge )  var  ge = 1;
  if( ! gr )  var  gr = 1;

  var r  = new Array( r_rr );
  
  for( i = 0; i < r_rr; ++i )

   for( j = 0 , r[i] = new Array( r_rc ); j < r_rc; r[i][j++] = 0 );

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
  var t  = x[ c_t  ][ c_r ];
  var n  = x[ c_n  ][ c_r ];

  var ma    = 0;
  var mb    = 0;
  var l     = 0;

  var f2    = ( f * f  );
  var f3    = ( f * f2 );

  var nc    = 0;
  var rn    = 0;
 
  switch( ff )
   {
   
    default:
    case 1:  // Soft foundation

     ma = ( (2.61e-7 * f3) - (5.31e-5 * f2) + (2.66e-3 * f) );
     
     mb = ( (3.92e-7 * f3) - (7.97e-5 * f2) + (3.98e-3 * f) );
     
     break;

    case 2:  // Stiff foundation

     ma = ( (1.11e-6 * f3) - (2.01e-4 * f2) + (9.17e-3 * f) );
   
     mb = ( (1.66e-6 * f3) - (3.02e-4 * f2) + (1.38e-2 * f) );

   }; // end switch( ff )

  r[r_v][r_c] = ma;
  
  r[r_i][r_c] = mb;

  nc = ( (2 + Math.PI) * (1 + (0.2 * (b / a))) );

  r[r_n][r_c] = nc;

  l  = ( (d / a) + (d / b) )

  r[r_l][r_c] = l;


  rn  = ( 2 * (1 + (b / a)) * nc * c );

  rn += (  (3 + (2 * (b / a))) * ma * l * g2 * d );

  rn /= ( ((3 + (2 * (b / a))) * Math.exp( - mb * l )) - 1 );


  // Results:

  r[r_r][r_ed] = (  ge * n );

  r[r_r][r_rd] = ( (rn * a * b) / gr );

  r[r_r][r_m]  = ( r[r_r][r_ed] / r[r_r][r_rd] );


  return( r );
  

 }; // end function PunchFailure()
