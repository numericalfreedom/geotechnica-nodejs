

module.exports = { 'FleX_M2D': FleX_M2D } ;


/**
 * Constant definitions:
 *
 */

const c_x  =  0 ;
const c_y  =  1 ;
const c_z  =  2 ;

const c_xx =  0 ;
const c_yy =  1 ;
const c_zz =  2 ;
const c_xy =  3 ;


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


function initialize_M2D()
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


