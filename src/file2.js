'use strict' ;


const fs = require('fs');
const readline = require('readline');

var key          = undefined ;
var thismodel    = null ;

var ln           = 0 ;
var numnodes     = undefined ;
var numzones     = undefined ;

var   state      = undefined ;
const c_nodes    = 1 ;
const c_zones    = 2 ;

var i            = undefined ;
var keylist      = null ;


function readmeshfile()
 {


  let model = {} ;


  let promise = new Promise
   (

    function( resolve , reject )
     {

      const rl = readline.createInterface
       (

         {
          input: fs.createReadStream('test.msh'),
          crlfDelay: Infinity
         }

       );

      rl.on
       ( 'line' ,


        function( line )
         {


          ++ln ;


          line = line.trim() ;

          let fields = line.split( ' ' ) ;


          if( fields[0] === '$Elements' )  { state = c_zones ; ln = 0 ; } ;

          if( fields[0] === '$EndElements' )  { state = undefined ; ln = 0 ; } ;


          if( (state == c_zones) && (ln == 1) )
           {

            numzones = parseInt( fields[0] ) ;      

           }


          if( (state == c_zones) && (ln > 1) )
           {


            if( fields[1] === '2' )

              keylist = [ fields[5] , fields[6] , fields[7] ] ;


            else if( fields[1] === '4' )

              keylist = [ fields[5] , fields[6] , fields[7] , fields[8] ] ;


            keylist = keylist.sort() ;


            for( key = '' , i = 0; i < keylist.length; i++ )

              if( i )  key += ( '-' + keylist[i] ) ;

              else  key += keylist[i] ;


            model[key] = fields[0] ;


           } ; // end if{}


          //  console.log( fields ) ;
 
         }

       ) ;


      rl.on
       ( 'close' ,

        function( line )
         { 

//        console.log( model ) ;

//        key = '1044-1097-853-985' ;

//        if( key in model )  console.log( model[key] ) ;

          resolve( model ) ;

         }

       ) ;


     }

   ) ;


  return( promise ) ;


 } ;


async function readmesh()
 {

  console.log( 'Calling ...' ) ;

  let model = await readmeshfile() ;

  console.log( '... finished.' ) ;
 
  this.model = model ;

  return( model ) ;

 }


// readmeshfile().then( (thismodel) => { console.log( thismodel ) } ) ;


// readmesh() ;


// console.log( model ) ;


function printmesh()
 {

  console.log( this.model ) ;

 }



function Mesh()
 {

  this.model     = null ;
  this.readmesh  = readmesh ;
  this.printmesh = printmesh ;

 }


var mymesh = new Mesh() ;


mymesh.readmesh() ;


mymesh.printmesh() ;



