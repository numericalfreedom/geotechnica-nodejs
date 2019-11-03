
const s = require( './netserverpackage' ) ;

const PIPE_NAME = "mypipe";

// const PIPE_PATH = "\\\\.\\pipe\\" + PIPE_NAME;

const server = new s.Server( PIPE_PATH ) ;

const client = new s.Client( PIPE_PATH ) ;

