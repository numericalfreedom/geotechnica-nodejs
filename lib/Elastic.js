

module.exports = { Elastic: Elastic } ;


function Elastic( k , nu , g , e )
 {

  this.k  = k ;
  this.nu = nu ;
  this.g  = g ;
  this.e  = e ;

  this.step = ElasticStep ;

 } // end function Elastic() ;


function ElasticStep( si , dedt , vi , sf , vf , dt )
 {

  var ds = 1.0 ;

  sf = ( si + (ds * dt) ) ;

  return( sf ) ;

 }


