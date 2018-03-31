

module.exports = { ModelM2D , ModelMH2D , ModelM3D } ;


/**
 * Constant definitions:
 *
 */

const nRR =  0 ;
const nR  =  3 ;
const nU  =  6 ;
const nV  =  9 ;
const nA  = 12 ;
const nF  = 15 ;
const nS  = 18 ;
const nPW = 27 ;
const nPN = 28 ;
const nT  = 29 ;


/** ModelM2D : class for two dimensional mechanical simulation
 *
 *  @constructor
 *  @param {Array} nodes - Node list
 *  @param {Array} zones - Zone list
 */

function ModelM2D()
 {

  this.nodes      = undefined ;
  this.zones      = undefined ;
  this.behaviour  = undefined ;
  this.fixity     = undefined ;
  this.history    = undefined ;

  this.initialize = InitializeModelM2D ;

 }


function ModelMH2D()
 {

  this.nodes      = undefined ;
  this.zones      = undefined ;
  this.behaviour  = undefined ;
  this.fixity     = undefined ;
  this.history    = undefined ;

  this.initialize = InitializeModelMH2D ;

 }


function ModelM3D()
 {

  this.nodes      = undefined ;
  this.zones      = undefined ;
  this.behaviour  = undefined ;
  this.fixity     = undefined ;
  this.history    = undefined ;

  this.initialize = InitializeModelM3D ;

 }


function InitializeModelM2D()
 {

  this.nodes     = [ 0 , 1 , 2 , 3 , 4 ] ;
  this.zones     = [ 1 , 2 , 3 , 4 , 5 ] ;
  this.behaviour = [ 2 , 3 , 4 , 5 , 6 ] ;
  this.fixity    = [ 3 , 4 , 5 , 6 , 7 ] ;
  this.history   = [ 4 , 5 , 6 , 7 , 8 ] ;

  console.log( "nRR=" , nRR ) ;
  console.log( "nR="  , nR  ) ;
  console.log( "nU="  , nU  ) ;
  console.log( "nX="  , this.nodes[nRR]   ) ;
  console.log( "nY="  , this.nodes[nRR+1] ) ;
  console.log( "nZ="  , this.nodes[nRR+2] ) ;

 };


function InitializeModelMH2D()
 {

  this.nodes     = [ 0 , 1 , 2 , 3 , 4 ] ;
  this.zones     = [ 1 , 2 , 3 , 4 , 5 ] ;
  this.behaviour = [ 2 , 3 , 4 , 5 , 6 ] ;
  this.fixity    = [ 3 , 4 , 5 , 6 , 7 ] ;
  this.history   = [ 4 , 5 , 6 , 7 , 8 ] ;

 };


function InitializeModelM3D()
 {

  this.nodes     = [ 0 , 1 , 2 , 3 , 4 ] ;
  this.zones     = [ 1 , 2 , 3 , 4 , 5 ] ;
  this.behaviour = [ 2 , 3 , 4 , 5 , 6 ] ;
  this.fixity    = [ 3 , 4 , 5 , 6 , 7 ] ;
  this.history   = [ 4 , 5 , 6 , 7 , 8 ] ;

 };


