

module.exports = { IsotropicLinearElastic: IsotropicLinearElastic } ;


const t = require( './Tensor.js' ) ;


function IsotropicLinearElastic( bulk , poisson , shear , young )
 {

  this.bulk    = bulk ;
  this.poisson = poisson ;
  this.shear   = shear ;
  this.young   = young ;

  this.integrate = IntegrateIsotropicLinearElastic ;

 } // end function IsotropicLinearElastic() ;


function IntegrateIsotropicLinearElastic( si , dedt , vi , sf , vf , dt )
 {

  var ds = 1.0 ;

  sf = ( si + (ds * dt) ) ;

  return( sf ) ;

 }


