 
 

function Regulafalsi()
 {
  
  this.n  = 0;
  this.x  = 0;
  this.ll = undefined;
  this.rr = undefined;
  this.dl = undefined;
  this.dr = undefined;
  
  this.s  = s;
   
 }; // end function Regulafalsi()



function s( f , d )
 {
 
  if( (! this.ll) || ((d * this.dl) > 0) )
 
   this.ll = f , this.dl = d;
  
  else

   if( (! this.rr) || ((d * this.dr) > 0) )
   
    this.rr = f , this.dr = d;
   
  if( this.dl && this.dr && (this.ll != this.rr) && (this.dl != this.dr) )
   {
   
    f = ( this.ll - (this.dl * ((this.rr - this.ll) / (this.dr - this.dl))) );
    
    if( f && (f < this.n) )  f = this.n;
    
    if( f && (f > this.x) )  f = this.x;
    
   } // end if() +
   
  else

   f = ( this.n + ((this.x - this.n) * Math.random()) );

  return( f );
  
 }; // end function s()



function pheq( qc , sv , bt )
 {

  if( ! bt )  var bt = 0;

  var qcsv = undefined;

  var ph   =    0;
  var phn  =    0;
  var phx  =   45;
  var phd  = undefined;
  
  var i    =   0;
  var e    = 1.0e-5;
  var n    = 100;
  
  var R    = new Regulafalsi();
  
  R.n      =  0;
  R.x      = 45;

  if( sv )
  
   for( i = 0 , ph = 0 , phd = 1 , qcsv = ( qc / sv ); ((i < n) && (Math.abs( phd ) > e)); ++i )

    phd = ( nq( ph , bt ) - qcsv ) , ph = R.s( ph , phd );

  return( ph );
  
 }; // end function pheq()
 
 
 
function nq( ph , bt )
 {
 
  var pirad = ( Math.PI / 180.0 );
  
  var phr   = ( ph * pirad );
  var btr   = ( bt * pirad );
   
  return( Math.exp( (Math.PI - (2 * btr)) * Math.tan( phr ) ) * ((1 + Math.sin( phr )) / (1 - Math.sin( phr ))) );
 
 }; // end function nq()


print( "phieq_min=" , pheq( 150691 , 20000 , -15 ) );
print( "phieq_max=" , pheq( 150691 , 20000 ,  15 ) );




