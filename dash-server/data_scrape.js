const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');


const get_sub_push = (fetchData,  filename,firstElementName,url) => {
    var existing_data = fs.readFileSync(filename);
    existing_data = JSON.parse(existing_data);
    cost = first_element = existing_data[0];
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
    url = "https://www.artofvfx.com/category/interviews/"
    axios.get(url)
        .then((res)=>{
            // load website data
            const $ = cheerio.load(res.data);

            // empty fecth data array
            const fetched_data = [];


            // get the required data and push it into an array
            $('.td-block-span4').each((index, element)=> {
                // get title of the article
                const title = $(element).children().find('h3.entry-title').text();
                // get url of the article
                const url = $(element).find('h3.entry-title').find('a').attr("href");
                // get image of the article
                const imgUrl = $(element).find('img.entry-thumb').attr('data-img-url');
                // get sub title data
                var subTitle = $(element).find('div.td-excerpt').text();
                // remove all the special characters
                subTitle = subTitle.replace(/(\r\n|\n|\r)/gm, "");
                // remove the extra white spaces
                subTitle = subTitle.trim();
                // create new date
                var date = new Date();
                // push it into the articles array
                fetched_data[index] = {title,url,imgUrl,subTitle,date};
            });

            get_sub_push(fetched_data,"artofvfx.json","title",url)

        })
        .catch(err=>console.error(err.message));
}

// beforeandafter
const beforeandafter = () => {
    let url = "https://beforesandafters.com/";
    axios.get(url)
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
                const subTitle = $(element).find('div.entry-content').children().text()
                // create new data
                var date = new Date();
                // push it into the article array
                fetched_data[index] = {title,url,imgUrl,subTitle,date};
            });

            // var data = JSON.stringify(fetched_data,null, 4);
            // fs.writeFile("beforeandafter.json",data,msg=>console.log("Done fetching from: " + "beforeandafter"));

            get_sub_push(fetched_data,"beforeandafter.json","title",url);
    })
}

// fxguide
const fxguide = () => {

    let url = "https://www.fxguide.com/";
    axios.get(url)
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
                const subTitle = $(element).find('div.fl-post-grid-text').find('div.fl-post-grid-content').children().text()
                // create new date
                var date = new Date();
                // push it into the articles array
                fetched_data[index] = {title,url,imgUrl,subTitle,date};
            });


                get_sub_push(fetched_data,"fxguide.json","title",url)

        })
        .catch(err=>console.error(err.message));
}

// foundry insights