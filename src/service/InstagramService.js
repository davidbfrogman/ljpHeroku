// src/ig-service.js
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {dbpConfig} from 'dbpConfig';

//DI
@inject(HttpClient, dbpConfig)
export class InstagramService {

  constructor(http, dbpConfig) {
        this.http = http;
        this.dbpConfig = dbpConfig;

        this.token = '963639.54b46af.6b3db9c5455d42d99e25a06dfbef8dbd';
    }
  
  recentMedia() {
    // Return a promise which when resolved will respond with recent posts
    return this.http.jsonp(`https://api.instagram.com/v1/users/self/media/recent/?count=12&access_token=${this.token}`,'callback');
  }

  userDetails() {
    // Return a promise which when resolved will respond with user's profile
    return this.http.jsonp(`https://api.instagram.com/v1/users/self/?access_token=${this.token}`,'callback');
  }

}