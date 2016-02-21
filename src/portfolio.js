import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import {Router} from 'aurelia-router';
import {PortfolioManagerService} from './PortfolioManager/PortfolioManagerService';
import {dbpheader} from 'controls/dbpheader';
import {dbpUtility} from 'dbpUtility';
import Isotope from 'isotope-layout';
import Packery from 'isotope-packery';
import imagesloaded from 'imagesloaded';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'npm:photoswipe@4.1.1/dist/photoswipe-ui-default.min.js';

@inject(HttpClient, PortfolioManagerService, dbpheader, dbpUtility)
export class Portfolio {
    heading = 'Portfolio';
    portfolioBooks = [];
    isotopeInstance = {};
    portfolioCategories = [];
    generalAnimationDuration = 300;
    currentFilter = '*';

    constructor(http, PortfolioManagerService, dbpheader, dbpUtility) {
        this.http = http;
        this.service = PortfolioManagerService;
        this.dbpheader = dbpheader;
        this.dbpUtility = dbpUtility;
    }

    //By putting this call here in the activate method.  
    //That means that the other attached method will actually be called with the data that it needs  
    //Before when I had this code in the attached mehtod, the data hadn't actually came back from the server yet. 
    //This meant that when called fixLayout, there weren't any images for isotope, and images loaded to operate on.
    //I'm fairly certain that return there is wildly important.  It's something to keep in mind next time.
    activate() {
        //We want to get a nice small concise object for our categories, so we won't
        //have to go through the categories on our books.
        //this will also give us a nice count.
        this.service.getGetPortfolioCategories()
            .then(portfolioCategories => {
                this.portfolioCategories = portfolioCategories;
            })

        return this.service.getPortfolioBooksForDisplay()
            .then(portfolioBooks => {
                this.portfolioBooks = portfolioBooks;
                var i = 0;
                for (var book of this.portfolioBooks) {
                    //Now we need to remove the space from the string because later we're going to filter on it.
                    //For instance the editorial portrait category is something we want to filter on.
                    //if(i >2){ delete this.portfolioBooks[i]; }
                    i++;
                    book.category = book.category.replace(/\s+/g, '');
                    book.items.sort(function (a, b) {
                        return parseInt(a.order) - parseInt(b.order);
                    })
                }
            })
    }

    attached() {
        this.worksgrid = $('#works-grid');
        this.filters = $('#filters');
        this.secPhotoswipe = $('#sec-photo-swipe');
        this.portfolioGrid = $('#portfolio-grid');
        this.isotopeBuilt = false;
        var self = this;
       
        this.dbpUtility.scrollToTopOfPage();
    
        //find the all filter on my portfolio, and add current class to it.
        $('#All').addClass('current');
    
        //Even if we come back from the contact, and FAQ page, I want the text to show on my heading.  
        this.dbpheader.showHeroCaption();

        $(window).on('resize', () => {
            try {
                this.isotopeInstance.arrange();
            } catch (error) {
                console.log('something went wrong trying to resize isotope on window resize.')
            }
        });

        this.worksgrid.imagesLoaded()
            .done((instance) => {
                //build out the isotope instance
                self.buildIsotope();
            })
            .progress((instance, image) => {
                //TODO: Figure out how to relayout the isotope instance
                //as the images are loaded.
                if(instance.progressedCount % 20 == 0)
                {
                    if(!self.isotopeBuilt){
                         self.buildIsotope();
                         self.isotopeBuilt = true;
                    }
                    self.isotopeInstance.arrange({ filter: self.currentFilter });
                }
            });
    }

    showPortfolioItems(book, item) {
        this.buildPhotoswipe(book, item);
    }

    filterPortfolio(catfilter, catName) {
        catfilter = catfilter.replace(/\s+/g, '');
        catName = catName.replace(/\s+/g, '');
        $('.current').removeClass('current');
        $('#' + catName).addClass('current');

        if (catfilter != '*') {
            catfilter = '.' + catfilter;
        }
        this.currentFilter = catfilter;
        this.isotopeInstance.arrange({ filter: this.currentFilter })

        return false;
    }

    buildIsotope() {
        this.isotopeInstance = new Isotope(this.worksgrid[0], {
            layoutMode: 'packery',
            itemSelector: '.grid-item',
            transitionDuration: '0.3s',
            packery: { gutter: 20 }
        });

        if ($(window).width() < 500) {
            this.isotopeInstance.arrange({ percentPosition: true, packery: { gutter: 5 } });
        }
        else if ($(window).width() < 769) {
            this.isotopeInstance.arrange({ percentPosition: true, packery: { gutter: 10 } });
        }
        //Google Nexus sizing probably applies to most tablets
        else if ($(window).width() < 900) {
            this.isotopeInstance.arrange({ percentPosition: true, packery: { gutter: 10 } });
        }
    }

    buildPhotoswipe(book, item) {
        var pswpElement = document.querySelectorAll('.pswp')[0];
        var items = [];
        var slideStartIndex = 0;

        slideStartIndex = book.items.map(function (x) { return x.id; }).indexOf(item.id);

        for (var item of book.items) {
            //We're basically saying if the item has zero dimensions the default is going to be 800x534.
            var w = item.width == 0 ? 534 : item.width;
            var h = item.height == 0 ? 800 : item.height;

            items.push({
                src: '/dist/images/fulls/' + item.imageURL,
                w: w,
                h: h
            });
        }

        this.secPhotoswipe.hide();
        this.secPhotoswipe.fadeIn(this.generalAnimationDuration);
        
        // define options (if needed)
        var options = {
            // optionName: 'option value'
            // for example:
            index: slideStartIndex, // start at first slide or the slide that was clicked.
            bgOpacity: 1,
            hideAnimationDuration:0, 
            showAnimationDuration:0,
            closeOnScroll: false,
            history: true,
            preload: [1, 4]
        };
        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();

    }
} //closing class
