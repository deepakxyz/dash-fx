const request = require('request');
const cheerio =  require('cheerio');

request('https://www.artofvfx.com/category/interviews/', (error,res,html)=> {
    if(!error && res.statusCode == 200){
        const $ = cheerio.load(html);

        const articles = $('.td-block-span4');

        // console.log(articles.html())
        // console.log(articles.text())
        const output = articles.find('h3').text()
        console.log(output);

    }
});