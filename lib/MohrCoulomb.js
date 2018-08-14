
class MohrCoulomb
 {


  constructor( k , nu , g , e , phi , c , psi , sigt )
   {

    this.k    = k ;
    this.nu   = nu ;
    this.g    = g ;
    this.e    = e ;
    this.phi  = e ;
    this.c    = e ;
    this.psi  = e ;
    this.sigt = e ;

   } ; // end function constructor()


  step( si , dedt , vi , sf , vf , dt )
   {

    var ds = 1.0 ;

    sf = ( si + (ds * dt) ) ;

    return( sf ) ;

   } ; // end function step()


 } // end class MohrCoulomb() ;


module.exports = { MohrCoulomb: MohrCoulomb } ;


