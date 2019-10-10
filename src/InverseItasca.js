/** Function inv
 *
 *
 */

function inv()
 {

  let i   = undefined ;
  let j   = undefined ;
  let k   = undefined ;
  let bii = undefined ;
  let bji = undefined ;

  if( this.d )
  
    for( i = 0;  i < this.nr;  ++i )

      if( bii = this.v[ this.idx( i , i ) ] )
       {
    
        for( k = 0;  k < this.nc; ++k )

          if( (k != i) && (this.idx( i , k ) < this.nv) && (this.v[ this.idx( i , k ) ]) )

            this.v[ this.idx( i , k ) ] /= bii ;

        this.v[ this.idx( i , i ) ] = ( 1.0 / bii ) ;

        for( j = 0;  j < this.nr;  ++j )

          if( j != i )
           {

            bji = this.v[ this.idx( j , i ) ] ;

            for( k = 0;  k < this.nc;  k++ )

              if( (this.idx( i , k ) < this.nv) && (this.idx( j , k ) < this.nv) && (this.v[ this.idx( j , k) ]) )

                this.v[ this.idx( j , k ) ] -= ( bji * this.v[ this.idx( i , k ) ] ) ;

            if( this.idx( j , i ) < this.nv )

              this.v[ this.idx( j , i ) ] = (- bji / bii ) ;

           } ; // end if-

       } // end if +

      else

        for( k = (i + 1);  k < this.nc;  this.v[ this.idx( i , k++ ) ] = undefined ) ;

  else

    for( i = 0;  i < this.nr;  ++i )

      if( bii = this.v[ this.idx( i , i ) ] )
       {

        for( k = 0;  k < this.nc;  ++k )

          if( k != i )

            this.v[ this.idx( i , k ) ] /= bii ;

        this.v[ this.idx( i , i ) ] = ( 1.0 / bii ) ;

        for( j = 0;  j < this.nr;  ++j )

          if( j != i )
           {

            bji = this.v[ this.idx( j , i ) ] ;

            for( k = 0;  k < this.nc;  k++ )

              if( this.v[ this.idx( j , k ) ] )

                this.v[ this.idx( j , k ) ] -= ( bji * this.v[ this.idx( i , k ) ] ) ;

            this.v[ this.idx( j , i ) ] = (- bji / bii ) ;

           } ; // end if-

       } // end if +

      else

        for( k = 0;  k < this.nc;  this.v[ this.idx( i , k++ ) ] = undefined ) ;

  return ;

 } ; // end function inv()
