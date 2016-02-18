import 'bootstrap';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
   .plugin('aurelia-google-analytics', config => {
            config.init('UA-9571004');
            config.attach({
                logging: {
                    enabled: true // Set to `true` to have some log messages appear in the browser console.
                },
                pageTracking: {
                    enabled: true // Set to `false` to disable in non-production environments.
                },
                clickTracking: {
                    enabled: true // Set to `false` to disable in non-production environments.
                }
        })
    });

  //Uncomment the line below to enable animation.
  //aurelia.use.plugin('aurelia-animator-css');

  //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  //aurelia.use.plugin('aurelia-html-import-template-loader')

  aurelia.start().then(a => a.setRoot());
}
