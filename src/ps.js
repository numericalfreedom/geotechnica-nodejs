/*
#!/usr/bin/js
*/


function fbt( dp , dt , dc )
 {
  
  var bt = ( dp / (dt - dc) );

  return( bt );
 
 } /* end function fbt() */


function fkbt( bt )
 {

  var kbt = ( (1.0 - bt) / (1.0 - (0.475 * bt)) );

  kbt = ( kbt * kbt * kbt * kbt ); 

  return( kbt );

 }; /* end function fkbt() */


function fkep( ep )
 {
 
  var fep = ( 0.843 * Math.log( ep / 0.065 ) );

  return( fep );
  
 } /* end function fkep() */


function fkcv( cs )
 {

  var kvc = ( 1.0 / (1.0 + (2.5 * cs)) );

  return( kvc );

 }; /* end function fkcv() */ 


function si( gmi , eti , a , b , ki , n , bt , kbt , kep , kcv , dp , rhp , rhf , ni , ei , ntm , dtm )
 {

  var s   = 0.0;
  var vpt = 0.0;
  var gmp = 0.0;
  var gmt = 0.0;
  var ett = 0.0;
  var kt  = 0.0;

  var t   = 0.0;

  var i   = 0.0;
  var j   = 0.0;

  console.log( "        t=     gm(t)=     vp(t)=      et(t)=      k(t)=      s(t)="  );

  for( i = 0 , s = 0 , t = 0 , kt = ki; i < ntm; ++i , t += dtm , s += (vpt * dtm) )
   {
  
    for( j = 0 , gmt = gmi; ((j < ni) && (Math.abs( gmt - gmp ) > ei)); ++j )
     {

      gmp = gmt;

      ett = ( kt * Math.pow( gmt , (n - 1) ) );

      vpt = ( (0.545 * (rhp - rhf) * dp * dp * kbt * kep * kcv) / ett );
   
      gmt = ( 0.390 * Math.exp( 6.810 * bt * (vpt / dp) ) );
 
     }; /* end for( j ) */

    ett = ( eti + (a * Math.pow( t , b )) );

    kt  = ( ki * (ett / eti) );
 
    console.log( t.toFixed(8) , gmt.toFixed(8) , vpt.toFixed(8) , ett.toFixed(8) , kt.toFixed(8) , s.toFixed(8) );

   }; /* end for( i ) */
 
  return( s );
 
 }; /* End fuction ieta() */


var gmi =  1.000; // gamma initial value
var eti = 80.000; // eta initial value

var a   =  2.000; // Parameter a
var b   =  0.500; // Parameter b

var ki  =  5.700; // k initial value
var n   =  2.000; // exponent n

var dp  =  0.002; // Particle diameter
var dt  =  0.270; // Tube diameter
var dc  =  0.200; // ? diameter

var cs  =  0.100; // parameter cs
var ep  =  1.000; // parameter ep

var bt  = fbt( dp , dt , dc );
var kbt = fkbt( bt );
var kep = fkep( ep );
var kcv = fkep( cs );

var rhp = 2650.0; // particle density
var rhf = 1100.0; // fluid density

var ni  = 100;    // number of iteration cycles
var ei  = 1.0e-5; // iteration error
var ntm = 10000;  // number of time steps
var dtm = 1.0e-3; // time step

si( gmi , eti , a , b , ki , n , bt , kbt , kep , kcv , dp , rhp , rhf , ni , ei , ntm , dtm );

