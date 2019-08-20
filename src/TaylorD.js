"use strict" ;


module.exports = { TaylorD , TaylorU , Radians , Degrees , Slopestability , WedgeSlope } ;


function TaylorD( pi , bt , ph )
 {
 
  const c_pi = 0 ;
  const c_bt = 1 ;
  const c_ph = 2 ;
  const c_d  = 3 ; 

  const jx   = 10 ;
  const kx   = 3  ;
  const rx   = 4  ;

  const n    = 0.20 ;

  var   ix   = undefined ;

  var   i    = undefined ;
  var   j    = undefined ;
  var   k    = undefined ;
  var   c    = undefined ;
  var   d    = undefined ;
  var   dc   = undefined ;
  var   ds   = undefined ;
  var   dx   = undefined ;
  var   dj   = undefined ;
  var   dn   = undefined ;
  var   dr   = undefined ;

  var   dv   = [ pi , bt , ph ] ;
  var   r    = new Array( ix ) ;


  for( j = 0; j < jx; ++j )

    for( r[j] = new Array( rx ) , k = 0; k < rx; r[j][k++] = undefined ) ;


  const taylord =
   [
  
    [   4.00 , 85.00 ,  0.00 ] ,
    [   4.50 , 77.50 ,  0.00 ] ,
    [   5.00 , 67.50 ,  0.00 ] ,
    [   5.50 , 55.00 ,  0.00 ] ,
    [   6.00 , 45.00 ,  0.00 ] ,
    [   6.50 , 40.00 ,  0.00 ] ,
    [   6.75 , 37.50 ,  0.00 ] ,
    [   7.50 , 30.00 ,  0.00 ] ,
    [   8.00 , 27.50 ,  0.00 ] ,
    [   8.50 , 25.00 ,  0.00 ] ,
    [   9.00 , 22.50 ,  0.00 ] ,
    [   9.50 , 20.00 ,  0.00 ] ,
    [   4.00 , 90.00 ,  5.00 ] ,
    [   4.50 , 87.50 ,  5.00 ] ,
    [   5.00 , 77.50 ,  5.00 ] ,
    [   5.50 , 70.00 ,  5.00 ] ,
    [   6.00 , 62.50 ,  5.00 ] ,
    [   6.50 , 55.00 ,  5.00 ] ,
    [   7.00 , 47.50 ,  5.00 ] ,
    [   7.50 , 42.50 ,  5.00 ] ,
    [   8.00 , 37.50 ,  5.00 ] ,
    [   8.50 , 35.00 ,  5.00 ] ,
    [   9.00 , 30.00 ,  5.00 ] ,
    [   9.50 , 27.50 ,  5.00 ] ,
    [  10.00 , 25.00 ,  5.00 ] ,
    [  12.00 , 20.00 ,  5.00 ] ,
    [  14.00 , 17.50 ,  5.00 ] ,
    [  16.00 , 15.00 ,  5.00 ] ,
    [  18.00 , 12.50 ,  5.00 ] ,
    [  20.00 , 12.00 ,  5.00 ] ,
    [  25.00 ,  9.00 ,  5.00 ] ,
    [  30.00 ,  8.50 ,  5.00 ] ,
    [  35.00 ,  8.00 ,  5.00 ] ,
    [  40.00 ,  7.50 ,  5.00 ] ,
    [  50.00 ,  7.00 ,  5.00 ] ,
    [  55.00 ,  6.75 ,  5.00 ] ,
    [  60.00 ,  6.50 ,  5.00 ] ,
    [  80.00 ,  6.25 ,  5.00 ] ,
    [ 100.00 ,  6.00 ,  5.00 ] ,
    [   4.50 , 90.00 , 10.00 ] ,
    [   5.00 , 87.50 , 10.00 ] ,
    [   5.50 , 77.50 , 10.00 ] ,
    [   6.00 , 72.50 , 10.00 ] ,
    [   6.50 , 67.50 , 10.00 ] ,
    [   7.00 , 62.50 , 10.00 ] ,
    [   7.50 , 57.50 , 10.00 ] ,
    [   8.00 , 55.00 , 10.00 ] ,
    [   8.50 , 50.00 , 10.00 ] ,
    [   9.00 , 47.50 , 10.00 ] ,
    [   9.50 , 45.00 , 10.00 ] ,
    [  10.00 , 42.50 , 10.00 ] ,
    [  12.00 , 34.00 , 10.00 ] ,
    [  14.00 , 28.00 , 10.00 ] ,
    [  16.00 , 26.00 , 10.00 ] ,
    [  18.00 , 23.00 , 10.00 ] ,
    [  20.00 , 22.00 , 10.00 ] ,
    [  25.00 , 18.00 , 10.00 ] ,
    [  30.00 , 17.00 , 10.00 ] ,
    [  35.00 , 16.00 , 10.00 ] ,
    [  40.00 , 15.00 , 10.00 ] ,
    [  50.00 , 14.00 , 10.00 ] ,
    [  55.00 , 13.50 , 10.00 ] ,
    [  60.00 , 13.00 , 10.00 ] ,
    [  80.00 , 12.50 , 10.00 ] ,
    [ 100.00 , 12.00 , 10.00 ] ,
    [   5.00 , 90.00 , 15.00 ] ,
    [   5.50 , 85.00 , 15.00 ] ,
    [   6.00 , 80.00 , 15.00 ] ,
    [   6.50 , 75.00 , 15.00 ] ,
    [   7.00 , 70.00 , 15.00 ] ,
    [   7.50 , 67.50 , 15.00 ] ,
    [   8.00 , 65.00 , 15.00 ] ,
    [   8.50 , 60.00 , 15.00 ] ,
    [   9.00 , 57.50 , 15.00 ] ,
    [   9.50 , 55.00 , 15.00 ] ,
    [  10.00 , 52.50 , 15.00 ] ,
    [  12.00 , 45.00 , 15.00 ] ,
    [  14.00 , 40.00 , 15.00 ] ,
    [  16.00 , 37.50 , 15.00 ] ,
    [  18.00 , 33.00 , 15.00 ] ,
    [  20.00 , 32.50 , 15.00 ] ,
    [  25.00 , 27.50 , 15.00 ] ,
    [  30.00 , 25.00 , 15.00 ] ,
    [  35.00 , 23.00 , 15.00 ] ,
    [  40.00 , 22.50 , 15.00 ] ,
    [  50.00 , 21.00 , 15.00 ] ,
    [  55.00 , 20.50 , 15.00 ] ,
    [  60.00 , 19.50 , 15.00 ] ,
    [  80.00 , 18.00 , 15.00 ] ,
    [ 100.00 , 17.00 , 15.00 ] ,
    [   5.50 , 90.00 , 20.00 ] ,
    [   6.00 , 85.00 , 20.00 ] ,
    [   6.50 , 80.00 , 20.00 ] ,
    [   7.00 , 77.50 , 20.00 ] ,
    [   7.50 , 74.00 , 20.00 ] ,
    [   8.00 , 72.00 , 20.00 ] ,
    [   8.50 , 67.50 , 20.00 ] ,
    [   9.00 , 66.00 , 20.00 ] ,
    [   9.50 , 64.00 , 20.00 ] ,
    [  10.00 , 62.00 , 20.00 ] ,
    [  12.00 , 55.00 , 20.00 ] ,
    [  14.00 , 48.00 , 20.00 ] ,
    [  16.00 , 46.00 , 20.00 ] ,
    [  18.00 , 42.50 , 20.00 ] ,
    [  20.00 , 40.00 , 20.00 ] ,
    [  25.00 , 35.00 , 20.00 ] ,
    [  30.00 , 33.00 , 20.00 ] ,
    [  35.00 , 31.00 , 20.00 ] ,
    [  40.00 , 29.00 , 20.00 ] ,
    [  50.00 , 27.50 , 20.00 ] ,
    [  55.00 , 27.00 , 20.00 ] ,
    [  60.00 , 26.00 , 20.00 ] ,
    [  80.00 , 25.00 , 20.00 ] ,
    [ 100.00 , 24.00 , 20.00 ] ,
    [   6.00 , 90.00 , 25.00 ] ,
    [   6.50 , 85.00 , 25.00 ] ,
    [   7.00 , 82.50 , 25.00 ] ,
    [   7.50 , 80.00 , 25.00 ] ,
    [   8.00 , 77.50 , 25.00 ] ,
    [   8.50 , 75.00 , 25.00 ] ,
    [   9.00 , 72.50 , 25.00 ] ,
    [   9.50 , 71.00 , 25.00 ] ,
    [  10.00 , 68.00 , 25.00 ] ,
    [  12.00 , 62.50 , 25.00 ] ,
    [  14.00 , 57.50 , 25.00 ] ,
    [  16.00 , 53.00 , 25.00 ] ,
    [  18.00 , 50.00 , 25.00 ] ,
    [  20.00 , 47.50 , 25.00 ] ,
    [  25.00 , 43.00 , 25.00 ] ,
    [  30.00 , 40.00 , 25.00 ] ,
    [  35.00 , 38.00 , 25.00 ] ,
    [  40.00 , 37.00 , 25.00 ] ,
    [  50.00 , 34.00 , 25.00 ] ,
    [  55.00 , 33.50 , 25.00 ] ,
    [  60.00 , 33.00 , 25.00 ] ,
    [  80.00 , 32.00 , 25.00 ] ,
    [ 100.00 , 30.00 , 25.00 ] ,
    [   6.50 , 90.00 , 30.00 ] ,
    [   7.00 , 87.50 , 30.00 ] ,
    [   7.50 , 84.00 , 30.00 ] ,
    [   8.00 , 82.50 , 30.00 ] ,
    [   8.50 , 80.00 , 30.00 ] ,
    [   9.00 , 78.00 , 30.00 ] ,
    [   9.50 , 76.00 , 30.00 ] ,
    [  10.00 , 73.50 , 30.00 ] ,
    [  12.00 , 67.50 , 30.00 ] ,
    [  14.00 , 63.00 , 30.00 ] ,
    [  16.00 , 60.00 , 30.00 ] ,
    [  18.00 , 57.00 , 30.00 ] ,
    [  20.00 , 53.50 , 30.00 ] ,
    [  25.00 , 48.00 , 30.00 ] ,
    [  30.00 , 46.00 , 30.00 ] ,
    [  35.00 , 43.50 , 30.00 ] ,
    [  40.00 , 42.00 , 30.00 ] ,
    [  50.00 , 39.50 , 30.00 ] ,
    [  55.00 , 38.00 , 30.00 ] ,
    [  60.00 , 37.50 , 30.00 ] ,
    [  80.00 , 35.50 , 30.00 ] ,
    [ 100.00 , 34.50 , 30.00 ] ,
    [   7.50 , 90.00 , 35.00 ] ,
    [   8.00 , 87.50 , 35.00 ] ,
    [   8.50 , 85.00 , 35.00 ] ,
    [   9.00 , 83.50 , 35.00 ] ,
    [   9.50 , 82.00 , 35.00 ] ,
    [  10.00 , 79.00 , 35.00 ] ,
    [  12.00 , 73.50 , 35.00 ] ,
    [  14.00 , 68.00 , 35.00 ] ,
    [  16.00 , 66.00 , 35.00 ] ,
    [  18.00 , 62.50 , 35.00 ] ,
    [  20.00 , 59.50 , 35.00 ] ,
    [  25.00 , 55.00 , 35.00 ] ,
    [  30.00 , 52.00 , 35.00 ] ,
    [  35.00 , 49.50 , 35.00 ] ,
    [  40.00 , 47.50 , 35.00 ] ,
    [  50.00 , 45.00 , 35.00 ] ,
    [  55.00 , 43.50 , 35.00 ] ,
    [  60.00 , 42.50 , 35.00 ] ,
    [  80.00 , 40.00 , 35.00 ] ,
    [ 100.00 , 38.00 , 35.00 ]

   ] ;


  if( ph == 0 )  dc = c_ph ;

  if( bt == 0 )  dc = c_bt ;

  if( pi == 0 )  dc = c_pi ;


  ix = taylord.length ;

  for( i = 0; i < ix; ++i )
   {


    for( d = 0 , k = 0; k < kx; ++k )

      if( k != dc )
       {

        dr = ( dv[k] - taylord[i][k] ) ;

        d  += ( dr * dr ) ;

       } ; // end if{} -


    d = Math.sqrt( d ) ;


    for( c = true , dx = 0 , dj = 0 , j = 0; (c && (j < jx)); ++j )

      if( r[j][c_d] == undefined )
       {

        c  = false ;

        dj = j ;

       } // end if{} +

      else if( r[j][c_d] > dx )
       {
    
        dx = r[j][c_d] ;

        dj = j ;

       } ; // end if{} -


    if( (c == false) || (d < dx) )
     {

      r[dj][c_d]  = d ;

      r[dj][c_pi] = taylord[i][c_pi] ;
      r[dj][c_bt] = taylord[i][c_bt] ;
      r[dj][c_ph] = taylord[i][c_ph] ;

     } ; // end if{} -


   } ; // end for()


  for( c = true , dr = 0 , ds = 0 , j = 0; (c && (j < jx)); ++j )
  
    if( r[j][c_d] == 0 )
     {
 
      dr = r[j][dc] ;

      c  = false ;

     } // end if{} +

    else
     {

      dn = Math.pow( r[j][c_d] , n ) ;

      dr += ( r[j][dc] / dn ) ;

      ds += ( 1.0 / dn ) ;

     } ; // end else


  if( c )  dr /= ds ;


  if( pi == 0 )  pi = dr ;

  if( bt == 0 )  bt = dr ;

  if( ph == 0 )  ph = dr ;


  return( [ r , [ pi , bt , ph ] ] ) ;


 } ; // end function TaylorD()



