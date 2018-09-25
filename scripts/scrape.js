let cheerio = require('cheerio');
let axios = require('axios');

const scrape = () => {
   return axios.get("https://www.desiringgod.org/resources/all")
        .then(function (response) {
            var $ = cheerio.load(response.data);
            var articles =  []; 

            $(".card--resource").each(function (i, element) {

                let headline = $(this)
                    .children("a")
                    .find("h2")
                    .text()
                    .trim();
                let link = $(this)
                    .children("a.card__shadow")
                    .attr("href")


                let author = $(this)
                    .children("a")
                    .find(".card__author")
                    .text()
                    .trim();    
                
                if(headline && link && author) {

                    let dataToAdd = {
                        headline: headline,
                        link: link,
                        author: author
                    }

                    articles.push(dataToAdd);

                }
                    
            })
            return articles;
        })
}

module.exports = scrape;

