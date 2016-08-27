#Readme

-   git push heroku master 
-   This is how you publish your site to heroku


#Notes
- When you finally launch your site, turn on the canonical URL rewrite rule in the web.config.

- Frankly go through your whole web.config and make sure there's no other features you want to move over.

- Change out the fav.icon

- Change the links on your blog to point to the correct place in your main site.

- Is your webconfig giving you weird errors?  Make sure you have the Rewrite module installed.  I had to install rewrite2 or something like that to get it working.

- Turn on the forcing domain bit in express

- Most likely if you're having problems with photoswipe, it's because you're including a very specific version in portfolio.js.  If photoswipe gets updated
you'll want to update that import statement.

- I figured out the Inject is not a function error.  Which was caused by the bundles.json file having depCache = true.  If you manage to screw this up again that's most likely the problem.

- jspm update aurelia-bootstrapper aurelia-fetch-client aurelia-framework aurelia-history-browser aurelia-loader-default aurelia-logging-console aurelia-router aurelia-templating-binding aurelia-templating-resources aurelia-templating-router

- For my weird run in with prerender.  The things that ended up fixing it were to run jspm update (not just the aurelia framework), and then I couldn't get it to work locally unless I bundled my app.  Not sure why, but that seemed to fix it.

- JSPM giving you hell when you're trying to run jspm update try closing visual studio.  I'm thinking maybe the git plugin or intellisense is fucking with jspm in weird ways. 

- For Lynzi's Prerender Account I used my hotmail account.