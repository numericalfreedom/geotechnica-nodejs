

module.exports = { 'FleX_solve_M2D': FleX_solve_M2D } ;


/** FleX_M2D : class for two dimensional mechanical simulation
 *
 *  @constructor
 *  @param {Array} node - Node list
 *  @param {Array} zone - Zone list
 */

function FleX_solve_M2D()
 {

  this.rx         = 0 ;
  this.ry         = 1 ;

  this.sxx        = 0 ;
  this.syy        = 1 ;
  this.szz        = 2 ;
  this.sxy        = 3 ;

  this.exx        = 0 ;
  this.eyy        = 1 ;
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

  this.initialize = initialize_M2D ;

 }

