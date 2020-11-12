
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
 