function TaylorU( pi , bt , kh )
 {
 
  const c_pi = 0 ;
  const c_bt = 1 ;
  const c_kh = 2 ;
  const c_d  = 3 ; 

  const jx   = 5 ;
  const kx   = 3 ;
  const rx   = 4 ;

  const n    = 0.20 ;

  var   ix   = undefined ;

  var   i    = undefined ;
  var   j    = undefined ;
  var   k    = undefined ;
  var   c    = undefined ;
  var   d    = undefined ;
  var   dc   = undefined ;
  var   ds   = undefined ;
  var   dx   = undefined ;
  var   dj   = undefined ;
  var   dn   = undefined ;
  var   dr   = undefined ;

  var   dv   = [ pi , bt , kh ] ;
  var   r    = new Array( ix ) ;


  for( j = 0; j < jx; ++j )

    for( r[j] = new Array( rx ) , k = 0; k < rx; r[j][k++] = undefined ) ;


  const tayloru =
   [
  
    [   0.09 , 15.00 ,  1.00 ] ,
    [   0.09 ,  2.50 ,  1.70 ] ,
    [   0.10 , 15.00 ,  1.20 ] ,
    [   0.10 ,  2.50 ,  1.80 ] ,
    [   0.11 , 15.00 ,  1.25 ] ,
    [   0.11 ,  2.50 ,  2.20 ] ,
    [   0.12 , 22.50 ,  1.05 ] ,
    [   0.12 , 15.00 ,  1.35 ] ,
    [   0.12 ,  2.50 ,  2.35 ] ,
    [   0.13 , 22.50 ,  1.30 ] ,
    [   0.13 , 15.00 ,  1.55 ] ,
    [   0.13 ,  2.50 ,  2.65 ] ,
    [   0.14 , 30.00 ,  1.10 ] ,
    [   0.14 , 22.50 ,  1.25 ] ,
    [   0.14 , 15.00 ,  1.75 ] ,
    [   0.14 ,  2.50 ,  3.00 ] ,
    [   0.15 , 30.00 ,  1.30 ] ,
    [   0.15 , 22.50 ,  1.50 ] ,
    [   0.15 , 15.00 ,  2.00 ] ,
    [   0.15 ,  2.50 ,  3.50 ] ,
    [   0.16 , 30.00 ,  1.35 ] ,
    [   0.16 , 22.50 ,  1.75 ] ,
    [   0.16 , 15.00 ,  2.40 ] ,
    [   0.16 ,  2.50 ,  4.50 ] ,
    [   0.17 , 45.00 ,  1.25 ] ,
    [   0.17 , 30.00 ,  1.75 ] ,
    [   0.17 , 22.50 ,  2.40 ] ,
    [   0.17 , 15.00 ,  3.30 ] ,
    [   0.18 , 53.00 ,  1.00 ] ,
    [   0.18 , 53.00 ,  1.50 ] ,
    [   0.18 , 53.00 ,  2.00 ] ,
    [   0.18 , 53.00 ,  2.50 ] ,
    [   0.18 , 53.00 ,  3.00 ] ,
    [   0.18 , 53.00 ,  3.50 ] ,
    [   0.18 , 53.00 ,  4.00 ] ,
    [   0.18 , 53.00 ,  4.50 ]

   ] ;


  if( pi == 0 )  dc = c_pi ;

  if( bt == 0 )  dc = c_bt ;

  if( kh == 0 )  dc = c_kh ;


  ix = tayloru.length ;

  for( i = 0; i < ix; ++i )
   {


    for( d = 0 , k = 0; k < kx; ++k )

      if( k != dc )
       {

        dr = ( dv[k] - tayloru[i][k] ) ;

        d  += ( dr * dr ) ;

       } ; // end if{} -



    d = Math.sqrt( d ) ;


    for( c = true , dx = 0 , dj = 0 , j = 0; (c && (j < jx)); ++j )

      if( r[j][c_d] == undefined )
       {

        c  = false ;

        dj = j ;

       } // end if{} +

      else if( r[j][c_d] > dx )
       {
    
        dx = r[j][c_d] ;

        dj = j ;

       } ; // end if{} -


    if( (c == false) || (d < dx) )
     {

      r[dj][c_d]  = d ;

      r[dj][c_pi] = tayloru[i][c_pi] ;
      r[dj][c_bt] = tayloru[i][c_bt] ;
      r[dj][c_kh] = tayloru[i][c_kh] ;

     } ; // end if{} -


   } ; // end for()


  for( c = true , dr = 0 , ds = 0 , j = 0; (c && (j < jx)); ++j )
  
    if( r[j][c_d] == 0 )
     {
 
      dr = r[j][dc] ;

      c  = false ;

     } // end if{} +

    else
     {

      dn = Math.pow( r[j][c_d] , n ) ;

      dr += ( r[j][dc] / dn ) ;

      ds += ( 1.0 / dn ) ;

     } ; // end else


  if( c )  dr /= ds ;


  if( pi == 0 )  pi = dr ;

  if( bt == 0 )  bt = dr ;

  if( kh == 0 )  kh = dr ;


  return( [ r , [ pi , bt , kh ] ] ) ;


 } ; // end function TaylorU()



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

