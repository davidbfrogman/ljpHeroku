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
  
  activate(){
      console.log('actually in the activate method for my blog posts');
      // return this.http.fetch('GetCachedBlogPosts')
      // .then(response => response.json())
      // .then(posts => this.posts = posts);
  }

  //Attached here is different than activate.  I think activate is only for when you actually navigate to that page.
  //attached here is for controls when they're attached to the page.
  attached() {
    return this.http.fetch('GetCachedBlogPosts')
      .then(response => response.json())
      .then(posts => this.posts = posts)
      .then(() => this.LogDetailsAboutBlogRequest(this.posts));  
    }
    
   LogDetailsAboutBlogRequest(posts) {
      console.log('Blog Request Successful.');
      console.log('Got back ' + posts.length + ' from my blog.');
      var firstPostDate = new Date(posts[0].date);
      console.log('Most Recent Post on:' + firstPostDate.toDateString());

      for (var i = 0; i < posts.length; i++) {
        var postDate = new Date(posts[i].date);
        posts[i].formattedDate = postDate.toDateString();
      } 
  }
}
