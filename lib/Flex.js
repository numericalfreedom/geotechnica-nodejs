
/**
 * @file Flex.js : Fast Lagrangian Eulerian Coupled Continnum Multiphysics Simulation
 * 
 */

/**
 * Node : class for multiphysics simulation model node
 * 
 */


class Node
 {

/**
 *  @constructor
 * 
 */

  constructor()
   {

/** Material coordinate vector */

    this.r  = [ undefined ] ;

/** Displacement vector */
    
    this.u  = undefined ;
    
/** Velocity vector */
    
    this.v  = undefined ;
    
/** Acceleration vector */
    
    this.a  = undefined ;

/** Edge list array comprising the node */

    this.ed = undefined ;

/** Face list array comprising the node */
    
    this.fc = undefined ;

/** Zone list array comprising the node */
       
    this.zn = undefined ;

/** Block list array comprising the node */

    this.bl = undefined ;

   } ;

 }


/**
 * Edge : class for multiphysics simulation model edge
 * 
 */

class Edge
 {

/**
 *  @constructor
 * 
 */
 
  constructor()
   {

/** Node list array comprised by the edge */

    this.nd = undefined ;

/** Face list array comprising the edge */
    
    this.fc = undefined ;

/** Zone list array comprising the edge */    
    
    this.zn = undefined ;

/** Block list array comprising the edge */    
    
    this.bl = undefined ;

   } ;

 }


/**
 * Face : class for multiphysics simulation model face
 * 
 */

class Face
 {

  constructor()
   {

    this.nd = undefined ;
    this.ed = undefined ;
    this.zn = undefined ;
    this.bl = undefined ;

   } ;

 }


/**
 * Zone : class for multiphysics simulation model zone
 * 
 */

class Zone
 {

  constructor()
   {

    this.nd = undefined ;
    this.ed = undefined ;
    this.fc = undefined ;
    this.bl = undefined ;

   } ;


 }


/**
 * Block : class for multiphysics simulation model block
 * 
 */

class Block
 {

  constructor()
   {

    this.nd = undefined ;
    this.ed = undefined ;
    this.fc = undefined ;
    this.zn = undefined ;

   } ;

 }


/**
 * Group : class for object groups in multiphysics simulation
 * 
 */

class Group
 {

  constructor()
   {

    this.nd = undefined ;
    this.ed = undefined ;
    this.fc = undefined ;
    this.zn = undefined ;
    this.bl = undefined ;

   } ;

 }


/**
 * Model : class for multiphysics simulation model
 *
 */
 
class Model
 {

/**
 *  @constructor
 *
 */

  constructor()
   {

/** Node list */

    this.nd = undefined ;

/** Edge list */

    this.ed = undefined ;

/** Face list */    

    this.fc = undefined ;
    
/** Zone list */
    
    this.zn = undefined ;
    this.bl = undefined ;

    this.behaviour = undefined ;
    this.fixity    = undefined ;
    this.history   = undefined ;
    this.contact   = undefined ;

   }

/**
 * m2dps() : 2d Mechanical plain stress simulation model
 *
 */

  m2dps()
   {

    console.log( "Configure -> m2dps()" ) ;

   }

/**
 * m2dpd() : 2d Mechanical plain strain simulation model
 *
 */
 
  m2dpd()
   {

    console.log( "Configure -> m2dpd()" ) ;

   }

/**
 * m2dx() : 2d Mechanical axial symmetic simulation model
 *
 */

  m2dx()
   {

    console.log( "Configure -> m2dx()" ) ;

   }

/**
 * m3d() : 3d Mechanical simulation model
 *
 */

  m3d()
   {

    console.log( "Configure -> m3d()" ) ;

   }


  h2dps()
   {

    console.log( "Configure -> 2dps()" ) ;

   }


  h2dpd()
   {

    console.log( "Configure -> h2dpd()" ) ;

   }


  h2dx()
   {

    console.log( "Configure -> 2dx()" ) ;

   }

  h3d()
   {

    console.log( "Configure -> h3d()" ) ;

   }


  t2dps()
   {

    console.log( "Configure -> t2dps()" ) ;

   }


  t2dpd()
   {

    console.log( "Configure -> t2dpd()" ) ;

   }


  t2dx()
   {

    console.log( "Configure -> t2dx()" ) ;

   }

  t3d()
   {

    console.log( "Configure -> t3d()" ) ;

   }

 }


module.exports = { Node , Edge , Face , Zone , Block , Group , Model } ;


