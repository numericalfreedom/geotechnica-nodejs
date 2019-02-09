#include <node.h>
#include <stdio.h>
#include <math.h>
#include <eigen3/Eigen/Eigen>
#include <eigen3/Eigen/Eigenvalues>
#include <thread>

using namespace v8;
// using namespace Eigen;


void ArrayAddEigenvalue(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);

  Eigen::MatrixXd   m(3,3) ;
  Eigen::MatrixXd   n(3,3) ;

  Eigen::MatrixXd   r(3,3) ;

  Eigen::VectorXcd  eivals ;

  if ( args.Length() < 3 || args.Length() > 3 ) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8( isolate , "Wrong number of arguments" )));
    return;
  }

  if ( (! args[0]->IsArray()) || (! args[1]->IsArray()) || (! args[2]->IsArray())  ) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8( isolate , "Wrong arguments" )));
    return;
  }

  v8::Local<Array> mv = v8::Local<Array>::Cast( args[0] ) ;
  v8::Local<Array> nv = v8::Local<Array>::Cast( args[1] ) ;

  v8::Local<Array> av = v8::Local<Array>::Cast( args[2] ) ;


  unsigned int ii  = ((unsigned int) 0) ;
  unsigned int jj  = ((unsigned int) 0) ;

  unsigned int iix = av->Length() ;

  for( ii = ((unsigned int) 0); ii < iix; ++ii )
   {

    v8::Local<Array> bv = v8::Local<Array>::Cast( av -> Get(ii) ) ;

    if( ! bv -> IsArray() )
     {
      isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8( isolate , "Wrong arguments" )));
      return;
     }

    unsigned int jjx  = bv -> Length() ;

    for( jj = ((unsigned int) 0); jj < jjx; ++jj )
     {
    
      double cv = static_cast<double>( v8::Local<Value>::Cast( bv -> Get(jj) ) -> NumberValue() ) ;

      printf( "%f\n" , cv ) ;

     }

   }


  unsigned int i   = ((unsigned int) 0) ;
  unsigned int j   = ((unsigned int) 0) ;
  unsigned int k   = ((unsigned int) 0) ;

  unsigned int ix  = mv->Length() ;
  unsigned int jx  = nv->Length() ;

  double       rv  = ((double) 0.0) ;

  v8::Local<Array> mr = v8::Array::New( isolate , 3 );


  for( i = ((unsigned int) 0); i < 3; ++i )

    for( j = ((unsigned int) 0); j < 3; ++j )
     {

      k = ( (j * 3) + i ) ;

      m( i , j ) = static_cast<double>( v8::Local<Value>::Cast( mv->Get(k) ) -> NumberValue() ) ;
      n( i , j ) = static_cast<double>( v8::Local<Value>::Cast( nv->Get(k) ) -> NumberValue() ) ;

     } ;


  r = m + n ;


  eivals = r.eigenvalues() ;


  for( i = ((unsigned int) 0); i < 3; ++i )

    mr->Set( i , v8::Number::New( isolate , eivals( i ).real() ) ) ;


  args.GetReturnValue().Set( mr ) ;

}

void Init(Handle<Object> exports) {
  NODE_SET_METHOD( exports , "arrayaddeigenvalue" , ArrayAddEigenvalue );
}

NODE_MODULE(addon, Init)

