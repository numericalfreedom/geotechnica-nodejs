

function deg( r )
 {
  return( (r / Math.PI) * 180.0 );
 }


function rad( d )
 {
  return( (d / 180.0) * Math.PI );
 }


function Onemassoscillator( m , c , k , v0 , u0 , p0 , w0 , f , dt , t )
 {

  this.m      = parseFloat( m  );
  this.c      = parseFloat( c  );
  this.k      = parseFloat( k  );
  
  this.v0     = parseFloat( v0 );
  this.u0     = parseFloat( u0 );
  this.p0     = parseFloat( p0 );
  this.w0     = parseFloat( w0 );
  this.f      = parseFloat( f  );
  
  this.dt     = parseFloat( dt );

  this.t      = parseFloat( t  );

  this.a      = undefined;
  this.v      = undefined;
  this.u      = undefined;
  this.p      = undefined;
  this.q      = undefined;
  
  this.w      = undefined;
  this.wn     = undefined;
  this.fn     = undefined;
  this.delta  = undefined;
  this.cc     = undefined;
  this.d      = undefined;
  this.wd     = undefined;
  this.fd     = undefined;
  this.beta   = undefined;
  this.an     = undefined;
  this.pn     = undefined;
  this.ad     = undefined;
  this.pd     = undefined;
  this.ap     = undefined;
  this.pp     = undefined;
  this.apd    = undefined;
  this.ppd    = undefined;
  this.aw     = undefined;
  this.pw     = undefined;
  this.awd    = undefined;
  this.pwd    = undefined;
  this.aq     = undefined;
  this.pq     = undefined;
  this.p0c    = undefined;
  this.p0cabs = undefined;
  this.p0cphs = undefined;
  this.s0c    = undefined;
  this.s0cabs = undefined;
  this.s0cphs = undefined;
  this.u0c    = undefined;
  this.u0cabs = undefined;
  this.u0cphs = undefined;
  this.q0c    = undefined;
  this.q0cabs = undefined;
  this.q0cphs = undefined;

  this.frequencydomainsolve = frequencydomainsolve;
  this.timedomainsolve      = timedomainsolve;

 } // end function Onemassoscillator
 
 
