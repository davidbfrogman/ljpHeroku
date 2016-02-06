import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import {dbpConfig} from 'dbpConfig';
import  './../3rdParty/appear.js';

@inject(HttpClient, dbpConfig)
export class dbprecentinstagrams {
    posts = [];
    userdata = {};

    constructor(http, dbpConfig) {
        console.log('In the constructor for recent instagrams')
        this.dbpConfig = dbpConfig;
        this.http = http;

        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl(this.dbpConfig.dbpApiBaseUrl);
        });
    }

    //Attached here is different than activate.  I think activate is only for when you actually navigate to that page.
    //attached here is for controls when they're attached to the page.
    attached() {
        this.http.fetch('GetCachedInstagramMedia')
            .then(response => response.json())
            .then(posts => this.posts = posts)
            .then(
                console.log('done getting back posts for instagram')
                );

        this.http.fetch('GetCachedInstagramUserData')
            .then(response => response.json())
            .then(userdata => this.userdata = userdata)
            .then(
                console.log('done getting back userdata for instagram')
                )
           .then( () =>{ $('#img-profile').attr("src", this.userdata.profileImageUrl); });
           
       this.drawCounters();
    }

    drawCounters() {
        $('.progress-bar').each(function (i) {
            $(this).appear(function () {
                var percent = $(this).attr('aria-valuenow');
                $(this).animate({ 'width': percent + '%' });
                $(this).find('span').animate({ 'opacity': 1 }, 900);
                $(this).find('span').countTo({ from: 0, to: percent, speed: 900, refreshInterval: 30 });
            });
        });

        $('.counter-item').each(function (i) {
            $(this).appear(function () {
                var number = $(this).find('.counter-number').data('number');
                $(this).find('.counter-number span').countTo({ from: 0, to: number, speed: 1200, refreshInterval: 30 });
            });
        });
    }
}
