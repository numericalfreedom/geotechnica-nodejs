

function Morgenstern( x , nl , el )
 {
 
  const c_r  = 0;
  const c_m  = 0;
  
  const r_r  = 0;
  const r_mj = 0;
  const r_mb = 1;
  const r_l  = 2;
  const r_rx = 3;
  
  if( ! nl  )  var nl  = 100.00;
  if( ! el  )  var el  =   1.00e-4;

  var   k      = 0;
  
  var   r      = new Array( r_rx );

  for( var i = 0; i < r_rx; ++i )  r[i] = new Array( 1 );

  var   mj = 0;
  var   mb = 0;

  var   d  = 0;
  var   dl = 0;
  var   dr = 0;

  var   l  = 0;
  var   ll = 0;
  var   lr = 0;

  var   y  = undefined;

  y = Janbu(  x , 0 , l , nl , el ) , mj = y[ c_r ][ c_m ];
  
  y = Bishop( x , 0 , l , nl , el ) , mb = y[ c_r ][ c_m ];

  for( d = 1 , k = 0; ((Math.abs( d ) > el) && (k < nl)); ++k )
   {

    y = Janbu(  x , mj , l , nl , el ) , mj = y[ c_r ][ c_m ];
  
    y = Bishop( x , mb , l , nl , el ) , mb = y[ c_r ][ c_m ];

    d = ( mj - mb );

    // ( D - DL ) = ( (L - LL) * ((DR - DL) / (LR - LL)) )

    dr = dl , lr = ll , dl = d , ll = l

    if( ! k )  l = 1;  else  if( dr != dl )  l = ( ll - (dl * ((lr - ll) / (dr - dl))) );
   
   }; // end for()

  r[ r_mj ][ r_r ] = mj
  r[ r_mb ][ r_r ] = mb
  r[ r_l  ][ r_r ] = l

  return( r )

 }; // end function Morgenstern() : Interslice forces considered, momentum and force equilibrium