function frequencydomainsolve()
 {
 
  const r_w      =  0;
  const r_wn     =  1;
  const r_fn     =  2;
  const r_delta  =  3;
  const r_cc     =  4;
  const r_d      =  5;
  const r_wd     =  6;
  const r_fd     =  7;
  const r_beta   =  8;
  const r_an     =  9;
  const r_pn     = 10;
  const r_ad     = 11;
  const r_pd     = 12;
  const r_ap     = 13;
  const r_pp     = 14;
  const r_apd    = 15;
  const r_ppd    = 16;
  const r_aw     = 17;
  const r_pw     = 18;
  const r_awd    = 19;
  const r_pwd    = 20;
  const r_aq     = 21;
  const r_pq     = 22;
  const r_p0cre  = 23;
  const r_p0cim  = 24;
  const r_p0cabs = 25;
  const r_p0cphs = 26;
  const r_s0cre  = 27;
  const r_s0cim  = 28;
  const r_s0cabs = 29;
  const r_s0cphs = 30;
  const r_u0cre  = 31;
  const r_u0cim  = 32;
  const r_u0cabs = 33;
  const r_u0cphs = 34;
  const r_q0cre  = 35;
  const r_q0cim  = 36;
  const r_q0cabs = 37;
  const r_q0cphs = 38;
  const r_size   = 39;

  var r = new Array( r_size );
 
  // Parameters:
  this.w      = ( 2.0 * Math.PI * this.f );
  this.wn     = Math.sqrt( this.k / this.m );
  this.fn     = ( this.wn / (2.0 * Math.PI) );
  this.delta  = ( this.c / (2.0 * this.m) );
  this.cc     = ( 2.0 * Math.sqrt( this.k * this.m ) );
  this.d      = ( this.c / this.cc );
  this.wd     = ( this.wn * Math.sqrt( 1.0 - (this.d * this.d)) );
  this.fd     = ( this.wd / (2.0 * Math.PI) );
  this.beta   = ( this.w / this.wn );

  // Free undamped oscillation:
  this.pn     = deg( Math.atan2( this.v0 , (this.wn * this.u0) ) );
  this.an     = Math.sqrt( (this.u0 * this.u0) + ((this.v0 * this.v0) / (this.wn * this.wn)) );

  // Free damped oscillation:
  this.pd     = deg( Math.atan2( this.v0 + (this.u0 * this.delta) , (this.wd * this.u0) ) );
  this.ad     = Math.sqrt( (this.u0 * this.u0) + (((this.v0 + (this.u0 * this.delta)) * (this.v0 + (this.u0 * this.delta))) / (this.wd * this.wd)) );

  // Force excitation component:
  this.pp     = deg( Math.atan2( 2.0 * this.d * this.beta , (1.0 - (this.beta * this.beta)) ) );
  this.ap     = ( (this.p0 / this.k) * Math.sqrt( 1.0 / (((1.0 - (this.beta * this.beta)) * (1.0 - (this.beta * this.beta))) + ((2.0 * this.d * this.beta) * (2.0 * this.d * this.beta))) ) );

  // Initial conditions for force excitation:
  this.ppd    = deg( Math.atan2( (this.v0 + (this.delta * (this.u0 - (this.ap * Math.cos( this.pp )))) - (this.ap * this.w * Math.sin( this.pp ))) , (this.wd * (this.u0 - (this.ap * Math.cos( this.pp )))) ) );
  this.apd    = ( (this.u0 - (this.ap * Math.cos( this.pp ))) / Math.cos( this.ppd ) );

  // Free-field excitation component:
  this.pw     = deg( Math.atan2( 2.0 * this.d * this.beta * this.beta * this.beta , 1.0 - (this.beta * this.beta) + ((2.0 * this.d * this.beta) * (2.0 * this.d * this.beta)) ) );
  this.aw     = ( this.w0 * Math.sqrt( (1.0 + ((2.0 * this.d * this.beta) * (2.0 * this.d * this.beta))) / (((1.0 - (this.beta * this.beta)) * (1.0 - (this.beta * this.beta))) + ((2.0 * this.d * this.beta) * (2.0 * this.d * this.beta))) ) );

  // Initial conditions for free-field excitation:
  this.pwd    = deg( Math.atan2( (this.v0 + (this.delta * (this.u0 - (this.aw * Math.cos( this.pw )))) - (this.aw * this.w * Math.sin( this.pw ))) , (this.wd * (this.u0 - (this.aw * Math.cos( this.pw )))) ) );
  this.awd    = ( (this.u0 - (this.aw * Math.cos( this.pw ))) / Math.cos( this.pwd ) );

  // Force amplitude:
  this.aq     = ( this.p0 * Math.sqrt( (1.0 + ((2.0 * this.d * this.beta) * (2.0 * this.d * this.beta))) / (((1.0 - (this.beta * this.beta)) * (1.0 - (this.beta * this.beta))) + ((2.0 * this.d * this.beta) * (2.0 * this.d * this.beta))) ) );
  this.pq     = deg( Math.atan2( 2.0 * this.d * this.beta * this.beta * this.beta , 1.0 - (this.beta * this.beta) + ((2.0 * this.d * this.beta) * (2.0 * this.d * this.beta)) ) );

  // Complex harmonic force excitation:  
  this.p0c    = new Cpx( this.p0 , 0 );
  this.p0cabs = this.p0c.Abs();
  this.p0cphs = this.p0c.Arg();

  // Complex dynamic stiffness coefficient:
  this.s0c    = new Cpx( this.k - this.m * this.w * this.w , this.c * this.w );
  this.s0cabs = this.s0c.Abs();
  this.s0cphs = this.s0c.Arg();

  // Complex harmonic displacement:
  this.u0c    = this.p0c.Div( this.s0c );
  this.u0cabs = this.u0c.Abs();
  this.u0cphs = this.u0c.Arg();

  // Complex harmonic force transmission to the subsoil:
  this.q0c    = new Cpx( this.k , this.c * this.w  );
  this.q0c    = this.u0c.Mul( this.q0c );
  this.q0cabs = this.q0c.Abs();
  this.q0cphs = this.q0c.Arg();

  r[r_w]      = this.w; 
  r[r_wn]     = this.wn;
  r[r_fn]     = this.fn;
  r[r_delta]  = this.delta;
  r[r_cc]     = this.cc;
  r[r_d]      = this.d;
  r[r_wd]     = this.wd;
  r[r_fd]     = this.fd;
  r[r_beta]   = this.beta;
  r[r_an]     = this.an;
  r[r_pn]     = this.pn;
  r[r_ad]     = this.ad;
  r[r_pd]     = this.pd;
  r[r_ap]     = this.ap;
  r[r_pp]     = this.pp;
  r[r_apd]    = this.apd;
  r[r_ppd]    = this.ppd;
  r[r_aw]     = this.aw;
  r[r_pw]     = this.pw;
  r[r_awd]    = this.awd;
  r[r_pwd]    = this.pwd;
  r[r_aq]     = this.aq;
  r[r_pq]     = this.pq;
  r[r_p0cre]  = this.p0c.Re();
  r[r_p0cim]  = this.p0c.Im();
  r[r_p0cabs] = this.p0cabs;
  r[r_p0cphs] = this.p0cphs;
  r[r_s0cre]  = this.s0c.Re();
  r[r_s0cim]  = this.s0c.Im();
  r[r_s0cabs] = this.s0cabs;
  r[r_s0cphs] = this.s0cphs;
  r[r_u0cre]  = this.u0c.Re();
  r[r_u0cim]  = this.u0c.Im();
  r[r_u0cabs] = this.u0cabs;
  r[r_u0cphs] = this.u0cphs;
  r[r_q0cre]  = this.q0c.Re();
  r[r_q0cim]  = this.q0c.Im();
  r[r_q0cabs] = this.q0cabs;
  r[r_q0cphs] = this.q0cphs;

  return( r );

 } // end function frequencydomainsolve


