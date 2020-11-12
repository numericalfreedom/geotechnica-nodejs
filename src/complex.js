
/**
 * Complex number object constructor:
 *
 */

function Cpx( re , im )
 {

  /* constructor for complex numbers: c=new Complex(re,im); */

  if( ! re )  this.re = 0.0;  else  this.re=re;  // real part
  if( ! im )  this.im = 0.0;  else  this.im=im;  // imaginary part

  this.Re=Re;
  this.Im=Im;

  this.Abs=Abs;
  this.Arg=Arg;

  this.Agc=Agc;

  this.Crt=Crt;
  this.Plr=Plr;

  this.Cmp=Cmp;

  this.Ngt=Ngt;
  this.Cjg=Cjg;
  
  this.Exp=Exp;
  this.Log=Log;
  this.Ln =Ln;
  
  this.Log10=Log10;
  this.Logn =Logn;

  this.Add=Add;
  this.Sub=Sub;
  this.Mul=Mul;
  this.Div=Div;
  
  this.Pow=Pow;
  
  this.Sqr=Sqr;
  this.Cbr=Cbr;
  this.Rtn=Rtn;

  this.Sin=Sin;
  this.Cos=Cos;
  this.Tan=Tan;
  this.Cot=Cot;

  this.Asin=Asin;
  this.Acos=Acos;
  this.Atan=Atan;

  this.Sinh=Sinh;
  this.Cosh=Cosh;
  this.Tanh=Tanh;

  this.Asinh=Asinh;
  this.Acosh=Acosh;
  this.Atanh=Atanh;

 }; //
 

/**
 *
 * Return or set real part of complex number
 *
 */

function Re( re )
 {
 
  var r = undefined;
 
  if( ! re )  r = this.re;  else  this.re = re;
  
  return( r )
 
 }; //


/**
 *
 * Return or set imaginary part of complex number
 *
 */

function Im( im )
 {
 
  var r = undefined;
 
  if( ! im )  r = this.im;  else  this.im = im;

  return( r )
 
 }; //


/**
 *
 * Return of set absolute value of complex number
 *
 */

function Abs( a )
 {
 
  var r = undefined;
  var p = undefined;
  
  if( ! a )
   {
  
    r = Math.sqrt( (this.re * this.re) + (this.im * this.im) );

   }

  else
   {

    p = this.Arg();

    r = new Cpx( (a * Math.sin( p )) , (a * Math.cos( p )) );

   };

  return( r );
 
 }; //


/**
 *
 * Return of set argument value of complex number
 *
 */

function Arg( p )
 {

  var r = undefined;
  var a = undefined;
  
  if( ! p )
   {

    if( this.re != 0.0 )  r = Math.atan2( this.im , this.re );  else  r = ( Math.PI / 2.0 );

    r = this.Agc( r );

   }

  else
   {

    a = this.Abs();

    r = new Cpx( (a * Math.sin( p )) , (a * Math.cos( p )) );

   };

  return( r );
  
 }; //


/**
 *
 * Correct argument value of complex number
 *
 */

function Agc( p )
 {
 
  var r = ( 2.0 * Math.PI );

  if( p > Math.PI )  p -= r;  else if( p < (- Math.PI) )  p += r;

  return( p );  
  
 }; //


/**
 *
 * Build cartesian from polar representation of a complex number
 *
 */
 
function Crt()
 {

  var r = new Cpx( (this.re * Math.cos( this.im )) , (this.re * Math.sin( this.im )) );

  return( r );

}; //


/**
 *
 * Build polar from cartesian representation of a complex number
 *
 */

function Plr()
 {

  var r = new Cpx( (this.Abs()) , (this.Arg()) );

  return( r );

}; //


/**
 *
 * Compare complex numbers
 *
 */

function Cmp( x , y )
 {
 
  var r = undefined;
  
  if( (x.re == y.re) && (x.im == y.im) )  r = 1.0;  else  r = 0.0;
  
  return( r );
  
 }; //


/**
 *
 * Negate complex number
 *
 */

function Ngt()
 {

  var r = new Cpx( (- this.re) , (- this.im) );

  return( r );
  
 }; //


/**
 *
 * Conjugate complex number
 *
 */

function Cjg()
 {

  var r = new Cpx( this.re , (- this.im) );

  return( r );
  
 }; //


/**
 *
 * Exponential value of complex number
 *
 */

function Exp()
 {

  var e = Math.exp( this.re );
  var r = new Cpx( (e * Math.cos( this.im )) , (e * Math.sin( this.im )) );

  return( r );
  
 }; //


/**
 *
 * Main natural logarithm value of complex number
 *
 */

function Log()
 {

  var r = undefined;

  var a = this.Abs();
  var p = this.Arg();
  
  if( a > 0.0 )  r = new Cpx( (Math.log( a )) , p );  else  r = new Cpx( 0.0 , 0.0 );

  return( r );
  
 }; //


/**
 *
 * Main natural logarithm value of complex number (alias)
 *
 */
 
function Ln()
 {

  return( this.Log() );

 }; //


