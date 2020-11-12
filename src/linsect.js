

function LinSect( a1 , b1 , a2 , b2 )
 {
 
  const r_x = 0;
  const r_y = 1;
  const r_r = 2;

  var   r   = new Array( r_r );
  
  if( a1 != a2 )
   {

    r[r_x] = ( (b2 - b1) / (a1 - a2) );
    
    r[r_y] = ( (a1 * r[r_x]) + b1 );
    
   } // end if +
   
  else  r[r_x] = r[r_y] = 0;

  return( r );
 
 }; // end function LinSect()