function timedomainsolve( m , c , k , p , v , u , dt )
 {
 
  const r_r = 4 ;
  const r_a = 0 ;
  const r_v = 1 ;
  const r_u = 2 ;
  const r_f = 3 ;

  var r = new Array( r_r ) ;
  
  r[r_f] = ( p - ((c * v) + (k * u)) ) ;
  r[r_a] = ( r[r_f] / m ) ;
  r[r_v] = ( v + (r[r_a] * dt) ) ;
  r[r_u] = ( u + (r[r_v] * dt) ) ;

  return( [ r ] );

 } // end function timedomainsolve


function Frequencydomain( x )
 {

  const c_m  = 0;
  const c_c  = 1;
  const c_k  = 2;
  const c_v0 = 3;
  const c_u0 = 4;
  const c_p0 = 5;
  const c_w0 = 6;
  const c_f  = 7;
  const c_dt = 8;
  const c_t  = 9;

  var   m  = x[c_m];
  var   c  = x[c_c];
  var   k  = x[c_k];
  var   v0 = x[c_v0];
  var   u0 = x[c_u0];
  var   p0 = x[c_p0];
  var   w0 = x[c_w0];
  var   f  = x[c_f];
  var   dt = x[c_dt];
  var   t  = x[c_t];

  O = new Onemassoscillator( m , c , k , v0 , u0 , p0 , w0 , f , dt , t );

  return( O.frequencydomainsolve() );

} // end function Frequencydomain


function duffing( dt , ap , bt , dt , x )
 {

  const nt = 10;

  var a   = x[0][0];
  var v   = x[0][1];
  var u   = x[0][2];
 
  var ddt = ( (2.0 * Math.PI) / Math.sqrt( ap + (bt * u * u) ) );
  
  return( ddt );
  
 };
 
 const r_a = 0;
 const r_v = 1;
 const r_u = 2;
 const r_f = 3;
 
 let i  = 0;
 let m  = 1.0e6;
 let c  = 1.0e5;
 let k  = 1.0e8;
 let u0 = 0.10;
 let v0 = 0.01;
 let p  = 0.00;
 let dt = 0.01;
 let t  = 0.0;
 let r  = undefined;
  
 for( i=0 , t=0.0; i<1001; t = (dt * ++i) )
  {
   
   if( i == 0 )

     r = timedomainsolve( m , c , k , p , v0 , u0 , dt ) ;

   else

     r = timedomainsolve( m , c , k , p , r[0][r_v] , r[0][r_u] , dt ) ;

   console.log( t.toPrecision(4) , r[0][r_a].toPrecision(4) , r[0][r_v].toPrecision(4) , r[0][r_u].toPrecision(4) , r[0][r_f].toPrecision(4) ) ;

  }; // end for () -
