
function kr( phir )
 {
  k = ( 1.0 - Math.sin( phir ) ) ;
  return( k ) ;
 }

function ka( phir )
 {
  k = ( (1.0 - Math.sin( phir )) / (1.0 + Math.sin( phir )) ) ;
  return( k ) ;
 }

function kp( phir )
 {
  k = ( (1.0 + Math.sin( phir )) / (1.0 - Math.sin( phir )) ) ;
  return( k ) ;
 }

module.exports = { kr , ka , kp } ;

