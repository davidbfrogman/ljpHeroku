import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class dbpbottomnav {
    
    constructor(Router){
        this.router = Router;
        console.log(this.router);
    }
    
    attached() {
        
    }
}
