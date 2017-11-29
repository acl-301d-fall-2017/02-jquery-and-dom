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
    $newArticle.find('.article-body').html(this.body);
    $newArticle.find('time').text(this.publishedOn);

    $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000) + ' days ago');
    $newArticle.append('<hr>');
    return $newArticle;
};

rawData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// TODO: Refactor these for loops using the .forEach() array method.

rawData.forEach(function(artObj) {
    articles.push(new Article(artObj));
});

articles.forEach(function(article){
    $('#articles').append(article.toHtml());
});
