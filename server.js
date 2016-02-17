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
            cacheShort : '1d',
            cacheLong : '7d',
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
    var rewrite  = require('express-urlrewrite');
    
    // set our port
    var port = process.env.PORT || 8080;
    
    //Get the correct config prod/dev
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
    
    console.log(__dirname);
    
    // compress all requests
    app.use(compression());
    app.use(express.static(root, {dotfiles : 'allow', maxAge: currentConfig.cacheShort} ));
    app.use(express.static(root + '/dist', {dotfiles : 'allow', maxAge: currentConfig.cacheShort, index: false} ));
    app.use(express.static(root + '/images', {dotfiles : 'allow', maxAge: currentConfig.cacheLong, index: false} ));
    app.use(express.static(root + '/jspm_packages', {dotfiles : 'allow', maxAge: currentConfig.cacheLong, index: false} ));
    app.use(express.static(root + '/node_modules', {dotfiles : 'allow', maxAge: currentConfig.cacheLong, index: false} ));
   
    app.get('*', function(req, res, next) {
        if(req.originalUrl.indexOf('.aspx') > 0)
        {
            console.log('this was definitely an aspx page');
            console.log('here is the original url: ' + req.originalUrl);
            res.redirect(root + '/index.html');
            req.originalUrl = '/about'
        }
        else
        {
           console.log('hit catchall handling');
           res.sendFile(root + '/index.html');
        }
    });
    
    app.get('*', function (req, res) {
        console.log('request logger: ' + req);
        
        res.sendFile(root + '/');
        
        res.originalUrl = '/';
        console.log('response logger: ' + res);
    });
    
    // listen (start app with node server.js) ======================================
    app.listen(port);
    console.log("App listening on port: " + port);
    
