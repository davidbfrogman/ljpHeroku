import WebFont from 'webfontloader';
import '3rdParty/phantompolyfill';

export class App {

  //This will create our app, which you can think of like a master page, with these child controls
  //the footer is the footer on the page,
  //and my startup class is a control for executing javascript that I want to execute when my app runs.
  constructor() {
      
  };

  configureRouter(config, router) {

    //This title string gets appended to the Title field that's below in the config.map
    config.title = 'Dave Brown // Photographer';

    // This will remove the hash from the url so we don't have those bad SEO problems
    config.options.pushState = true;
    
    config.map([
      { route: ['portfolio',''], name: 'portfolio', moduleId: 'portfolio', nav: true, title: 'Portfolio' },
      { route: ['about'], name: 'about', moduleId: 'about', nav: true, title: 'About' },
      { route: ['faq'], name: 'faq', moduleId: 'faq', nav: true, title: 'FAQ' },
      { route: ['contact'], name: 'contact', moduleId: 'contact', nav: true, title: 'Contact' },
      { route: ['portfolioDetail'], name: 'portfolioDetail', moduleId: 'portfolioDetail', nav: false, title: 'portfolioDetail' },
    //   { route: ['portfolioManager'], name: 'portfolioManager', moduleId: './PortfolioManager/index', nav: true, title: 'Port Manager' }
    ]);
    

    //------------How to get the URL redirect to work with IIS.  --------------------------------
    //If you're having trouble getting your app to redirect back to the homepage, you need to realize that this is a server based configuration thing.
    //You're not going to get it done here in the router. Instead you need to setup IIS to redirect on a 404.
    //Go in and change the option in IIS to redirect on a 404 to /index.html
    //Then you need to change the default option on IIS from serving up error pages on local dev, to always show the custom error page.  This will cause IIS to show
    //the custom error page, which you've setup on a 404 to be /index.html

    this.router = router;
  }
  
  attached(){
       //By default while we're deving we're going to default going to the port manager.
       //this.router.navigateToRoute('portfolioManager');
       //@import url("http://fonts.googleapis.com/css?family=Dosis|Libre+Baskerville:400italic|Open+Sans:300,400,400italic,700|Playfair+Display:400,700italic,400italic,700,900|Source+Sans+Pro");
       WebFont.load({
        google: {
        families: ['Dosis', 'Libre Baskerville:400italic','Open Sans:300,400,400italic,700','Playfair Display:400,700italic,400italic,700,900', 'Source Sans Pro']
        }
    });
  }
}
