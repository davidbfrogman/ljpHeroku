import {inject} from 'aurelia-framework';
import {dbpheader} from 'controls/dbpheader';

@inject(dbpheader)
export class dbpUtility {
    constructor(dbpheader) {
        this.dbpheader = dbpheader;
    };
    
    get isMobile(){
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			return true;
		} else {
			return false;
		}
    }

    
    scrollToTopOfPage()
    {
       if($(window).scrollTop() > 20)
       {
           if(this.isMobile){
               $('body').scrollTop(0);
           }
            else{
               $('html, body').animate({
                  scrollTop: 0
               }, 1000);
            }
        }
    }
    
    shrinkHeroModule(){
        this.dbpheader.shrinkHeroModule(350, 175);
    }
}

