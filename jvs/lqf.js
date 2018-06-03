
//
// function ulq()
//
// Excess pore water pressure calculation from 
//



function Radians( d )
 {
  var r = ( (d / 180.0) * Math.PI );
  return( r );
 }



function Degrees( r )
 {
  var d = ( (r / Math.PI) * 180.0 );
  return( d );
 }



function peq( ps , psn , ul , phic )
 {
 
  var phicrad = Radians( phic );
 
  var ka   = ( (1 - Math.sin( phicrad )) / (1 + Math.sin( phicrad )) );
 
  var cs   = ( (3 / 2) * ((1 + ka) / (1 + (2 * ka))) );
  var ct   = ( (3 / 2) * ((1 - ka) / (1 + (2 * ka))) );

  var ss   = ( cs * (ps + psn) );
  var st   = ( ct * (ps + psn - ul) );

  var phie = Degrees( Math.asin( st / ss ) );

  return( phie );
 
 }; // end function peq()



function ulf( u , e , s , ps , psn , ec0 , hs , ns , phic )
 {

  var phicrad = Radians( phic );
   
  var ec   = 0;
  var pc   = 0;

  var ka   = 0;
  
  var cs   = 0;
  var ct   = 0;

  var ss   = 0;
  var st   = 0;
  
  var ru   = 0;
  
  var phie = 0;

// Excess porewater pressures from liquefaction logic ULF:
  
  if( u )
   {

    ec = ( e * s );

    if( ec )  pc = (- (hs / 3) * Math.pow( Math.log( ec0 / ec ) , (1 / ns) ) );

    if( pc > 0 )  pc = 0;

    if( pc && (pc > ps) )  u = ( ps - pc );
   
   }; // end if()
   
  ka   = ( (1 - Math.sin( phicrad )) / (1 + Math.sin( phicrad )) );
 
  cs   = ( (3 / 2) * ((1 + ka) / (1 + (2 * ka))) );
  ct   = ( (3 / 2) * ((1 - ka) / (1 + (2 * ka))) );

  ss   = ( cs * (ps + psn) );
  st   = ( ct * (ps + psn - u) );

  phie = Degrees( Math.asin( st / ss ) );

  if( (ps - u) < psn )  ps -= u;  else  ps = psn;

  ru = ( u / (ps + u) );

  return( [ ps , u , ec , s , ru , phie ] );

 }; // end function ulf()



function ulq( u , e , s , ps , psn , ec0 , hs , ns , kf0 , kg0 , phic )
 {

  var phicrad = Radians( phic );

  if( ! kf0 )  var kf0 = 2.200e6;
  if( ! kg0 )  var kg0 = 1.420e2;
  if( ! ec0 )  var ec0 = 0.800e0;
  if( ! hs  )  var hs  = 1.000e6;
  if( ! ns  )  var ns  = 0.250e0;

  var ec =      0;
  var ds =      0;
  var de = (- 1.0e-5 );
  var kf =      0;
  var kg =      0;
  var k  =      0;

  var us   =    0;
  var du   =    0;

  var ka   =    0;

  var cs   =    0;
  var ct   =    0;

  var ss   =    0;
  var st   =    0;

  var ru   =    0;

  var phie =    0;

// Excess porewater pressures from liquefaction logic ULQ:

  var e0 = e;

   us = u;
   if( us )
    {
     while( e > ec )
      {
       if( ec )
        {
         e  += de;
         ds  = ( - s * (de / e) );
         s  += ds;
         if( s > 1 )  s = 1;
         kf  = kf0;
         kg  = ( kg0 + (- u) );
         k   = ( (kf * kg) / (((1 - s) * kf) + (s * kg)) );
         du  = ( k * (de / e) );
         u  += du;
         if( (ps - du) < psn )  ps -= du;
        };
       ec = ( ec0 * Math.exp(- Math.pow( ((- 3.0 * ps) / hs) , ns ) ) );
      };
     u -= us;
    };

   ka   = ( (1 - Math.sin( phicrad )) / (1 + Math.sin( phicrad )) );
 
   cs   = ( (3 / 2) * ((1 + ka) / (1 + (2 * ka))) );
   ct   = ( (3 / 2) * ((1 - ka) / (1 + (2 * ka))) );

   ss   = ( cs * (ps + psn + u) );
   st   = ( ct * (ps + psn) );

   phie = Degrees( Math.asin( st / ss ) );
       
   ru = ( u / (ps + u) );
   
   return( [ ps , u , e , s , ru , phie ] );

 }; // end function ulq()
 
 
 
//   u0  = u;
//   if( u0 )
//    {
//     ec = ( ec0 * Math.exp(- Math.pow( ((- 3.0 * ps) / hs) , ns ) ) );
//     de = ( - (e - ec) / ix );
//     if( de < 0 )
//      for( i=0; i < ix; ++i )
//       {
//        e  += de;
//        ds  = ( - s * (de / e) );
//        s  += ds;
//        if( s > 1 )  s = 1;
//        kf  = kf0;
//        kg  = ( kg0 + (- u) );
//        k   = ( (kf * kg) / (((1 - s) * kf) + (s * kg)) );
//        u  += ( k * (de / (1 + e)) );
//       };
//     u -= u0;
//    };

 
 
 
