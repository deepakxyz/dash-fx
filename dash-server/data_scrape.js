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

    // wirte the final data
    const finalData =  newData.concat(existing_data);
    var write_data = JSON.stringify(finalData,null, 4);
    fs.writeFile(filename,write_data,msg=>console.log("Done fetching from:" + url));
}


axios.get('https://www.artofvfx.com/category/interviews/')
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

        get_sub_push(fetched_data,"artofvfx.json","title","ArtofVfx")

    })
    .catch(err=>console.error(err.message));



        // // // data from the file
        // var existing_data = fs.readFileSync('artofvfx.json');
        // existing_data = JSON.parse(existing_data);
        // const first_element = existing_data[0];
        // var title = first_element['title'];

        // // get the new data
        // var newData = [];
        // let i = 0;
        // for(i; i < fetched_data.length; i++){
        //     var getTitle = fetched_data[i]['title'];
        //     if (getTitle === title){
        //         break;
        //     }else{

        //         newData[i] = fetched_data[i];
        //     }
        // }
        

        // // final data
        // const final_data = newData.concat(existing_data);
        // var write_data = JSON.stringify(final_data, null, 4);
        // // console.log(write_data);
        // fs.writeFile('artofvfx.json', write_data,msg=>console.log('Art of vfx data written'));