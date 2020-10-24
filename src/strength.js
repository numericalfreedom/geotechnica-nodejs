let a = 1.0 ;
let b = 10.0 ;
let c = 0.2 ;
let d = 0.2 ;

a = 1.0e-5 ;
b = 1.0e-7 ;
c =  0.05 ;
d = 500.0 ;


function sh( a , b , c , d , e )
 {
  return( (e / ((a * e) + b)) * ((1.0 + (c * d * e)) / (1.0 + (d * e))) ) ;
 }


function se( a , b , c , d , e )
 {
  return( (e / ((a * e) + b)) - (c * (1.0 - Math.exp( - d * e ))) ) ;
 }


for( e = 0.0; e < 0.1; e += 0.0001 )

  console.log( e.toFixed(4) , sh( a , b , c , d , e ).toFixed(4) ) ;

 
