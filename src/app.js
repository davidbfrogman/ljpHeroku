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
            { route: ['portfolio', ''], name: 'portfolio', moduleId: 'portfolio', nav: true, title: 'Portfolio' },
            { route: ['about'], name: 'about', moduleId: 'about', nav: true, title: 'About' },
            { route: ['faq'], name: 'faq', moduleId: 'faq', nav: true, title: 'FAQ' },
            { route: ['contact'], name: 'contact', moduleId: 'contact', nav: true, title: 'Contact' },
            { route: ['portfolioManager'], name: 'portfolioManager', moduleId: './PortfolioManager/index', nav: true, title: 'Port Manager' },
            { route: ['imagedetail'], name: 'imagedetail', moduleId: 'imagedetail', nav: false, title: 'Portfolio Item Image Detail' }
        ]).mapUnknownRoutes('portfolio', 'portfolio');
        
        this.router = router;
    }

    attached() {
        //By default while we're deving we're going to default going to the port manager.
        //this.router.navigateToRoute('portfolioManager');
        //@import url("http://fonts.googleapis.com/css?family=Dosis|Libre+Baskerville:400italic|Open+Sans:300,400,400italic,700|Playfair+Display:400,700italic,400italic,700,900|Source+Sans+Pro");
        // WebFont.load({
        //     google: {
        //         families: ['Dosis', 'Open Sans:300', 'Playfair Display:400']
        //     }
        // });
        this.loadScript('https://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js');
        this.loadcssfile("https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css");
    }

    loadScript(src) {
        return new Promise(function (resolve, reject) {
            var s;
            s = document.createElement('script');
            s.src = src;
            s.onload = resolve;
            s.onerror = reject;
            document.getElementsByTagName("body")[0].appendChild(s);
        });
    }

    loadcssfile(filename) {
        return new Promise(function (resolve, reject){
        console.log('inserting css for ion icons');
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
        fileref.setAttribute("media","none");
        fileref.setAttribute("onload","if(media!='all')media='all'");

        document.getElementsByTagName("body")[0].appendChild(fileref);
        });
    }
}
