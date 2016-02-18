import {inject} from 'aurelia-framework';
import {dbpUtility} from 'dbpUtility';

@inject(dbpUtility)
export class faq {
    constructor( dbpUtility) {
        this.heading = 'FAQ';
        this.dbpUtility = dbpUtility;
    };
    
    attached()
    {
        document.title = "Denver Fashion Photographer || FAQ";
        
        this.dbpUtility.shrinkHeroModule();
        this.dbpUtility.scrollToTopOfPage();
    }
}

