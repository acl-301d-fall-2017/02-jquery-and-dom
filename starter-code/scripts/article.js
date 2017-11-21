'use strict';

const articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// The purpose is to create a new instance of Article, which will populate on the page. It's capitalized because that is the naming convention for constructor functions.  
// raw data is an array of objects; rawDataObj represents one of those objects, which we will pass into Article to create an instance of Article. 

// TODO: Use the JS object that is passed in to complete this constructor function:
// Save ALL the properties of `rawDataObj` into `this`

function Article (rawDataObj) {
    this.title = rawDataObj.title;
    this.category = rawDataObj.category;
    this.author = rawDataObj.author;
    this.authorURL = rawDataObj.authorURL;
    this.publishedOn = rawDataObj.publishedOn;
    this.body = rawDataObj.body;
}

// COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
// Cuts down on keystrokes - you don't have to type out every article layout.

Article.prototype.toHtml = function() {

    const $newArticle = $('article.template').clone();
    $newArticle.removeClass('template');
    if (!this.publishedOn) $newArticle.addClass('draft');
    $newArticle.attr('data-category', this.category);

    $newArticle.find('address').text(this.author);
    $newArticle.find('a').text(this.authorURL);
    $newArticle.find('h1').text(this.title);
    $newArticle.find('.article-body').text(this.body);
    $newArticle.find('time').text(this.publishedOn);

    
    
    /* TODO: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name,
      2. author url,
      3. article title,
      4. article body, and
      5. publication date. */

    // REVIEW: Display the date as a relative number of 'days ago'
    $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000) + ' days ago');
    $newArticle.append('<hr>');
    return $newArticle;
};

rawData.sort(function(a,b) {
    // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// TODO: Refactor these for loops using the .forEach() array method.

rawData.forEach(function(artObj) {
    articles.push(new Article(artObj));
});

for(let i = 0; i < articles.length; i++) {
    $('#articles').append(articles[i].toHtml());
}
