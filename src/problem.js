
const gtq = require( 'geotechnica' ) ;

var model = new gtq.THMC2DX() ;

model.nodes = [] ;

model.project = project ;


function project( phase )
 {

  case( 0 ):

    this.step( 100 ) ;

    break ;


  case( 1 ):

    this.step( 200 ) ;

    break ;

 }