/**
 *
 * Main decimal logarithm value of complex number
 *
 */
 
function Log10()
 {

  var r = new Cpx();

  var q = Math.log( 10 );

  var a = ( this.Abs() / q );
  var p = ( this.Arg() / q );

  if( a > 0.0 )  r = new Cpx( (Math.log( a )) , p );  else  r = new Cpx( 0.0 , 0.0 );

  return( r );
  
 }; //


/**
 *
 * Main nth based logarithm value of complex number
 *
 */
 
function Logn( n )
 {

  var r = new Cpx();

  if( (! n) || (n == 0.0) )  var n = 1.0;

  var q = Math.log( n );

  var a = ( this.Abs() / q );
  var p = ( this.Arg() / q );

  if( a > 0.0 )  r = new Cpx( (Math.log( a )) , p );  else  r = new Cpx( 0.0 , 0.0 );

  return( r );
  
 }; //


/**
 *
 * Add complex numbers
 *
 */
 
function Add( z )
 {

  var r = new Cpx( (this.re + z.re) , (this.im + z.im) );

  return( r );

 }; //


/**
 *
 * Subtract complex numbers
 *
 */

function Sub( z )
 {
 
  var r = new Cpx( (this.re - z.re) , (this.im - z.im) );

  return( r );

 }; //


/**
 *
 * Multiply complex numbers
 *
 */

function Mul( z )
 {
 
  var r = new Cpx( ((this.re * z.re) - (this.im * z.im)) , ((this.re * z.im) + (this.im * z.re)) );

  return( r );

 }; //


/**
 *
 * Divide complex numbers
 *
 */

function Div( z )
 {

  var a = ( (z.re * z.re) + (z.im * z.im) );
 
  var r = new Cpx( (((this.re * z.re) + (this.im + z.im)) / a) , (((this.im * z.re) - (this.re + z.im)) / a) );

  return( r );

 }; //


/**
 *
 * Power of complex numbers
 *
 */

function Pow( z )
 {
 
  var p = undefined;
  var q = undefined;
  var r = undefined;
  
  p = this.Log();
  q = z.Mul( p );
  r = q.Exp();  

  return( r );

 }; //


/**
 *
 * Square root of complex number
 *
 */

function Sqr()
 {

  var p = undefined;
  var r = undefined;

  p = this.Plr();

  p.re  = Math.sqrt( p.re );
  p.im /= 2.0;

  r = p.Crt();  

  return( r );

 }; //


/**
 *
 * Cube root of complex number
 *
 */

function Cbr()
 {

  var p = undefined;
  var r = undefined;

  p = this.Plr();

  p.re  = Math.pow( p.re , (1.0 / 3.0) );
  p.im /= 3.0;

  r = p.Crt();  

  return( r );

 }; //


/**
 *
 * Nth root of complex number (Moivre theorem)
 *
 */

function Rtn( n )
 {

  if( (! n) || (n == 0.0) )  var n = 1.0;

  var p = undefined;
  var r = undefined;

  p = this.Plr();

  p.re  = Math.pow( p.re , (1.0 / n) );
  p.im /= n;

  r = p.Crt();  

  return( r );

 }; //


/**
*
* Sine of a complex number
*
* sin( z ) = ( exp( iz ) - exp( -iz ) ) / 2
*
*/

function Sin()
 {

  var r  = undefined;
  
  var e  = Math.exp( this.im );
  
  var ei = undefined;
  var s  = undefined;
  var c  = undefined;
  
  if( e != 0.0 )
   {
  
    ei = ( 1.0 / e );
    
    s  = Math.sin( this.re );
    c  = Math.cos( this.re );      
    
    r  = new Cpx( ((s * (e + ei)) / 2.0) , ((c * (e - ei)) / 2.0) );
    
   }
   
  else
  
   r  = new Cpx( 0.0 , 0.0 );
  
  return( r );

 }; //

/**
*
* Cosine of a complex number
*
* cos( z ) = ( exp( iz ) + exp( -iz ) ) / 2
*
*/

function Cos()
 {
 
  var r  = undefined;
  
  var e  = Math.exp( this.im );
  
  var ei = undefined;
  var s  = undefined;
  var c  = undefined;
  
  if( e != 0.0 )
   {
  
    ei = ( 1.0 / e );
    
    s  = Math.sin( this.re );
    c  = Math.cos( this.re );      
    
    r  = new Cpx( ((c * (e + ei)) / 2.0) , ((s * (e - ei)) / 2.0) );
    
   }
   
  else
  
   r  = new Cpx( 0.0 , 0.0 );

  return( r );

 }; //


/**
 *
 * Tangent of a complex number
 *
 * tan( z ) = sin( z ) / cos( z )
 *
 */

function Tan()
 {

  var p  = this.Sin();
  var q  = this.Cos();
  var r  = p.Div( q ); 

  return( r );

 }; //


/**
 *
 * Cotangent of a complex number
 *
 * cot( z ) = cos( z ) / sin( z )
 *
 */

function Cot()
 {

  var p  = this.Cos();
  var q  = this.Sin();
  var r  = p.Div( q ); 

  return( r );

 }; //


