

module.exports = { iqz } ;


function iqz( a , b , x , y , z , nu )
 {

  const c_0 = 1e-6;
  
  var   xi     = undefined ;
  var   yi     = undefined ;
  var   ii     = undefined ;

  var   i      = undefined ;
 
  var   ixy1   = 0.0;

  var   rixyqz = 0.0;

  var   jxqz1  = 0.0;
  var   jxqz2  = 0.0;
  var   jxqz3  = 0.0;
  var   jxqz4  = 0.0;
  var   jxqz5  = 0.0;

  var   rjxqz  = 0.0


  if( z < c_0 ) z = c_0;

  
  for( i = 0; i < 4; ++i )
   {  
   
    switch( i )
     {
     
      case 0:
       xi  = ( (- a) / 2 );
       yi  = ( (- b) / 2 );
       ii  = (-  1 / (2 * Math.PI) ) ;
       break;
    
      case 1:
       xi  = ( (- a) / 2 );
       yi  = ( (  b) / 2 );
       ii  = (   1 / (2 * Math.PI) ) ;
       break;
  
      case 2:
       xi  = ( (  a) / 2 );
       yi  = ( (  b) / 2 );
       ii  = (-  1 / (2 * Math.PI) ) ;
       break;

      case 3:
       xi  = ( (  a) / 2 )
       yi  = ( (- b) / 2 )
       ii  = (   1 / (2 * Math.PI) ) ;
 
     }; // end switch()


    if( ((x + xi) > 0) && ((x + xi) > 0) )
     {
    
      ri      = Math.sqrt( ((x + xi) * (x + xi)) + ((y + yi) * (y + yi)) + (z * z) ) ;

      ixy1    = ( (z / ri) + ((1.0 - (2.0 * nu)) * Math.log( z + ri )) ) ;
    
      rixyqz += ( ii * ixy1 ) ;

      jxqz1   = ( z * Math.atanh( (y + yi) / ri ) ) ;
      jxqz2   = ( (y + yi) * Math.log( z + ri ) ) ;
      jxqz3   = ( (x + xi) * Math.atan( (y + yi) / (x + xi) ) );
      jxqz4   = Math.atan( ((y + yi) * z) / ((x + xi) * ri) );
      jxqz5   = ( (1.0 - (2.0 * nu)) * (jxqz1 + jxqz2 + jxqz3 - jxqz4) );

      rjxqz  -= ( ii * ((jxqz1 + jxqz5) / 2.0) ) ;

      console.log( "jxqz1=" , jxqz1 ) ;
      console.log( "jxqz2=" , jxqz2 ) ;
      console.log( "jxqz3=" , jxqz3 ) ;
      console.log( "jxqz4=" , jxqz4 ) ;
      console.log( "jxqz5=" , jxqz5 ) ;

     }; // end if()

   }; // end for()

  return( [ rixyqz , rjxqz ] );
  
 }; // end function iqz()


// console.log( "iqz=" , iqz( 1.0 , 2.0 , 0.5 , 1.0 , 0.0 , 0.33 ) ) ;

