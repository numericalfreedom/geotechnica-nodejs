
class Transversal
 {

  constructor( dd , density , dip , e1 , e3 , g13 , nu12 , nu13 )
   {

    this.dd      = dd ;
    this.density = density ;
    this.dip     = dip ;
    this.e1      = e1 ;
    this.e3      = e3 ;
    this.g13     = g13 ;
    this.nu12    = nu12 ;
    this.nu13    = nu13 ;

   } // end constructor() ;


  step( si , dedt , vi , sf , vf , dt )
   {

    var ds = 1.0 ;

    sf = ( si + (ds * dt) ) ;

    return( sf ) ;

   } ; // end step()

 } ; // end class Transversal


module.exports = { Transversal: Transversal } ;


