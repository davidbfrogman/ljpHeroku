import {inject} from 'aurelia-framework';
import {PortfolioManagerService} from './PortfolioManager/PortfolioManagerService';
import {dbpUtility} from 'dbpUtility';


@inject(PortfolioManagerService, dbpUtility)
export class ImageDetail {
    
    portfolioBook = {};
 
     constructor(PortfolioManagerService, dbpUtility) {
        this.service = PortfolioManagerService;
        this.dbpUtility = dbpUtility;
        
        
    }
    
    activate(params, routeConfig){
        
        this.service.getById(params.id)
            .then(portfolioBook => {
                this.portfolioBook = portfolioBook;
            })
    }
    
    attached(){
        
    }
}