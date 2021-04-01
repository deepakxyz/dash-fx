const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');


const get_sub_push = (fetchData,  filename,firstElementName,url) => {
    var existing_data = fs.readFileSync(filename);
    existing_data = JSON.parse(existing_data);
    const first_element = existing_data[0];
    var title = first_element[firstElementName];

    // subract the data
    var newData =  [];
    let i = 0;
    for (i; i < fetchData.length; i++){
        var getTitle = fetchData[i][firstElementName];
        if(getTitle === title){
            break;
        }else{
            newData[i]=fetchData[i];
        }
    } 

    // update info
    if (newData.length > 0){
        console.info(newData.length + ": Articles updated.")
    }else{
        console.info("No new articles found.")
    }

    // wirte the final data
    const finalData =  newData.concat(existing_data);
    var write_data = JSON.stringify(finalData,null, 4);
    fs.writeFile(filename,write_data,msg=>console.log("Done fetching from: " + url));
}


const artofvfx = () => {
    site_url = "https://www.artofvfx.com/category/interviews/" 
    axios.get(site_url)
        .then((res)=>{
            // load website data
            const $ = cheerio.load(res.data);

            // empty fecth data array
            const fetched_data = [];

            // get the top two data
            // const topTwoLink = []
            // $('.td_module_mx5').each((index,element)=>{
            //     // get the url of the article
            //     var title = $(element).find('div.td-meta-info-container').find('a').text();
            //     var url = $(element).find('div.td-meta-info-container').find('a').attr('href');
            //     var imgUrl = $(element).find('div.td-module-thumb').children().children().attr('data-img-url');
            //     topTwoLink[index] = url;
            // })
         

            // get the required data and push it into an array
            $('.td-block-span4').each((index, element)=> {
                // get title of the article
                const title = $(element).children().find('h3.entry-title').text();
                // get url of the article
                const url = $(element).find('h3.entry-title').find('a').attr("href");
                // get image of the article
                const imgUrl = $(element).find('img.entry-thumb').attr('data-img-url');
                // get sub title data
                var description = $(element).find('div.td-excerpt').text();
                // remove all the special characters
                description = description.replace(/(\r\n|\n|\r)/gm, "");
                // remove the extra white spaces
                description = description.trim();
                // create new date
                var type = "Interview";
                var date = new Date();
                // push it into the articles array
                fetched_data[index] = {title,url,imgUrl,description,type,date};
            });

            get_sub_push(fetched_data,"artofvfx.json","title",site_url)

        })
        .catch(err=>console.error(err.message));
}


// beforeandafter
const beforeandafter = () => {
    let site_url = "https://beforesandafters.com/";
    axios.get(site_url)
        .then((res)=>{
            // load website data
            const $ = cheerio.load(res.data);
            

            // empty fecth data array
            const fetched_data = [];

            // get the requried data and push it into an array
            $('article').each((index,element)=>{
                // get title of the article
                const title = $(element).children().find('h1.entry-title').text();
                // get the url of the article
                const url = $(element).children().find('h1.entry-title').children().attr('href');
                // get the image of the article
                const imgUrl =  $(element).children().find('img.attachment-patch-masonry-image').attr('src');
                // get sub title
                const description = $(element).find('div.entry-content').children().text()
                // type
                var type = "Article";
                // create new data
                var date = new Date();
                // push it into the article array
                fetched_data[index] = {title,url,imgUrl,description,type,date};
            });

            // var data = JSON.stringify(fetched_data,null, 4);
            // fs.writeFile("beforeandafter.json",data,msg=>console.log("Done fetching from: " + "beforeandafter"));

            get_sub_push(fetched_data,"beforeandafter.json","title",site_url);
    })
}



// fxguide
const fxguide = () => {

    let site_url = "https://www.fxguide.com/";
    axios.get(site_url)
        .then((res)=>{
            // load website data
            const $ = cheerio.load(res.data);

            // empty fecth data array
            const fetched_data = [];


            // get the required data and push it into an array
            $('.fl-post-grid-post').each((index, element)=> {
                // get title of the article
                var title = $(element).find('div.fl-post-grid-text').find('h2.fl-post-grid-title').text();
                title = title.replace(/(\r\n|\n|\r)/gm, "");
                // get url of the article
                const url = $(element).find('div.fl-post-grid-text').find('h2.fl-post-grid-title').children().attr('href');
                // get the image of the article
                const imgUrl = $(element).find('div.fl-post-grid-image').children().children().attr('src');
                // get sub title
                const description = $(element).find('div.fl-post-grid-text').find('div.fl-post-grid-content').children().text()
                // type
                var type = "Article";
                // create new date
                var date = new Date();
                // push it into the articles array
                fetched_data[index] = {title,url,imgUrl,description,type,date};
            });


                get_sub_push(fetched_data,"fxguide.json","title",site_url)

        })
        .catch(err=>console.error(err.message));
}


// foundry insights
const foundryinsights = () => {
    let site_url = "https://www.foundry.com/insights";
    axios.get(site_url)
        .then((res)=>{
            // load website data
            const $ = cheerio.load(res.data);

            // empty fecth data array
            const fetched_data = [];


            // get the required data and push it into an array
            $('.featured-card').each((index, element)=> {
                // get title of the article
                var title = $(element).children().find('h3.featured-card__title').html()
                title = title.trim()
                // get url of the artile
                var url = $(element).children('a').attr('href');
                url = 'https://www.foundry.com/' + url;
                // get the image url
                var imgUrl = $(element).find('div.featured-card__image-container').children('img').attr("src");
                imgUrl = "https://www.foundry.com" + imgUrl;
                // get description
                var description = $(element).find('p.featured-card__description').text();
                description = description.replace(/(\r\n|\n|\r)/gm, "");
                description = description.trim()
                // type of the content
                var type = $(element).find('span.featured-card__tag').text()
                // create new date
                var date = new Date();
                // push it into the articles array
                fetched_data[index] = {title,url,imgUrl,description,type,date};
            });


                get_sub_push(fetched_data,"foundryinsights.json","title",site_url)

        })
        .catch(err=>console.error(err.message));
}

artofvfx()
beforeandafter()
fxguide()
foundryinsights()