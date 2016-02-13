    // configuration =================
    var config = {
        devConfig : {
          production : false,  
          cacheShort : '0',
          cacheLong : '0',
          prerenderServiceURL: 'http://localhost:3000'  
        },
        prodConfig : {
            production : true,
            cacheShort : '5h',
            cacheLong : '2d',
            prerenderServiceURL: 'http://service.prerender.io' //This probably needs to change.
        },
    }

    // set up ========================
    var express  = require('express');
    var compression =  require('compression');
    var fallback = require('express-history-api-fallback')
    var root     = __dirname
    var app      = express();                               // create our app w/ express
    var morgan   = require('morgan');             // log requests to the console (express4)
    var logger   = morgan('combined');
    // set our port
    var port = process.env.PORT || 8080;
    
    var currentConfig = process.env.prod ? config.prodConfig : config.devConfig;
    
    //This will be helpful on production when we want to force users to www version of my site.
    // if(currentConfig.production){
    //     app.use( require('express-force-domain')('http://www.davebrownphotography.com') );
    // }
    // if(!currentConfig.production){
    //     app.use( require('express-force-domain')('http://localhost:' + port) );
    // }
    
    // log every request to the console except images...
    app.use(
        morgan('dev', {
            skip : function(req,res) { return req.url.indexOf('.jpg') != -1; }
        })
    );
    
    //client -------------------------------------------------------------
                                                 
    app.use(require('prerender-node').set('prerenderServiceUrl', currentConfig.prerenderServiceURL));
    // compress all requests
    app.use(compression());
    app.use(express.static(root, { maxAge: currentConfig.cacheShort} ));
    app.use(express.static(root + '/dist', { maxAge: currentConfig.cacheShort, index: false} ));
    app.use(express.static(root + '/images', { maxAge: currentConfig.cacheLong, index: false} ));
    app.use(express.static(root + '/jspm_packages', { maxAge: currentConfig.cacheLong, index: false} ));
    app.use(express.static(root + '/node_modules', { maxAge: currentConfig.cacheLong, index: false} ));
        
    app.use(fallback('index.html', { root }));
    
    app.get('*', function(req, res) {
        res.sendFile(root + 'index.html'); // load the single view file (aurelia will handle the page changes on the front-end)
    });

    // listen (start app with node server.js) ======================================
    app.listen(port);
    console.log("App listening on port: " + port);
    
