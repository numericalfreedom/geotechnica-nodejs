

module.exports = { 'FleX_M2D': FleX_M2D } ;


/** FleX_M2D : class for two dimensional mechanical simulation
 *
 *  @constructor
 *  @param {Array} node - Node list
 *  @param {Array} zone - Zone list
 */


function FleX_M2D()
 {

  this.rx         = 0 ;
  this.ry         = 1 ;

  this.sxx        = 0 ;
  this.syy        = 1 ;
  this.szz        = 2 ;
  this.sxy        = 3 ;

  this.exx        = 0 ;
  this.eyy        = 1 ;
  this.ezz        = 2 ;
  this.exy        = 3 ;

  this.node       = undefined ;
  this.edge       = undefined ;
  this.face       = undefined ;
  this.zone       = undefined ;
  this.body       = undefined ;

  this.contact    = undefined ;
  this.behaviour  = undefined ;
  this.fixity     = undefined ;
  this.history    = undefined ;

  this.initialize = FleX_initialize_M2D ;
  this.step       = FleX_step_M2D ;
  this.cycle      = FleX_step_M2D ;

 }


function FleX_initialize_M2D()
 {

  const ix = 10 ;
  let   i  = undefined ;

  this.node = new Array( ix ) ;

  for( i=0; i<ix; this.node[i++] = new Node_M2D() ) ;

 }


function Node_M2D()
 {

  this.rr = [ undefined , undefined ] ;
  this.r  = [ undefined , undefined ] ;
  this.u  = [ undefined , undefined ] ; 
  this.v  = [ undefined , undefined ] ; 
  this.a  = [ undefined , undefined ] ; 
  this.se = [ undefined , undefined , undefined , undefined ] ;

 }
 

function FleX_step_M2D()
 {

  let ix = this.node.length ;
  let i  = undefined ;
  
  for( i=0; i<ix; ++i )
   {

    let jx = this.node[i].r.length
    let j  = undefined ;

    for( j=0; j<jx; ++j )
     {

      this.node[i].a[j] = ( i + j ) ;
      this.node[i].v[j] = ( i + j ) ;
      this.node[i].u[j] = ( i + j ) ;

     }; // end for()
     
   }; // end for()

 };

