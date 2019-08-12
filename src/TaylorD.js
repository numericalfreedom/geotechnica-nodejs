"use strict" ;


module.exports = { TaylorD , Radians , Degrees , Slopestability , WedgeSlope } ;


function TaylorD( pi , bt , ph )
 {
 
  const c_pi = 0 ;
  const c_bt = 1 ;
  const c_ph = 2 ;
  const c_d  = 3 ; 

  const ix   = 3 ;
  const jx   = 3 ;
  const rx   = 4 ;

  var   i   = undefined ;
  var   j   = undefined ;
  var   d   = undefined ;
  var   c   = undefined ;

  var   sd  = undefined ;
  var   xd  = undefined ;
  var   jd  = undefined ;

  var   r   = new Array( ix ) ;


  for( i = 0; i < ix; ++i )

    for( r[i] = new Array( rx ) , j = 0; j < rx; r[i][j++] = undefined ) ;


  const taylord =
   [
  
    [   4.00 , 85.00 , 10.00 ] ,
    [   4.50 , 77.50 , 10.00 ] ,
    [   5.00 , 67.50 , 10.00 ] ,
    [   5.50 , 55.00 , 10.00 ] ,
    [   6.00 , 45.00 , 10.00 ] ,
    [   6.50 , 40.00 , 10.00 ] ,
    [   6.75 , 37.50 , 10.00 ] ,
    [   7.50 , 30.00 , 10.00 ] ,
    [   8.00 , 27.50 , 10.00 ] ,
    [   8.50 , 25.00 , 10.00 ] ,
    [   9.00 , 22.50 , 10.00 ] ,
    [   9.50 , 20.00 , 10.00 ] ,
    [   4.00 , 90.00 , 15.00 ] ,
    [   4.50 , 87.50 , 15.00 ] ,
    [   5.00 , 77.50 , 15.00 ] ,
    [   5.50 , 70.00 , 15.00 ] ,
    [   6.00 , 62.50 , 15.00 ] ,
    [   6.50 , 55.00 , 15.00 ] ,
    [   7.00 , 47.50 , 15.00 ] ,
    [   7.50 , 42.50 , 15.00 ] ,
    [   8.00 , 37.50 , 15.00 ] ,
    [   8.50 , 35.00 , 15.00 ] ,
    [   9.00 , 30.00 , 15.00 ] ,
    [   9.50 , 27.50 , 15.00 ] ,
    [  10.00 , 25.00 , 15.00 ] ,
    [  12.00 , 20.00 , 15.00 ] ,
    [  14.00 , 17.50 , 15.00 ] ,
    [  16.00 , 15.00 , 15.00 ] ,
    [  18.00 , 12.50 , 15.00 ] ,
    [  20.00 , 12.00 , 15.00 ] ,
    [  25.00 ,  9.00 , 15.00 ] ,
    [  30.00 ,  8.50 , 15.00 ] ,
    [  35.00 ,  8.00 , 15.00 ] ,
    [  40.00 ,  7.50 , 15.00 ] ,
    [  50.00 ,  7.00 , 15.00 ] ,
    [  55.00 ,  6.75 , 15.00 ] ,
    [  60.00 ,  6.50 , 15.00 ] ,
    [  80.00 ,  6.25 , 15.00 ] ,
    [ 100.00 ,  6.00 , 15.00 ] ,
    [   4.50 , 90.00 , 20.00 ] ,
    [   5.00 , 87.50 , 20.00 ] ,
    [   5.50 , 77.50 , 20.00 ] ,
    [   6.00 , 72.50 , 20.00 ] ,
    [   6.50 , 67.50 , 20.00 ] ,
    [   7.00 , 62.50 , 20.00 ] ,
    [   7.50 , 57.50 , 20.00 ] ,
    [   8.00 , 55.00 , 20.00 ] ,
    [   8.50 , 50.00 , 20.00 ] ,
    [   9.00 , 47.50 , 20.00 ] ,
    [   9.50 , 45.00 , 20.00 ] ,
    [  10.00 , 42.50 , 20.00 ] ,
    [  12.00 , 34.00 , 20.00 ] ,
    [  14.00 , 28.00 , 20.00 ] ,
    [  16.00 , 26.00 , 20.00 ] ,
    [  18.00 , 23.00 , 20.00 ] ,
    [  20.00 , 22.00 , 20.00 ] ,
    [  25.00 , 18.00 , 20.00 ] ,
    [  30.00 , 17.00 , 20.00 ] ,
    [  35.00 , 16.00 , 20.00 ] ,
    [  40.00 , 15.00 , 20.00 ] ,
    [  50.00 , 14.00 , 20.00 ] ,
    [  55.00 , 13.50 , 20.00 ] ,
    [  60.00 , 13.00 , 20.00 ] ,
    [  80.00 , 12.50 , 20.00 ] ,
    [ 100.00 , 12.00 , 20.00 ] ,
    [   5.00 , 90.00 , 25.00 ] ,
    [   5.50 , 85.00 , 25.00 ] ,
    [   6.00 , 80.00 , 25.00 ] ,
    [   6.50 , 75.00 , 25.00 ] ,
    [   7.00 , 70.00 , 25.00 ] ,
    [   7.50 , 67.50 , 25.00 ] ,
    [   8.00 , 65.00 , 25.00 ] ,
    [   8.50 , 60.00 , 25.00 ] ,
    [   9.00 , 57.50 , 25.00 ] ,
    [   9.50 , 55.00 , 25.00 ] ,
    [  10.00 , 52.50 , 25.00 ] ,
    [  12.00 , 45.00 , 25.00 ] ,
    [  14.00 , 40.00 , 25.00 ] ,
    [  16.00 , 37.50 , 25.00 ] ,
    [  18.00 , 33.00 , 25.00 ] ,
    [  20.00 , 32.50 , 25.00 ] ,
    [  25.00 , 27.50 , 25.00 ] ,
    [  30.00 , 25.00 , 25.00 ] ,
    [  35.00 , 23.00 , 25.00 ] ,
    [  40.00 , 22.50 , 25.00 ] ,
    [  50.00 , 21.00 , 25.00 ] ,
    [  55.00 , 20.50 , 25.00 ] ,
    [  60.00 , 19.50 , 25.00 ] ,
    [  80.00 , 18.00 , 25.00 ] ,
    [ 100.00 , 17.00 , 25.00 ] ,
    [   5.50 , 90.00 , 30.00 ] ,
    [   6.00 , 85.00 , 30.00 ] ,
    [   6.50 , 80.00 , 30.00 ] ,
    [   7.00 , 77.50 , 30.00 ] ,
    [   7.50 , 74.00 , 30.00 ] ,
    [   8.00 , 72.00 , 30.00 ] ,
    [   8.50 , 67.50 , 30.00 ] ,
    [   9.00 , 66.00 , 30.00 ] ,
    [   9.50 , 64.00 , 30.00 ] ,
    [  10.00 , 62.00 , 30.00 ] ,
    [  12.00 , 55.00 , 30.00 ] ,
    [  14.00 , 48.00 , 30.00 ] ,
    [  16.00 , 46.00 , 30.00 ] ,
    [  18.00 , 42.50 , 30.00 ] ,
    [  20.00 , 40.00 , 30.00 ] ,
    [  25.00 , 35.00 , 30.00 ] ,
    [  30.00 , 33.00 , 30.00 ] ,
    [  35.00 , 31.00 , 30.00 ] ,
    [  40.00 , 29.00 , 30.00 ] ,
    [  50.00 , 27.50 , 30.00 ] ,
    [  55.00 , 27.00 , 30.00 ] ,
    [  60.00 , 26.00 , 30.00 ] ,
    [  80.00 , 25.00 , 30.00 ] ,
    [ 100.00 , 24.00 , 30.00 ] ,
    [   6.00 , 90.00 , 35.00 ] ,
    [   6.50 , 85.00 , 35.00 ] ,
    [   7.00 , 82.50 , 35.00 ] ,
    [   7.50 , 80.00 , 35.00 ] ,
    [   8.00 , 77.50 , 35.00 ] ,
    [   8.50 , 75.00 , 35.00 ] ,
    [   9.00 , 72.50 , 35.00 ] ,
    [   9.50 , 71.00 , 35.00 ] ,
    [  10.00 , 68.00 , 35.00 ] ,
    [  12.00 , 62.50 , 35.00 ] ,
    [  14.00 , 57.50 , 35.00 ] ,
    [  16.00 , 53.00 , 35.00 ] ,
    [  18.00 , 50.00 , 35.00 ] ,
    [  20.00 , 47.50 , 35.00 ] ,
    [  25.00 , 43.00 , 35.00 ] ,
    [  30.00 , 40.00 , 35.00 ] ,
    [  35.00 , 38.00 , 35.00 ] ,
    [  40.00 , 37.00 , 35.00 ] ,
    [  50.00 , 34.00 , 35.00 ] ,
    [  55.00 , 33.50 , 35.00 ] ,
    [  60.00 , 33.00 , 35.00 ] ,
    [  80.00 , 32.00 , 35.00 ] ,
    [ 100.00 , 30.00 , 35.00 ] ,
    [   6.50 , 90.00 , 40.00 ] ,
    [   7.00 , 87.50 , 40.00 ] ,
    [   7.50 , 84.00 , 40.00 ] ,
    [   8.00 , 82.50 , 40.00 ] ,
    [   8.50 , 80.00 , 40.00 ] ,
    [   9.00 , 78.00 , 40.00 ] ,
    [   9.50 , 76.00 , 40.00 ] ,
    [  10.00 , 73.50 , 40.00 ] ,
    [  12.00 , 67.50 , 40.00 ] ,
    [  14.00 , 63.00 , 40.00 ] ,
    [  16.00 , 60.00 , 40.00 ] ,
    [  18.00 , 57.00 , 40.00 ] ,
    [  20.00 , 53.50 , 40.00 ] ,
    [  25.00 , 48.00 , 40.00 ] ,
    [  30.00 , 46.00 , 40.00 ] ,
    [  35.00 , 43.50 , 40.00 ] ,
    [  40.00 , 42.00 , 40.00 ] ,
    [  50.00 , 39.50 , 40.00 ] ,
    [  55.00 , 38.00 , 40.00 ] ,
    [  60.00 , 37.50 , 40.00 ] ,
    [  80.00 , 35.50 , 40.00 ] ,
    [ 100.00 , 34.50 , 40.00 ] ,
    [   7.50 , 90.00 , 45.00 ] ,
    [   8.00 , 87.50 , 45.00 ] ,
    [   8.50 , 85.00 , 45.00 ] ,
    [   9.00 , 83.50 , 45.00 ] ,
    [   9.50 , 82.00 , 45.00 ] ,
    [  10.00 , 79.00 , 45.00 ] ,
    [  12.00 , 73.50 , 45.00 ] ,
    [  14.00 , 68.00 , 45.00 ] ,
    [  16.00 , 66.00 , 45.00 ] ,
    [  18.00 , 62.50 , 45.00 ] ,
    [  20.00 , 59.50 , 45.00 ] ,
    [  25.00 , 55.00 , 45.00 ] ,
    [  30.00 , 52.00 , 45.00 ] ,
    [  35.00 , 49.50 , 45.00 ] ,
    [  40.00 , 47.50 , 45.00 ] ,
    [  50.00 , 45.00 , 45.00 ] ,
    [  55.00 , 43.50 , 45.00 ] ,
    [  60.00 , 42.50 , 45.00 ] ,
    [  80.00 , 40.00 , 45.00 ] ,
    [ 100.00 , 38.00 , 45.00 ]

   ] ;


  for( i = 0; i < taylord.length; ++i )
   {


    if( pi == 0 )
 
      d = ( Math.abs( bt - taylord[i][c_bt] ) + Math.abs( ph - taylord[i][c_ph] ) ) ;


    if( ph == 0 )

      d = ( Math.abs( pi - taylord[i][c_pi] ) + Math.abs( bt - taylord[i][c_bt] ) ) ;


    if( bt == 0 )

      d = ( Math.abs( pi - taylord[i][c_pi] ) + Math.abs( ph - taylord[i][c_ph] ) ) ;


    for( c = true , xd = 0 , jd = 0 , j = 0; (c && (j < jx)); ++j )

      if( r[j][c_d] == undefined )
       {

        r[j][c_d]  = d ;

        r[j][c_pi] = taylord[i][c_pi] ;
        r[j][c_bt] = taylord[i][c_bt] ;
        r[j][c_ph] = taylord[i][c_ph] ;

        xd = 0 ;

        jd = j ;

        c = false ;

       } // end if{} +

      else if( r[j][c_d] > xd )
       {

        xd = r[j][c_d] ;

        jd = j ;

       } ; // end if{} -


    if( d < xd )
     {

      r[jd][c_d]  = d ;

      r[jd][c_pi] = taylord[i][c_pi] ;
      r[jd][c_bt] = taylord[i][c_bt] ;
      r[jd][c_ph] = taylord[i][c_ph] ;

     } ; // end if{} -


   } ; // end for()


  if( pi == 0 ) 
   {

    for( c = true , pi = 0 , sd = 0 , j = 0; (c && (j < jx)); ++j )
  
      if( r[j][c_d] == 0 )
       {
 
        pi = r[j][c_pi] ;

        c  = false ;

       } // end if{} +

      else
       {

        pi += ( r[j][c_pi] / r[j][c_d] ) ;

        sd += ( 1.0 / r[j][c_d] ) ;

       } ; // end else

    pi /= sd ;

   } ; // end if() -


  if( bt == 0 )
   {

    for( c = true , bt = 0 , sd = 0 , j = 0; (c && (j < jx)); ++j )

      if( r[j][c_d] == 0 )
       {

        bt = r[j][c_bt] ;

        c  = false ;

       } // end if{} +

      else
       {

        bt += ( r[j][c_bt] / r[j][c_d] ) ;

        sd += ( 1.0 / r[j][c_d] ) ;

       } ; // end else

    bt /= sd ;

   } ; // end if() -


  if( ph == 0 )
   {

    for( c = true , ph = 0 , sd = 0 , j = 0; (c && (j < jx)); ++j )

      if( r[j][c_d] == 0 )
       {

        ph = r[j][c_ph] ;

        c  = false ;

       } // end if{} +

      else
       {

        ph += ( r[j][c_ph] / r[j][c_d] ) ;

        sd += ( 1.0 / r[j][c_d] ) ;

       } ; // end else

    ph /= sd ;

   } ; // end if() -


  return( [ r , [ pi , bt , ph ] ] ) ;


 } ; // end function TaylorD