/**
*
* Arc sine of a complex number:
*
* asin( z ) = -i * log( (i * z) + sqrt(1 - z * z))
*
*/

function Asin()
 {

  var p  = undefined;
  var q  = undefined;
  var r  = undefined;
  
  p = new Cpx( this.re , this.im );
  
  q = this.Mul( p );
  
  p = new Cpx( 1.0 , 0.0 );
  
  r = p.Sub( q );
  
  p = r.Sqr();

  q = new Cpx( (- this.im) , this.re );
  
  r = p.Add( q );
  
  p = r.Log();
  
  r = new Cpx( p.im , (- p.re) );

  return( r );

 }; //
 

/**
*
* Arc cosine of a complex number:
*
* acos( z ) = -i * log(z + sqrt(z * z - 1))
*
*/

function Acos()
 {

  var p  = undefined;
  var q  = undefined;
  var r  = undefined;
  
  p = new Cpx( this.re , this.im );
  
  q = this.Mul( p );
  
  p = new Cpx( 1.0 , 0.0 );
  
  r = q.Sub( p );
  
  p = r.Sqr();
  
  r = this.Add( p );
  
  p = r.Log();
  
  r = new Cpx( p.im , (- p.re) );

  return( r );

 }; //


/**
*
* Arc tangent of a complex number:
*
* atan( z ) = i / 2 * log( (i + z) / (i - z) )
*
*/

function Atan()
 {

  var p  = undefined;
  var q  = undefined;
  var u  = undefined;
  var v  = undefined;
  var r  = undefined;

  p = new Cpx( 0.0 , 1.0 );
  
  q = new Cpx( this.re , this.im );

  u = p.Add( q );
  
  v = p.Sub( q );
  
  p = u.Div( v );
  
  q = p.Log();

  r = new Cpx( (- (q.im / 2.0)) , (q.re / 2.0) );

  return( r );

 }; //


/**
*
* Hyperbolic sine of a complex number
*
* sinh( z ) = (exp(z) - exp(-z)) / 2
*
*/

function Sinh()
 {

  var p  = undefined;
  var q  = undefined;
  var r  = undefined;

  p = this.Exp();

  q = this.Ngt();
  
  r = q.Exp();
  
  q = p.Sub( r );
  
  p = new Cpx( 2.0 , 0.0 );
  
  r = q.Div( p );
  
  return( r );

 }; //


/**
*
* Hyperbolic cosine of a complex number
*
* cosh( z ) = (exp(z) + exp(-z)) / 2
*
*/

function Cosh()
 {

  var p  = undefined;
  var q  = undefined;
  var r  = undefined;

  p = this.Exp();

  q = this.Ngt();
  
  r = q.Exp();
  
  q = p.Add( r );
  
  p = new Cpx( 2.0 , 0.0 );
  
  r = q.Div( p );
  
  return( r );

 }; //


/**
*
* Hyperbolic tangent of a complex number
*
* tanh( z ) = sinh( z ) / cosh( z )
*
*/

function Tanh()
 {

  var p  = undefined;
  var q  = undefined;
  var r  = undefined;

  p = this.Sinh();

  q = this.Cosh();
  
  r = p.Div( q );
  
  return( r );

 }; //


/**
*
* Arc hyperbolic sine of a complex number
*
* asinh( z ) = log( z + sqrt( z*z + 1 ) )
*
*/

function Asinh()
 {

  var p  = undefined;
  var q  = undefined;
  var r  = undefined;
  
  p = new Cpx( this.re , this.im );
  
  q = p.Mul( p );

  p = new Cpx( 1.0 , 0.0 );
  
  r = q.Add( p );
  
  p = r.Sqr();
  
  r = new Cpx( this.re , this.im );
  
  q = p.Add( r );
  
  r = q.Log();  
  
  return( r );

 }; //


/**
*
* Arc hyperbolic cosine of a complex number
*
* acosh( z ) = log( z + sqrt( z*z - 1 ) )
*
*/

function Acosh()
 {

  var p  = undefined;
  var q  = undefined;
  var r  = undefined;
  
  p = new Cpx( this.re , this.im );
  
  q = p.Mul( p );

  p = new Cpx( 1.0 , 0.0 );
  
  r = q.Sub( p );
  
  p = r.Sqr();
  
  r = new Cpx( this.re , this.im );
  
  q = p.Add( r );
  
  r = q.Log();  
  
  return( r );

 }; //


/**
*
* Arc hyperbolic tangent of a complex number
*
* atanh( z ) =  1 / 2 * log( (1+z) / (1-z) )
*
*/

function Atanh()
 {

  var p  = undefined;
  var q  = undefined;
  var r  = undefined;
  var s  = undefined;
  
  p = new Cpx( 1.0 , 0.0 );
  
  q = new Cpx( this.re , this.im );
  
  r = p.Add( q );
  
  s = p.Sub( q );
  
  p = s.Div( r );
  
  q = p.Log();
  
  r = new Cpx( (q.re / 2.0) , (q.im / 2.0) );

  return( r );

 }; //
