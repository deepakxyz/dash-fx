const axios = require('axios');
const cheerio = require('cheerio');

axios.get('https://www.artofvfx.com/category/interviews/')
    .then((res)=>{
        // load axios data
        const $ = cheerio.load(res.data);

        // const articles = $('.td-block-span4').html();
        // empty article array
        const articles = {};
        $('.td-block-span4').each((index, element)=> {
            const title = $(element).children().find('h3.entry-title').text();
            const url = $(element).find('h3.entry-title').find('a').attr("href");
            const imgUrl = $(element).find('img.entry-thumb').attr('data-img-url');
            let subTitle = $(element).find('div.td-excerpt').text();
            // remove all the special characters
            subTitle = subTitle.replace(/(\r\n|\n|\r)/gm, "");
            // push it into the articles array
            articles[index] = {title,url,imgUrl,subTitle};
        });
        // console.log(articles);
        



    
    })
    .catch(err=>console.error(err));