function Radians( d )
 {
 
  return( (d / 180.0) * Math.PI ) ;
 
 } ; // end function Radians



function Degrees( r )
 {
 
  return( (r / Math.PI) * 180.0 ) ;
 
 } ; // end function Radians



function Slopestability( h , bt , rh , ph , c )
 {

  const c_x     = 13 ;

  const c_h     =  0;
  const c_bt    =  1;

  const c_rh    =  2;
  const c_ph    =  3;
  const c_c     =  4;

  const c_q     =  5;
  const c_ap    =  6;
  const c_fv    =  7;
  const c_fh    =  8;

  const c_gph   =  9;
  const c_gc    = 10;
  const c_gg    = 11;
  const c_gq    = 12;
  
  const c_g     = 10;
  
  const r_m     = 4 ;
  
  const thn = 5.0 ;
  const thx = ( bt - 1.0 ) ;
  const thd = 0.1 ;
  
  var th = undefined ;
  var x  = new Array( c_x ) ;
  var r  = null ;
  
  var mn = undefined ;
  
  x = [ [ h ] , [ bt ] , [ rh ] , [ ph ] , [ c ] , [ 0.0 ] , [ 1.0 ] , [ 0.0 ] , [ 0.0 ] , [ 1.0 ] , [ 1.0 ] , [ 1.0 ] , [ 1.0 ] ] ;
  
  for( mn = undefined , th = thn; th < thx; th += thd )
   {

    r = WedgeSlope( x , th ) ;

    if( (mn === undefined) || (mn < r[ r_m ]) )  mn = r[ r_m ] ;

   } ; // end for()
     
  return( mn ) ;
 
 } ; // end function Slope()



