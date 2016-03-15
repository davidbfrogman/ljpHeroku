import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class dbpextracontent {
    
    constructor(Router){
        this.router = Router;
    }
    
    attached() {
        
    }
}
