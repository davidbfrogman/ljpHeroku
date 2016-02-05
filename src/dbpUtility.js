import {inject} from 'aurelia-framework';
import {dbpheader} from 'controls/dbpheader';

@inject(dbpheader)
export class dbpUtility {
    constructor(dbpheader) {
        this.dbpheader = dbpheader;
    };
    
    scrollToTopOfPage()
    {
       if($(window).scrollTop() > 20)
       {
            $('html, body').animate({
                scrollTop: 0
            }, 1000);
        }
    }
    
    shrinkHeroModule(){
        this.dbpheader.shrinkHeroModule(350, 175);
    }
}

