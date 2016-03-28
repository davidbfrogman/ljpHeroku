import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import {dbpConfig} from 'dbpConfig';

@inject(HttpClient, dbpConfig)
export class dbprecentposts {
    posts = [];

    constructor(http, dbpConfig) {
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
        return this.http.fetch('GetCachedBlogPosts')
            .then(response => response.json())
            .then(posts => this.posts = posts);
    }

    hide() {
        $('#sec-recent-posts').hide();
    }
    
    show() {
        $('#sec-recent-posts').show();
    }
}
