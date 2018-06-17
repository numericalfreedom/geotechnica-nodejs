

module.exports = { Transversal: Transversal } ;


function Transversal( dd , density , dip , e1 , e3 , g13 , nu12 , nu13 )
 {

  this.dd      = dd ;
  this.density = density ;
  this.dip     = dip ;
  this.e1      = e1 ;
  this.e3      = e3 ;
  this.g13     = g13 ;
  this.nu12    = nu12 ;
  this.nu13    = nu13 ;

  this.step    = TransversalStep ;

 } // end function Transversal() ;


function TransversalStep( si , dedt , vi , sf , vf , dt )
 {

  var ds = 1.0 ;

  sf = ( si + (ds * dt) ) ;

  return( sf ) ;

 }
