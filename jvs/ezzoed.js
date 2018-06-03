function ezzoed( sn , sx , v , w , pr , pn )
 {
  
  var ezz = 0;

  if( sx <= sn )
  
    ezz = 0;
    
  else

    if( w == 0 ) 
  
      ezz = ( (sx - sn) / ( v * pr ) );

    else
  
      if( w == 1 ) 

        ezz = ( (1 / v) * Math.log( (pn + sx) / (pn + sn) ) );
 
      else

        ezz = ( (Math.pow( ((pn + sx) / pr) , (1 - w) ) - Math.pow( ((pn + sn) / pr) , (1 - w) )) / (v * (1 - w)) );

  return( ezz );

 }; // end function ' ezzoed()


console.log( process.argv[0] , process.argv[1] , process.argv[2] , process.argv[3] ) ;

