
/**
 * @file flexsimulationtest.js
 *
 * Flex simulation test
 *
 * @author Nandor Tamaskovics
 * @copyright Numercalfreedom 2018
 *
 *
 */

const f    = require( './lib/FleX_M2D.js' );

const fm2d = new f.FleX_M2D ;

fm2d.initialize( 'model.msh' );

fm2d.local = 0.75 ;

fm2d.force = 0.50 ;


const e = require( './lib/Elastic.js' ) ;

e1 = new e.Elastic( 1.0 , 1.0 ) ;


const mc   = require( './lib/MohrCoulomb.js' ) ;

mc1 = new mc.MohrCoulomb( 1.0 , 1.0 , 1.0 , 1.0 ) ;


fm2d.mechanic  = [ [ "foundation" , e1 ] , [ "sand" , mc1 ] ] ;

fm2d.hydraulic = [ [ "foundation" , e1 ] , [ "sand" , mc1 ] ] ;

fm2d.thermic   = [ [ "foundation" , e1 ] , [ "sand" , mc1 ] ] ;


fm2d.fixity = [ [ "leftmargin" , "vx" , 0.0 ] , [ "bottommargin" , 'vy' , 0.0 ] , [ "rightmargin" , 'vx' , 0.0 ] ] ;

fm2d.history = [ [ "point1" , 'vx' , 'point1-vx.dat' ] , [ 'point2' , 'sxx' , 'point2-sxx.dat' ] ] ;


fm2d.step( 100 ) ;

// fm2d.write( 'model-100.msh' ) ;


