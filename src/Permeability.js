 
function isNumeric(n)
 {

  return( !isNaN(parseFloat(n)) && isFinite(n) );
 
 }; // end function isNumeric()


function linear( y , yn , yp , xn , xp )
 {
 
  var x = ( xp + ((y - yp) * ((xn - xp) / (yn - yp))) );

  return( x )
  
 }; // end function linear()


function permeability( d , q )
 {
 
  const i_0       =     0;
  const i_1       =     1;
  
  const d_0_0     =     0.0;
  const d_0_06    =     0.06;
  const d_0_6     =     0.6;
  const d_0_8     =     0.8;
  const d__1_0    = (-  1.0 );
  const d_1_0     =     1.0;
  const d_1_0_e_6 =     1.0e-6;
  const d_1_0_e6  =     1.0e6;
  const d_1_3     =     1.3;
  const d_1_5     =     1.5;
  const d_1_8     =     1.8;
  const d_2_0     =     2.0;
  const d_2_3     =     2.3;
  const d_3_5_e_3 =     3.5e-3;
  const d_4_8_e_4 =     4.8e-4;
  const d_6_0_e_4 =     6.0e-4;
  const d_7_32    =     7.32;
  const d_10_0    =    10.0;
  const d_10_2    =    10.2;
  const d_10_06   =    10.06;
  const d_12_5    =    12.5;
  const d_17_0    =    17.0;
  const d_20_0    =    20.0;
  const d_30_0    =    30.0;
  const d_40_0    =    40.0;
  const d_50_0    =    50.0;
  const d_60_0    =    60.0;
  const d_100_0   =   100.0;
  const d_118_54  =   118.54;
  const d_500_0   =   500.0;
  const d_1000_0  =  1000.0;
  const d_1300_0  =  1300.0;
  const d_1500_0  =  1500.0;
  const d_86400_0 = 86400.0;
  
  const ix        = q[0].length;

  const chazenmin = d_1_0;
  const chazenmax = d_1_5;
  const g         = d_10_0;
  const nu        = d_1_0;
 
  var   i         = i_0;
  var   s         = d_0_0;

  var   d10       = d_0_0;
  var   d17       = d_0_0;
  var   d20       = d_0_0;
  var   d30       = d_0_0;
  var   d50       = d_0_0;
  var   d60       = d_0_0;

  var   q10       = d_10_0;
  var   q17       = d_17_0;
  var   q20       = d_20_0;
  var   q30       = d_30_0;
  var   q50       = d_50_0;
  var   q60       = d_60_0;

  var   cu        = d_0_0;
  var   cc        = d_0_0;
  
  var   gcu       = d_0_0;
  var   e         = d_0_0;
  var   ecu       = d_0_0;

  var   di0       = d_0_0;

  var   kfhazenmin      = d_0_0;
  var   kfhazenmax      = d_0_0;
  var   kfgustafson     = d_0_0;
  var   kfsalarashayeri = d_0_0;
  var   kfalyamani      = d_0_0;
  var   kfbeyer         = d_0_0;
  var   kfpavchich      = d_0_0;
  var   kfusbr          = d_0_0;
  

  for( i=i_0; i<ix; ++i )
   {

    if( i == i_0 )
     {

      if( isNumeric( d[0][i] ) && isNumeric( q[0][i] ) )
       {
        
        if( q[0][i] >= d_10_0 )
         {
       
          d10 = ( q10 * (d[0][i] / q[0][i]) );

         }; // end if -

        if( q[0][i] >= d_17_0 )
         {
       
          d17 = ( q17 * (d[0][i] / q[0][i]) );

         }; // end if -

        if( q[0][i] >= d_20_0 )
         {
       
          d20 = ( q20 * (d[0][i] / q[0][i]) );

         }; // end if -

        if( q[0][i] >= d_30_0 )
         {
       
          d30 = ( q30 * (d[0][i] / q[0][i]) );

         }; // end if -

        if( q[0][i] >= d_50_0 )
         {
       
          d50 = ( q50 * (d[0][i] / q[0][i]) );

         }; // end if -

        if( q[0][i] >= d_60_0 )
         {
       
          d60 = ( q60 * (d[0][i] / q[0][i]) );

         }; // end if -
         
       }; // end if
       
     } // end if +
     
    else
     {


      if( isNumeric( d[0][i-i_1] ) && isNumeric( d[0][i] ) && isNumeric( q[0][i-i_1] ) && isNumeric( q[0][i] ) )
       {


        if( (q[0][i-i_1] < d_10_0) && (q[0][i] >= d_10_0) )
         
          d10 = linear( q10 , q[0][i] , q[0][i-i_1] , d[0][i] , d[0][i-i_1] );
          

        if( (q[0][i-i_1] < d_17_0) && (q[0][i] >= d_17_0) )

          d17 = linear( q17 , q[0][i] , q[0][i-i_1] , d[0][i] , d[0][i-i_1] );


        if( (q[0][i-i_1] < d_20_0) && (q[0][i] >= d_20_0) )

          d20 = linear( q20 , q[0][i] , q[0][i-i_1] , d[0][i] , d[0][i-i_1] );


        if( (q[0][i-i_1] < d_30_0) && (q[0][i] >= d_30_0) )

          d30 = linear( q30 , q[0][i] , q[0][i-i_1] , d[0][i] , d[0][i-i_1] );


        if( (q[0][i-i_1] < d_50_0) && (q[0][i] >= d_50_0) )
        
          d50 = linear( q50 , q[0][i] , q[0][i-i_1] , d[0][i] , d[0][i-i_1] );

       
        if( (q[0][i-i_1] < d_60_0) && (q[0][i] >= d_60_0) )

          d60 = linear( q60 , q[0][i] , q[0][i-i_1] , d[0][i] , d[0][i-i_1] );


       }; // end if
       
     }; // end else
   
   }; // end for( i )


  kfhazenmin = ( (chazenmin * d10 * d10) / d_100_0 );
  
  kfhazenmax = ( (chazenmax * d10 * d10) / d_100_0 );


  cu  = ( d60 / d10 );
  
  cc  = ( (d30 * d30) / (d60 * d10) );

  gcu = ( (d_1_3 / (Math.log( cu ) * Math.LOG10E)) * (((cu * cu) - d_1_0) / Math.pow( cu , d_1_8 )) );

  e   = ( (d_0_8 / (d_2_0 * Math.log( cu ))) - (d_1_0 / ((cu * cu) - d_1_0)) );

  ecu = ( d_10_2 * d_1_0_e6 * ((e * e * e) / (d_1_0 + e)) * (d_1_0 / (gcu * gcu)) );

  kfgustafson = ( ecu * ((d10 * d10) / d_1_0_e6) );


  kfsalarashayeri = ( (d_10_06 + (d_118_54 * d10) - (d_12_5 * d50) - (d_7_32 * d60)) / d_86400_0 );


  di0  = linear( d_0_0 , q50 , q10 , d50 , d10 );
  
  di0  = ( di0 + ((d50 - d10) / (q50 - q10)) );

  kfalyamani = ( d_1300_0 * di0 * di0 / d_86400_0 );


  kfbeyer = ( d_6_0_e_4 * (g / nu) * Math.log( d_500_0 / cu ) * d10 * d10 );

  if( (d10 < d_0_06) || (d10 > d_0_6) )  kfbeyer *= d__1_0;
  
  
  kfpavchich = ( d_3_5_e_3 * d17 * d17 );

  if( (d17 < d_0_06) || (d17 > d_1_5) )  kfpavchich *= d__1_0;
 
 
  kfusbr = ( d_4_8_e_4 * (g / nu) * Math.pow( d20 , d_2_3 ) );


  return( [[ d10 , d17 , d30 , d50 , d60 , di0 , cu , cc , kfhazenmin , kfhazenmax , kfgustafson , kfsalarashayeri , kfalyamani , kfbeyer , kfpavchich , kfusbr ]] );


 }; // end function permebility()
