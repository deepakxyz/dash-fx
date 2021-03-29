const axios = require('axios');
const cheerio = require('cheerio');

axios.get('https://www.artofvfx.com/category/interviews/').then((res)=>{
    const $ = cheerio.load(res.data);

    console.log($('h3').html());
})