function WedgeSlope( x , th )
 {
  
  const c_r     =  0;
  const c_h     =  0;
  const c_bt    =  1;

  const c_rh    =  2;
  const c_ph    =  3;
  const c_c     =  4;

  const c_q     =  5;
  const c_ap    =  6;
  const c_fv    =  7;
  const c_fh    =  8;

  const c_gph   =  9;
  const c_gc    = 10;
  const c_gg    = 11;
  const c_gq    = 12;

  const r_r     =  0;
  const r_phd   =  0;
  const r_cd    =  1;
  const r_fe    =  2;
  const r_fr    =  3;
  const r_m     =  4;
  const r_rx    =  5;

  const c_g     = 10;

  var   r       = new Array( r_rx );

  for( var i = 0; i < r_rx; ++i )  r[i] = new Array( 1 );

  var   thrad   = Radians( th );
    
  var   h       = x[ c_h   ][ c_r ];
  var   btrad   = Radians( x[ c_bt ][ c_r ] );

  var   rh      = x[ c_rh  ][ c_r ];
  var   phkrad  = Radians( x[ c_ph ][ c_r ] );
  var   ck      = x[ c_c   ][ c_r ];

  var   q       = x[ c_q   ][ c_r ];
  var   aprad   = Radians( x[ c_ap ][ c_r ] );

  var   fv      = x[ c_fv  ][ c_r ];
  var   fh      = x[ c_fh  ][ c_r ];

  var   gph     = x[ c_gph ][ c_r ];
  var   gc      = x[ c_gc  ][ c_r ];

  var   gg      = x[ c_gg  ][ c_r ];
  var   gq      = x[ c_gq  ][ c_r ];

  var   l       = 0;

  var   fp      = 0;
  var   fq      = 0;

  var   fe      = 0;
  var   fr      = 0;

  var   m       = 0;

  var   phdrad  = Math.atan( Math.tan( phkrad ) / gph );
  var   cd      = ( ck / gc );


  if( thrad > btrad )  thrad = btrad;

  if( aprad > btrad )  aprad = btrad;

  if( aprad < thrad )  aprad = thrad;


  fp = ( (gq * fv) + (gg * (1 / 2) * rh * c_g * h * h * ((1 / Math.tan( thrad )) - (1 / Math.tan( btrad )))) );
 
  if( aprad > thrad ) fp += ( gq * q * h * ((1 / Math.tan( thrad )) - (1 / Math.tan( aprad ))) );

  fq = ( gq * fh );


  l  = ( h / Math.sin( thrad ) );

  fe = (   (fp * Math.sin( thrad )) - (fq * Math.cos( thrad )) );

  fr = ( (((fp * Math.cos( thrad )) + (fq * Math.sin( thrad ))) * Math.tan( phdrad )) + (cd * l) );

  if( fr )  m = ( fe / fr );  else  m = ( Math.tan( btrad ) / Math.tan( phdrad ) );


  r[ r_phd ][ r_r ] = Degrees( phdrad );
  r[ r_cd  ][ r_r ] = cd;
  
  r[ r_fe  ][ r_r ] = fe;
  r[ r_fr  ][ r_r ] = fr;
  r[ r_m   ][ r_r ] = m;

  return( r );
  
 }; // end function WedgeSlope()

