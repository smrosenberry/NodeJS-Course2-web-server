const express = require( 'express' );
const hbs     = require( 'hbs'     );
const fs      = require( 'fs'      );

initializeHbs();
var app = intializeExpress();

app.use((request, response, next) => {
    var now = new Date().toString();
    var logMsg = `${now}: ${request.method} ${request.url}`;
    console.log( logMsg );
    fs.appendFile( 'server.log', logMsg + '\n', fsErrorHandler );
    next(); // must call
})

//app.use((request, response, next) => {
//    response.render( 'maintenance.hbs' );
//})

app.use( express.static( __dirname + '/public' ) );


app.get( '/', ( request, response ) => {
    response.render( 'root.hbs', 
        {
            welcomeMsg: 'Welcome to my site',
            name: 'Steve',
            likes: ['Racquetball', 'Flying', 'Pointers' ],
            pageTitle: 'Home Page',
    })
});

app.get( '/about', ( request, response ) => {
    response.render( 'about.hbs', 
        {
            pageTitle: 'About Page',
    } );
});

app.get( '/projects', ( request, response ) => {
    response.render( 'projects.hbs', 
        {
            pageTitle: 'Project Portfolio',
    } );
});

app.get( '/bad', ( request, response ) => {
    response.send( { 
        errorMessage: 'Failure!' 
    } );
});


var   env = process.env;
const httpPortNumber = env.PORT ||  3000;
app.listen( httpPortNumber, serverReady );


function initializeHbs()
{
    hbs.registerPartials(  __dirname + '/views/partials' );
    hbs.registerHelper('getCurrentYear', () => { 
        return new Date().getFullYear();
    } );

    hbs.registerHelper('screamIt', (text) => { 
        return text.toUpperCase(); 
    } );
}

function intializeExpress()
{
    
    let app = express();

    app.set( 'view engine', 'hbs' );
    
    return( app );
    
}

function serverReady()
{
    console.log( `Server running on port[${httpPortNumber}]` );
}

function fsErrorHandler( err )
{
    if( err ) {
        console.log( 'Unable to append to server.log' );
    }
} 