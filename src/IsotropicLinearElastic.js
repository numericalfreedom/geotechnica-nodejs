

module.exports = { IsotropicLinearElastic: IsotropicLinearElastic } ;


const t = require( './Tensor.js' ) ;


function IsotropicLinearElastic( k , nu , g , e )
 {

  this.k  = k ;
  this.nu = nu ;
  this.g  = g ;
  this.e  = e ;

  this.step = IsotropicLinearElasticStep ;

 } // end function IsotropicLinearElastic() ;


function IntegrateIsotropicLinearElastic( si , dedt , vi , sf , vf , dt )
 {

  var ds = 1.0 ;

  sf = ( si + (ds * dt) ) ;

  return( sf ) ;

 }


