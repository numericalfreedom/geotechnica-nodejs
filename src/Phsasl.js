

class Phsasl
 {


  constructor( cc , a , b , h , t , s , ph , ap , m )
   {

    const d_0_0   = 0.00   ;

    this.cc  = cc ;
    this.a   = a ;
    this.b   = b ;
    this.h   = h ;
    this.t   = t ;
    this.s   = s ;
    this.ph  = ph ;
    this.ap  = ap ;
    this.m   = m ;

    this.hx  = d_0_0;
    this.vh  = d_0_0;
    this.vc  = d_0_0;
    this.vt  = d_0_0;
    this.vs  = d_0_0;

   }


  meier()
   {

    const b_0     = 0 ;
    const b_1     = 1 ;
    const b_2     = 2 ;
    const b_3     = 3 ;
    const b_4     = 4 ;

    const d_0     = 1.0e-8 ;
    const d_0_0   = 0.00   ;
    const d_1     = 1.00   ;
    const d_2     = 2.00   ;
    const d_1_5   = 1.50   ;
    const d_3     = 3.00   ;
    const d_2__3  = ( d_2 / d_3 );
    const d_3__2  = ( d_3 / d_2 );
    const d_4     = 4.00   ;
    const d_4__pi = ( d_4 / Math.PI );
    const d_pi__4 = ( Math.PI / d_4 );
    const d_180   = 180.00 ;

    const phr    = ( (this.ph / d_180) * Math.PI );
    const tphr   = Math.tan( phr );

    var   hbtphr     = d_0;
    var   hbtphr__2  = d_0;
    var   hbtphr2__3 = d_0;

    this.hx     = d_0_0;

    hbtphr = ( this.h / (this.a * tphr) );

    if( (this.cc == b_1) || (this.cc == b_2) )
     {

      hbtphr__2  = ( hbtphr / d_2 );

      this.hx  = ( (this.h / (this.s - d_1)) * (d_1 + hbtphr__2) );

      this.vh  = ( d_2 * this.a * this.h * this.b );

      this.vh += ( (this.h * this.h * this.b) / tphr );

      this.vt  = ( d_2 * this.a * this.t * this.b );

     }

    else if ( (this.cc == b_3) || (this.cc == b_4) )
     {

      hbtphr2__3 = ( (hbtphr * hbtphr) / d_3 );

      this.hx  = ( (this.h / (this.s - d_1)) * (d_1 + hbtphr + hbtphr2__3) );

      this.vh  = (  Math.PI * this.a * this.a * this.h );

      this.vh += ( (Math.PI * this.a * this.h * this.h) / tphr );

      this.vh += ( (Math.PI * this.h * this.h * this.h) / (d_3 * tphr * tphr) );

      this.vt  = (  Math.PI * this.a * this.a * this.t );

     }

    else
     {
	 
      this.vs  = this.hx = d_0_0 ;

     }


    if( this.cc == b_1 )
     {
	 
      this.hx *= d_4__pi;
      
      this.vt *= d_pi__4;

     }
	 
    else if( cc == b_3 )
     {

      this.hx *= d_3__2;

      this.vt *= d_2__3;

     }

    this.vs = ( ((this.vh + this.vt) / this.s) - this.vt );

   }


  tamaskovics()
   {

    const b_0      = 0 ;
    const b_1      = 1 ;
    const b_2      = 2 ;
    const b_3      = 3 ;
    const b_4      = 4 ;

    const d_0      = 1.0e-8 ;
    const d_0_0    = 0.00   ;
    const d_1      = 1.00   ;
    const d_2      = 2.00   ;
    const d_1_5    = 1.50   ;
    const d_3      = 3.00   ;
    const d_2__3   = ( d_2 / d_3 );
    const d_3__2   = ( d_3 / d_2 );
    const d_4      = 4.00   ;
    const d_4__pi  = ( d_4 / Math.PI );
    const d_pi__2  = ( Math.PI / d_2 );
    const d_pi__4  = ( Math.PI / d_4 );
    const d_180    = 180.00 ;

    const d_apr      = ( (this.ap / d_180) * Math.PI );
    const d_phr      = ( (this.ph / d_180) * Math.PI );

    const d_sapr     = Math.sin( d_apr );
    const d_capr     = Math.cos( d_apr );
    const d_cphr     = Math.cos( d_phr );
    const d_tphr     = Math.tan( d_phr );

    const d_sphrmapr = Math.sin( d_phr - d_apr );
    const d_sphrpapr = Math.sin( d_phr + d_apr );
    const d_tphrmapr = Math.tan( d_phr - d_apr );
    const d_tphrpapr = Math.tan( d_phr + d_apr );

    var d_d0 = ( (d_2 * this.a) * ((d_sphrmapr * d_sphrpapr) / ((d_cphr * d_sphrmapr) + (d_cphr * d_sphrpapr))) );

    var d_a0 = this.a;

    var d_c0 = ( ((d_d0 * d_cphr) / d_sphrmapr) - d_a0 );
    var d_r0 = ( (d_d0 + (d_c0 * d_sapr)) / d_tphr );
    var d_b0 = Math.sqrt( (d_r0 * d_r0) - (d_c0 * d_c0 * d_capr * d_capr) );

    var d_d1 = ( d_d0 + (this.h / d_capr) );
    var d_a1 = ( (d_d1 / d_2) * ((d_cphr / d_sphrmapr) + (d_cphr / d_sphrpapr)) );
  
    var d_c1 = ( ((d_d1 * d_cphr) / d_sphrmapr) - d_a1 );
    var d_r1 = ( (d_d1 + (d_c1 * d_sapr)) / d_tphr );
    var d_b1 = Math.sqrt( (d_r1 * d_r1) - (d_c1 * d_c1 * d_capr * d_capr) );

    if( this.cc == b_1 )
     {
    
      this.hx = ( ((d_a1 * d_d1) - (d_a0 * d_d0)) / (d_2 * d_a0 * (this.s - d_1)) );
    
      this.vh = ( ((d_a1 * d_d1) - (d_a0 * d_d0)) * this.b * d_capr );

      this.vc = ( d_2 * d_a0 * d_a0 * this.b * d_sapr * d_capr );

      this.vt = ( d_2 * d_a0 * d_capr * (this.t - (d_a0 * d_sapr)) * this.b );

     }

    else if( this.cc == b_2 )
     {

      this.hx = ( (d_2 * ((d_a1 * d_d1) - (d_a0 * d_d0))) / (Math.PI * d_a0 * (this.s - d_1)) );

      this.vh = ( ((d_a1 * d_d1) - (d_a0 * d_d0)) * this.b * d_capr );

      this.vc = ( d_2 * d_a0 * d_a0 * this.b * d_sapr * d_capr );

      this.vt = ( (Math.PI * d_a0 * d_capr * (this.t - (d_a0 * d_sapr)) * this.b) / d_2 );

     }

    else if( this.cc == b_3 )
     {

      this.hx = ( ((d_a1 * d_b1 * d_d1) - (d_a0 * d_b0 * d_d0)) / (d_3 * d_a0 * d_b0 * (this.s - d_1)) );

      this.vh = ( (Math.PI * d_capr * ((d_a1 * d_b1 * d_d1) - (d_a0 * d_b0 * d_d0))) / d_3 );

      this.vc = ( Math.PI * d_a0 * d_a0 * d_b0 * d_sapr * d_capr );
      
      this.vt = ( Math.PI * d_a0 * d_b0 * (this.t - (d_a0 * d_sapr)) * d_capr );

     }

    else if( this.cc == b_4 )
     {

      this.hx = ( ((d_a1 * d_b1 * d_d1) - (d_a0 * d_b0 * d_d0)) / (d_2 * d_a0 * d_b0 * (this.s - d_1)) );

      this.vh = ( (Math.PI * d_capr * ((d_a1 * d_b1 * d_d1) - (d_a0 * d_b0 * d_d0))) / d_3 );

      this.vc = ( Math.PI * d_a0 * d_a0 * d_b0 * d_sapr * d_capr );
      
      this.vt = ( (d_2 * Math.PI * d_a0 * d_b0 * (this.t - (d_a0 * d_sapr)) * d_capr) / d_3 );

     }

    this.vs = ( ((this.vt + this.vc + this.vh) / this.s) - (this.vt + this.vc) );

   }

 }


module.exports = { 'Phsasl' : Phsasl } ;


