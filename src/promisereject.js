"use strict"


function solve()
 {

  let promise = new Promise( (resolve,reject) =>
   {

    let error = new Error( "Reject error" ) ;

    error.name = "Promise error" ;

    setTimeout( () => { reject( error ) } , 1000 ) ;

   }) ;

  return( promise ) ;

 }


async function run()
 {

  try
   {

    let result = await solve() ;

   }

  catch( error )
   {

    console.log( "Error:" , error.name , error.message );

   }

 }


run() ;

