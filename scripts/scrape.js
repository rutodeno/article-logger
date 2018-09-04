let cheerio = require('cheerio');
let axios = require('axios');

const scrape = () => {
   return axios.get("https://www.desiringgod.org/resources/all")
        .then(function (response) {
            var $ = cheerio.load(response.data);
            var articles =  []; 

            $(".card--resource").each(function (i, element) {
                var result = {};

                result.headline = $(this)
                    .children("a")
                    .find("h2")
                    .text()
                    .trim();
                result.link = $(this)
                    .children("a.card__shadow")
                    .attr("href");

                result.author = $(this)
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
            console.log(articles);
            return articles;
        })
}

module.exports = scrape;