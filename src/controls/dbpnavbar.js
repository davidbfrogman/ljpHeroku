import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class dbpnavbar {

    overlayMenu = {};
    navbatTrans = {};
    
    constructor(Router){
        this.router = Router;
        console.log(this.router);
    }

    showOverlayMenu() {
        this.overlayMenu.fadeIn(300);
        $('body').addClass('aux-navigation-active');
    }

    hideOverlayMenu() {
        this.overlayMenu.fadeOut(300);
        $('body').removeClass('aux-navigation-active');
    }
    
    navigateToBlog(){
        this.hideOverlayMenu();
        window.open('http://blog.davebrownphotography.com', '_blank');
    }

    attached() {

        var navbar = $('.navbar-custom');
        this.navbatTrans,
        self = this;

        this.overlayMenu = $('.overlay-menu');

        this.overlayMenu.hide();
        this.overlayMenu.css("visibility", "");

        this.navbarCheck(navbar);

        $(window).scroll(function () {
            navbarAnimation(navbar);
        }).scroll();

        function navbarAnimation(navbar) {
            var topScroll = $(window).scrollTop();
            if (navbar.length > 0 && self.navbatTrans !== false) {
                if (topScroll >= 5) {
                    navbar.removeClass('navbar-transparent');
                } else {
                    navbar.addClass('navbar-transparent');
                }
            }
        }

        $(window).keydown(function (e) {
            if (e.which === 27) {
                self.hideOverlayMenu();
            }
        });

        /* ---------------------------------------------- /*
         * Overlay dropdown menu
        /* ---------------------------------------------- */
        $('#nav > li.slidedown > a').on('click', function () {
            if ($(this).attr('class') != 'active') {
                $('#nav li a').removeClass('active');
                $(this).next().addClass('open');
                $(this).addClass('active');
            } else {
                $('#nav li ul').removeClass('open');
                $(this).removeClass('active');
            }
            self.hideOverlayMenu();
            return false;
        });

        /* ---------------------------------------------- /*
         * Scroll Animation
        /* ---------------------------------------------- */

        $('.section-scroll').bind('click', function (e) {
            var anchor = $(this);

            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top
            }, 1000);

            e.preventDefault();
        });
    }
    
    navbarCheck(navbar){
         if (navbar.length > 0 && navbar.hasClass('navbar-transparent')) {
                this.navbatTrans = true;
            } else {
                this.navbatTrans = false;
            }
    }
}
