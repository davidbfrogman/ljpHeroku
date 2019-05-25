    
    
    // set up ========================
    var express  = require('express');
    var compression =  require('compression');
    var fallback = require('express-history-api-fallback')
    var root     = __dirname
    var app      = express();                               // create our app w/ express
    var morgan   = require('morgan');             // log requests to the console (express4)
    var logger   = morgan('combined');
    var favicon  = require('serve-favicon');
    var port     = process.env.PORT || 8080;        // set our port
    var prodDomain = 'www.lynzijudish.com';       //change this whenever we setup our cname
    
    // configuration =================
    var config = {
        devConfig : {
          production : false,  
          cacheShort : '0',
          cacheLong : '0',
          prerenderServiceURL: 'http://localhost:3000',
          rootUrl : 'http://localhost:' + port   
        },
        prodConfig : {
            production : true,
            cacheShort : '7d',  //So apparently google freaks out if the browser cache is less than 7 days. 
            cacheLong : '14d',
            prerenderServiceURL: 'http://service.prerender.io', //This probably needs to change.
            rootUrl : 'http://' + prodDomain
        },
    }
    
    //Get the correct config prod/dev
    //I think this is calculated from the prod config variable that's actually in heroku, to change it you need to set that config variable in the 
    //heroku website.
    var currentConfig = process.env.prod == 'true' ? config.prodConfig : config.devConfig;
    
    //This will be helpful on production when we want to force users to www version of my site.
    app.use( require('express-force-domain')(currentConfig.rootUrl) );
    
    app.use(favicon(__dirname + '/favicon.ico'));
    
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
    app.use(express.static(root, { dotfiles: 'allow', maxAge: currentConfig.cacheShort} ));
    app.use(express.static(root + '/dist', { dotfiles: 'allow', maxAge: currentConfig.cacheShort, index: false} ));
    app.use(express.static(root + '/images', { dotfiles: 'allow', maxAge: currentConfig.cacheLong, index: false} ));
    app.use(express.static(root + '/jspm_packages', { dotfiles: 'allow', maxAge: currentConfig.cacheLong, index: false} ));
    app.use(express.static(root + '/node_modules', { dotfiles: 'allow', maxAge: currentConfig.cacheLong, index: false} ));
   
    app.get('*', function(req, res, next) {
           res.sendFile(root + '/index.html');
    });
    
    // listen (start app with node server.js) ======================================
    app.listen(port);
    console.log("App listening on port: " + port);
    
