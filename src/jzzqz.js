
function artanh( x )
 {
 
  return( (Math.log( 1 + x ) - Math.log( 1 - x )) / 2 );
  
 
 }; // end function artanh()


function jzzqz(  a , b , x , y , z , n )
 {
  
  const c_0 = 1e-6;

  var   xi  = undefined;
  var   yi  = undefined;
  var   ii  = undefined;
 
  var   ri  = undefined;
 
  var   jzz   = 0.0;
  var   jzzqz = 0.0;

  if( z < c_0 ) z = c_0;
  
  for( i = 0; i < 4; ++i )
   {  
   
    switch( i )
     {
     
      case 0:
       xi  = ( (- a) / 2 );
       yi  = ( (- b) / 2 );
       ii  = (  1 / (4 * Math.PI) );
       break;
    
      case 1:
       xi  = ( (- a) / 2 );
       yi  = ( (  b) / 2 );
       ii  = (- 1 / (4 * Math.PI) );
       break;
  
      case 2:
       xi  = ( (  a) / 2 );
       yi  = ( (  b) / 2 );
       ii  = (  1 / (4 * Math.PI) );
       break;

      case 3:
       xi  = ( (  a) / 2 )
       yi  = ( (- b) / 2 )
       ii  = (- 1 / (4 * Math.PI) )
    
     }; // end switch()
  
    ri     = Math.sqrt( ((x + xi) * (x + xi)) + ((y + yi) * (y + yi)) + (z * z) );
    jzz    = ( 2 * (1 - n) * (((x + xi) * artanh( (y + yi) / ri )) + ((y + yi) * artanh( (x + xi) / ri ))) );
    jzz   -= ( (1 - (2 * n)) * z * Math.atan2( (x + xi) * (y + yi) , (z * ri) ) );
    jzzqz += ( ii * jzz )
   
   }; // end for()

  return( jzzqz );

 }
