
function izzqz( a , b , x , y , z )
 {

  const c_0 = 1e-6;
  
  var   rr = new Array( 1 );
  
  var   r   = new Array( 5 );
  
  var   xi  = undefined;
  var   yi  = undefined;
  var   ii  = undefined;
 
  var   ri  = undefined;
 
  var   izz   = 0.0;
  var   izzqz = 0.0;

  rr[0] = r ;

  if( z < c_0 ) z = c_0;
  
  for( i = 0; i < 4; ++i )
   {  
   
    switch( i )
     {
     
      case 0:
       xi  = ( (- a) / 2 );
       yi  = ( (- b) / 2 );
       ii  = (  1 / (2 * Math.PI) );
       break;
    
      case 1:
       xi  = ( (- a) / 2 );
       yi  = ( (  b) / 2 );
       ii  = (- 1 / (2 * Math.PI) );
       break;
  
      case 2:
       xi  = ( (  a) / 2 );
       yi  = ( (  b) / 2 );
       ii  = (  1 / (2 * Math.PI) );
       break;

      case 3:
       xi  = ( (  a) / 2 )
       yi  = ( (- b) / 2 )
       ii  = (- 1 / (2 * Math.PI) )
    
     }; // end switch()
    
    ri   = Math.sqrt( ((x + xi) * (x + xi)) + ((y + yi) * (y + yi)) + (z * z) );
    izz  = ( 1 / (((x + xi) * (x + xi)) + (z * z)) );
    izz += ( 1 / (((y + yi) * (y + yi)) + (z * z)) );
    izz *= ( ((x + xi) * (y + yi) * z) / ri );
    izz += Math.atan2( ((x + xi) * (y + yi)) , (z * ri) );
    
    r[i] = ( ii * izz );

    izzqz += ( ii * izz )
   
   }; // end for()

  r[4] = izzqz;

  return( rr );
  
 }; // end function izzqz()
