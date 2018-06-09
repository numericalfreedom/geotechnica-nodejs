function a( x )
 {

  this.x = x ;

 }


function b( y )
 {

  this.y = y ;

 }


function c( z )
 {

  this.z = z ;

 }


function test( x , y , z )
 {

  this.x = x ;
  this.y = y ;
  this.z = z ;

  this.a = new a( x ) ;
  this.b = new b( y ) ;
  this.c = new c( z ) ;

 }


module.exports = { test } ;

