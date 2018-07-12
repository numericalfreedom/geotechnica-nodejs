

class Orthotropic
 {

  constructor( dd , density , dip , e1 , e2 , e3 , g12 , g13 , g23 , nu12 , nu13 , nu23 , nx , ny , nz , rot )
   {

    this.dd      = dd ;
    this.density = density ;
    this.dip     = dip ;
    this.e1      = e1 ;
    this.e2      = e2 ;
    this.e3      = e3 ;
    this.g12     = g12 ;
    this.g13     = g13 ;
    this.g23     = g23 ;
    this.nu12    = nu12 ;
    this.nu13    = nu13 ;
    this.nu23    = nu23 ;
    this.nx      = nx ;
    this.ny      = ny ;
    this.nz      = nz ;
    this.rot     = rot ;

   } // end constructor() ;


  step( si , dedt , vi , sf , vf , dt )
   {

    var ds = 1.0 ;

    sf = ( si + (ds * dt) ) ;

    return( sf ) ;

   } ; // end function step()


 } ; // end class Orthotropic


module.exports = { Orthotropic: Orthotropic } ;


