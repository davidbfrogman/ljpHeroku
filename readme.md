#Readme
- When you finally launch your site, turn on the canonical URL rewrite rule in the web.config.

- Frankly go through your whole web.config and make sure there's no other features you want to move over.

- Change out the fav.icon

- Is your webconfig giving you weird errors?  Make sure you have the Rewrite module installed.  I had to install rewrite2 or something like that to get it working.

- Turn on the forcing domain bit in express

- Most likely if you're having problems with photoswipe, it's because you're including a very specific version in portfolio.js.  If photoswipe gets updated
you'll want to update that import statement.

jspm update aurelia-bootstrapper aurelia-fetch-client aurelia-framework aurelia-history-browser aurelia-loader-default aurelia-logging-console aurelia-router aurelia-templating-binding aurelia-templating-resources aurelia-templating-router