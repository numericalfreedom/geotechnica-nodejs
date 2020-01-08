
let  p  = undefined ;
let  ps = [ 0.0 , 1.0e7 , 0.0 , 2.0e7 , 0.0 , 3.0e7 , 0.0 , 4.0e7 , 0.0 , 5.0e7 , 0.0 ] ;

let  de  = undefined ;
let  dp  = 1.0e3 ;
let  dps = undefined ;

let  e   = 0.0 ;
let  eel = 0.0 ;
let  epl = 0.0 ;

let  k   = undefined ;

let  kr  = 1.0e4 ;
let  pc  = 0.0 ;
let  pr  = 1.0e5 ;

let  mp  = 0.50 ;
let  mr  = 0.60 ;
let  n   = 0.50 ;
let  r   = 2.00 ;

let  i   = undefined ;


for( i = 0 , ii = 1 ; (i < (ps.length - 1)) ; ++i , ++ii )

 for( p = ps[i] , dps = (dp * Math.sign( ps[ii] - ps[i] )) ; p != ps[ii] ; p += dps )
  {

   if( pc < p )
    {

     k  = ( kr * pr * Math.pow( ((p + (n * (pc = p)) + pr) / pr) , mp ) ) ;

     if( mr != 1.0 )

      epl = ( e - (eel = ((Math.pow( ((pc + (n * pc) + pr) / pr) , (1 - mr) ) - Math.pow( (((n * pc) + pr) / pr) , (1 - mr) )) / (r * kr * (1 - mr)))) ) ;

     else

      epl = ( e - (eel = (Math.log( (pc + (n * pc) + pr) / ((n * pc) + pr) ) / (r * kr))) ) ;

    } // end if +

   else
    {

     k = ( r * kr * pr * Math.pow( ((p + (n * pc) + pr) / pr) , mr ) ) ;

    } // end else

   de = ( dps / k ) ;

   e += de ;

   console.log( p , pc , k , e , eel , epl ) ;

  } ; // end for()

