

module.exports = { ModelM2D , ModelMH2D , ModelM3D } ;


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


