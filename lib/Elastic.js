
class Elastic
 {


  constructor( k , nu , g , e )
   {

    this.k  = k ;
    this.nu = nu ;
    this.g  = g ;
    this.e  = e ;

   } ; // End constructor


  step( si , dedt , vi , sf , vf , dt )
   {

    var ds = 1.0 ;

    sf = ( si + (ds * dt) ) ;

    return( sf ) ;

   }; // end step()


 } // end class Elastic() ;


module.exports = { Elastic: Elastic } ;


