

a  = [ 1.1 , 2.3 , 1.7 , 3.4 , 5.6 , 2.8 , 4.7 , 6.5 , 1.5 , 2.3 , 3.5 , 5.7 ];

as = new Array( 12 ) ;

an = new Array( 10 ) ;


for( i = 0; i<an.length; ++i ) an[i] = 0 ;


for( i = 0; i<a.length; ++i )
{
 ia = Math.floor( a[i] - 1.1 ) ;
 console.log( ia ) ;
 ++an[ia] ;
} ;

console.log( an ) ;

for( i = 1; i<an.length; ++i )  an[i] += an[i-1] ;

console.log( an ) ;

for( i = 0; i<a.length; ++i )
{
 ia = Math.floor( a[i] - 1.1 ) ;
 console.log( ia , an[ia] ) ;
 as[--an[ia]] = a[i] ;
} ;


console.log( a  ) ;

console.log( an ) ;

console.log( as ) ;


