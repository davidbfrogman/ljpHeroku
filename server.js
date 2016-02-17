    
    
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
    var prodDomain = 'dbpspa.herokuapp.com';       //change this whenever we setup our cname
    
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
            cacheShort : '2d',
            cacheLong : '7d',
            prerenderServiceURL: 'http://service.prerender.io', //This probably needs to change.
            rootUrl : 'http://' + prodDomain
        },
    }
    
    //Get the correct config prod/dev
    var currentConfig = process.env.prod ? config.prodConfig : config.devConfig;
    
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
    
    console.log(__dirname);
    
    // compress all requests
    app.use(compression());
    app.use(express.static(root, { maxAge: currentConfig.cacheShort} ));
    app.use(express.static(root + '/dist', { maxAge: currentConfig.cacheShort, index: false} ));
    app.use(express.static(root + '/images', { maxAge: currentConfig.cacheLong, index: false} ));
    app.use(express.static(root + '/jspm_packages', { maxAge: currentConfig.cacheLong, index: false} ));
    app.use(express.static(root + '/node_modules', { maxAge: currentConfig.cacheLong, index: false} ));
   
    app.get('*', function(req, res, next) {
        if(req.originalUrl.indexOf('.aspx') > 0)
        {
            console.log('Handling Redirection for ASPX Page');
            console.log('Heres the original URL for matching aspx page: ' + req.originalUrl);
            console.log('Heres the req.hostname: ' + req.hostname);
            res.status(301);
            console.log(req.hostname);
            
            //Mobile Redirection
            if(req.hostname.toLowerCase().indexOf('m.davebrownphotography.com') > 0 ){ 
                 res.sendFile(root + '/index.html', { headers:{ 'Location' : currentConfig.rootUrl } });
            }
            if(req.originalUrl.toLowerCase().indexOf('about') > 0){
                
                res.sendFile(root + '/index.html', { headers:{ 'Location' : currentConfig.rootUrl + '/about' } });
            }
            if(req.originalUrl.toLowerCase().indexOf('contact') > 0){
                
                res.sendFile(root + '/index.html', { headers:{ 'Location' : currentConfig.rootUrl + '/contact' } });
            }
            if(req.originalUrl.toLowerCase().indexOf('faq') > 0 ){
                
                res.sendFile(root + '/index.html', { headers:{ 'Location' : currentConfig.rootUrl + '/faq' } });
            }
            else{  
                res.sendFile(root + '/index.html', { headers:{ 'Location' : currentConfig.rootUrl } }); 
            } 
        }
        //Redirect my old blog location.
        if(req.originalUrl.toLowerCase().indexOf('bloginstall') > 0){
                
            var cleaned = req.originalUrl.toLowerCase();
            
            cleaned = cleaned.replace('/bloginstall','');
            console.log('Cleaned Blog URL:' + cleaned);
            res.redirect(301, 'http://blog.davebrownphotography.com' + cleaned);
        }
        else
        {
           console.log('hit catchall handling not in an aspx page.');
           res.sendFile(root + '/index.html');
        }
    });
    
    // listen (start app with node server.js) ======================================
    app.listen(port);
    console.log("App listening on port: " + port);
    
