
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

    this.r  = [] ;

/** Displacement vector */
    
    this.u  = [] ;
    
/** Velocity vector */
    
    this.v  = [] ;
    
/** Acceleration vector */
    
    this.a  = [] ;

/** Edge list array comprising the node */

    this.ed = [] ;

/** Face list array comprising the node */
    
    this.fc = [] ;

/** Zone list array comprising the node */
       
    this.zn = [] ;

/** Block list array comprising the node */

    this.bl = [] ;

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

    this.nd = [] ;

/** Face list array comprising the edge */
    
    this.fc = [] ;

/** Zone list array comprising the edge */    
    
    this.zn = [] ;

/** Block list array comprising the edge */    
    
    this.bl = [] ;

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

    this.nd = [] ;
    this.ed = [] ;
    this.zn = [] ;
    this.bl = [] ;

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

    this.nd = [] ;
    this.ed = [] ;
    this.fc = [] ;
    this.bl = [] ;

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

    this.nd = [] ;
    this.ed = [] ;
    this.fc = [] ;
    this.zn = [] ;

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

    this.nr = undefined ;

    this.nd = [] ;
    this.ed = [] ;
    this.fc = [] ;
    this.zn = [] ;
    this.bl = [] ;

   } ;

 }


/**
 * Behaviour : class for constitutive behaviour in multiphysics simulation
 * 
 */

class Behaviour
 {

  constructor()
   {

    this.nr = undefined ;

   } ;

 }


/**
 * Fixity : class for fixities in multiphysics simulation
 * 
 */

class Fixity
 {

  constructor()
   {

    this.nr = undefined ;

   } ;

 }


/**
 * History : class for histories in multiphysics simulation
 * 
 */

class History
 {

  constructor()
   {

    this.nr = undefined ;

   } ;

 }


/**
 * Contact : class for contacts in multiphysics simulation
 * 
 */

class Contact
 {

  constructor()
   {

    this.nr = undefined ;

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

    this.nd = [] ;

/** Edge list */

    this.ed = [] ;

/** Face list */    

    this.fc = [] ;
    
/** Zone list */
    
    this.zn = [] ;

/** Block list */
       
    this.bl = [] ;

    this.group     = [] ;
    this.behaviour = [] ;
    this.fixity    = [] ;
    this.history   = [] ;
    this.contact   = [] ;
    
   }

 }


/**
 * m2dps() : 2d Mechanical plain stress simulation model
 *
 */

  class M2dps extends Model
   {


    constructor()
     {

      console.log( "M2dps -> configure()" ) ;

     } ;

    step()
     {

      console.log( "M2dps -> step()" ) ;

     } ;

   }

/**
 * m2dpd() : 2d Mechanical plain strain simulation model
 *
 */
 
  class M2dpd extends Model
   {

    constructor()
     {

      console.log( "M2dpd -> configure()" ) ;

     } ;

    step()
     {

      console.log( "M2dpd -> step()" ) ;

     } ;

   }

/**
 * m2dx() : 2d Mechanical axial symmetic simulation model
 *
 */

  class M2dx extends Model
   {

    constructor()
     {

      console.log( "M2dx -> configure()" ) ;

     } ;

    step()
     {

      console.log( "M2dx -> step()" ) ;

     } ;

   }


/**
 * m3d() : 3d Mechanical simulation model
 *
 */

  class M3d extends Model
   {

    constructor()
     {

      console.log( "M3d - configure()" ) ;

     } ;

    step()
     {

      console.log( "M3d -> step()" ) ;

     } ;

   }

  class H2d
   {

    constructor()
     {

      console.log( "H2d - configure()" ) ;

     } ;

    step()
     {

      console.log( "H2d -> step()" ) ;

     } ;

   }

  class H2dx extends Model
   {

    constructor()
     {

      console.log( "H2dx - configure()" ) ;

     } ;

    step()
     {

      console.log( "H2dx -> step()" ) ;

     } ;

   }


  class H3d extends Model
   {

    constructor()
     {

      console.log( "H3d - configure()" ) ;

     } ;

    step()
     {

      console.log( "H3d -> step()" ) ;

     } ;

   }


  class T2d extends Model
   {

    constructor()
     {

      console.log( "T2d - configure()" ) ;

     } ;

    step()
     {

      console.log( "T2d -> step()" ) ;

     } ;

   }


  class T2dx extends Model
   {

    constructor()
     {

      console.log( "T2dx - configure()" ) ;

     } ;

    step()
     {

      console.log( "T2dx -> step()" ) ;

     } ;
   }


  class T3d extends Model
   {

    constructor()
     {

      console.log( "T3d - configure()" ) ;

     } ;

    step()
     {

      console.log( "T3d -> step()" ) ;

     } ;

   }


module.exports = { Node , Edge , Face , Zone , Block , Group , Model , 
                   M2dps , M2dpd , M2dx , M3d , H2d , H2dx , H3d ,
                   T2d , T2dx , T3d } ;

