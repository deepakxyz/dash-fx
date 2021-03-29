const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');


// read artofvfx json file
// readFileSync : next line of code will not run until the readFileSync gets the data
// var artofvfx_json = fs.readFileSync('artofvfx.json');
// var artofvfx_json = JSON.parse(artofvfx_json);

// artfovfx 
const artofvfx = () =>{

    axios.get('https://www.artofvfx.com/category/interviews/')
        .then((res)=>{
            // load axios data
            const $ = cheerio.load(res.data);

            // const articles = $('.td-block-span4').html();
            // empty article array
            const articles = [];
            $('.td-block-span4').each((index, element)=> {
                const title = $(element).children().find('h3.entry-title').text();
                const url = $(element).find('h3.entry-title').find('a').attr("href");
                const imgUrl = $(element).find('img.entry-thumb').attr('data-img-url');
                var subTitle = $(element).find('div.td-excerpt').text();
                // remove all the special characters
                subTitle = subTitle.replace(/(\r\n|\n|\r)/gm, "");
                // push it into the articles array
                articles[index] = {title,url,imgUrl,subTitle};
            });
            // write data to the server
            var data = JSON.stringify(articles, null, 4);
            fs.writeFile('artofvfx.json',data,msg=>console.log('Art of vfx Done.'));
        })
        .catch(err=>console.error("Axios Error at the website 'ArtofVfx'"));
}
// artofvfx()


// loop the fetch

setTimeout(() => {
artofvfx();
}, 5000);

