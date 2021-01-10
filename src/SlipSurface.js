

function SlipSurface( x )
 {

  const c_0_0   = 1.0e-6
  
  const c_n     = 0;
  const c_b     = 1;
  const c_f     = 2;
  const c_dt    = 3;
  const c_ap    = 4;
  const c_bt    = 5;
  
  const r_x     = 0;
  const r_y     = 1;
  const r_r     = 2;

  var   i       = 0;
  
  var   n       = x[c_n];  
  var   b       = x[c_b];
  var   frad    = Radians( x[c_f]  );
  var   dtrad   = Radians( x[c_dt] );
  var   aprad   = Radians( x[c_ap] );
  var   btrad   = Radians( x[c_bt] );

  var   r       = new Array( r_r );

  for( i = 0; i < r_r; r[i] = new Array( n ) , ++i );

  var   e1rad   = Math.asin( - Math.sin( btrad ) / Math.sin( frad ) );
  var   e2rad   = Math.asin( - Math.sin( dtrad ) / Math.sin( frad ) );

  var   pi_4    = ( Math.PI / 4 );
  var   frad_2  = ( frad    / 2 );

  var   t1rad   = ( pi_4 - frad_2 - ((e1rad + btrad) / 2) );
  var   t2rad   = ( pi_4 + frad_2 - ((e2rad - dtrad) / 2) );
  var   t3rad   = ( pi_4 + frad_2 + ((e2rad - dtrad) / 2) );
  var   t4rad   = ( Math.PI - t1rad - t2rad - t3rad - btrad );
  var   nrad    = ( Math.PI - aprad - t1rad - t2rad - btrad );


  var   r2      = ( (b * Math.sin( t3rad )) / (Math.cos( aprad ) * Math.sin( t2rad + t3rad )) );
  var   r1      = (  r2 * Math.exp( nrad * Math.tan( frad ) ) );
  var   r0      = 0;

  var   x0      = b;
  var   y0      = 0;

  var   a0      = 0;
  var   b0      = 0;

  var   x4      = 0;
  var   y4      = ( - b * Math.tan( aprad ) );

  var   a4      = Math.tan( aprad - t3rad );
  var   b4      = ( y4 - (a4 * x4) );

  var   x3      = ( x0 - r2 * Math.cos( aprad + t2rad ) );
  var   y3      = ( y0 - r2 * Math.sin( aprad + t2rad ) );

  var   x2      = ( x0 - r1 * Math.cos( aprad + t2rad + nrad ) );
  var   y2      = ( y0 - r1 * Math.sin( aprad + t2rad + nrad ) );

  var   a2      = Math.tan( t4rad );
  var   b2      = ( y2 - (a2 * x2) );
 
  var   a1      = Math.tan(- btrad );
  var   b1      = ( y0 - (a1 * x0) );

  var   xy      = LinSect( a1 , b1 , a2 , b2 );
  
  var   x1      = xy[r_x];
  var   y1      = xy[r_y];

  var   x       = 0;
  var   y       = 0;

  var   trad    = 0;
  var   tradmin = aprad;
  var   tradmax = ( tradmin + t1rad + nrad + t2rad );
  var   tradstp = ( (tradmax - tradmin) / n );

  var   tarad   = ( aprad + t2rad );
  var   tbrad   = ( tarad + nrad  );

  for( trad = tradmin , i = 0; i <= n; trad += tradstp , ++i )
   {

    a0 = Math.tan( trad );
    
    b0 = ( y0 - (a0 * x0) );

    if( trad <= tarad )
     {
     
      xy = LinSect( a0 , b0 , a4 , b4 );
      
      x  = xy[r_x];
      
      y  = xy[r_y];
     
     } // end if +

    else
  
     if( trad <= tbrad )
      {
      
       r0 = ( r2 * Math.exp( (trad - tarad) * Math.tan( frad ) ) );

       x  = ( x0 - (r0 * Math.cos( trad )) );
       
       y  = ( y0 - (r0 * Math.sin( trad )) );

      } // end if +

     else
      {

       xy = LinSect( a0 , b0 , a2 , b2 );

       x  = xy[r_x];

       y  = xy[r_y];
       
      }; // end else

    r[r_x][i] = x;
    
    r[r_y][i] = y;

   }; // end for()

  return( r );

 }; // end function SlipSurface()

