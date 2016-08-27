import {inject} from 'aurelia-framework';
import {dbpUtility} from 'dbpUtility';
import {smoothscroll} from './3rdParty/smoothscroll';
import  './3rdParty/appear.js';
import  './3rdParty/owl.carousel.js';
import {reviewsdata} from 'data/reviewsdata.js';


@inject(smoothscroll, dbpUtility, reviewsdata)
export class about {
    
    constructor(smoothscroll, dbpUtility, reviewsdata) {
        this.heading = 'About';
        this.smoothscroll = smoothscroll;
        this.dbpUtility = dbpUtility;
        this.reviewsList = reviewsdata.currentReviews.reviews;
    };
    
    attached()
    {
        this.smoothscroll.init();
        this.dbpUtility.shrinkHeroModule();
        this.dbpUtility.scrollToTopOfPage();
        this.dbpUtility.showControlsForImageDetail();
        this.dbpUtility.setPageTitle('About', true);
        this.dbpUtility.setPageMetaDescription('About Lynzi Judish.', true);
        this.dbpUtility.setPageMetaKeywords('About, News, Info, Questions', true);
        
        this.drawCounters();
        this.drawOwlSliders();
        this.drawBackgrounds();
    }
    
    drawBackgrounds(){
      $('.module-hero, .module, .module-small').each(function() {
			if ($(this).attr('data-background')) {
				$(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
			}
		});
    }
    
    drawOwlSliders(){
		$('.slider-testimonials').owlCarousel({
            center:true,
            loop:true,
            margin:30,
            autoplay:true,
            autoplayTimeout:5000,
            autoplayHoverPause:true,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                1000:{
                    items:1
                }
            }
        });
    }
    
    drawCounters(){
       $('.progress-bar').each(function(i) {
			$(this).appear(function() {
				var percent = $(this).attr('aria-valuenow');
				$(this).animate({'width' : percent + '%'});
				$(this).find('span').animate({'opacity' : 1}, 900);
				$(this).find('span').countTo({from: 0, to: percent, speed: 900, refreshInterval: 30});
			});
		});
        
        $('.counter-item').each(function(i) {
			$(this).appear(function() {
				var number = $(this).find('.counter-number').data('number');
				$(this).find('.counter-number span').countTo({from: 0, to: number, speed: 1200, refreshInterval: 30});
			});
		});
    }
}