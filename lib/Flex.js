
/**
 * Constant definitions:
 *
 */


class Node
 {

  constructor()
   {

    this.x  = undefined ;
    this.y  = undefined ;
    this.z  = undefined ;

    this.ed = undefined ;
    this.fc = undefined ;
    this.zn = undefined ;
    this.bl = undefined ;

   } ;

 }


class Edge
 {

  constructor()
   {

    this.x  = undefined ;
    this.y  = undefined ;
    this.z  = undefined ;

    this.nd = undefined ;
    this.fc = undefined ;
    this.zn = undefined ;
    this.bl = undefined ;

   } ;

 }


class Face
 {

  constructor()
   {

    this.x  = undefined ;
    this.y  = undefined ;
    this.z  = undefined ;

    this.nd = undefined ;
    this.ed = undefined ;
    this.zn = undefined ;
    this.bl = undefined ;

   } ;

 }


class Zone
 {

  constructor()
   {

    this.x  = undefined ;
    this.y  = undefined ;
    this.z  = undefined ;

    this.nd = undefined ;
    this.ed = undefined ;
    this.fc = undefined ;
    this.bl = undefined ;

   } ;


 }


class Block
 {

  constructor()
   {

    this.x  = undefined ;
    this.y  = undefined ;
    this.z  = undefined ;

    this.nd = undefined ;
    this.ed = undefined ;
    this.fc = undefined ;
    this.zn = undefined ;

   } ;

 }


class Group
 {

  this.nd = undefined ;
  this.ed = undefined ;
  this.fc = undefined ;
  this.zn = undefined ;
  this.bl = undefined ;

 }


class Model
 {

  constructor()
   {

    this.nd = undefined ;
    this.ed = undefined ;
    this.fc = undefined ;
    this.zn = undefined ;
    this.bl = undefined ;

    this.behaviour = undefined ;
    this.fixity    = undefined ;
    this.history   = undefined ;
    this.contact   = undefined ;

   }


  m2dps()
   {

    console.log( "m2dps()" ) ;

   }

	 
  m2dpd()
   {

    console.log( "m2dpd()" ) ;

   }


  m2dx()
   {

    console.log( "m2dx()" ) ;

   }

  m3d()
   {

    console.log( "m3d()" ) ;

   }


  h2dps()
   {

    console.log( "h2dps()" ) ;

   }


  h2dpd()
   {

    console.log( "h2dpd()" ) ;

   }


  h2dx()
   {

    console.log( "h2dx()" ) ;

   }

  h3d()
   {

    console.log( "h3d()" ) ;

   }


  t2dps()
   {

    console.log( "t2dps()" ) ;

   }


  t2dpd()
   {

    console.log( "t2dpd()" ) ;

   }


  t2dx()
   {

    console.log( "t2dx()" ) ;

   }

  t3d()
   {

    console.log( "t3d()" ) ;

   }

 }


/** ModelM2D : class for two dimensional mechanical simulation
 *
 *  @constructor
 *  @param {Array} nodes - Node list
 *  @param {Array} zones - Zone list
 */

module.exports = { Node , Edge , Face , Zone , Block , Group , Model } ;


