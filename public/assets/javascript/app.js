$(document).ready(function() {

    $(document).on("click", "#btn.save", handleArticleSave);
    $(document).on("click", "#scrapeBtn", handleArticleScrape);

    initPage();
    function initPage() {
        let articleContainer = $(".article-container");

        $.get("/api/article").then(function(data) {
            console.log(data);
            if (data && data.length) {
                articleContainer.append(renderArticles(data));

                $(document).ready(function() {
                    $(".card").hover(
                        // trigger hover in
                        function () {
                            $(this).animate({
                                marginTop: "-=1%"
                            }, 200)
                        }, 
            
                        // trigger hover out
            
                        function () {
                            $(this).animate({
                                marginTop: "0%"
                            }, 200)
                        }
                    );
                });

            } else {
                articleContainer.append(renderEmpty());
            }
        })
    }   


    function renderArticles(articles) {
        let articleCards = [];
        for(let i = 0; i < articles.length; i++) {
            
            articleCards.push(createCard(articles[i]));
        }

        return articleCards;
    }

    function createCard(data) {
        let card = $(
            [
                "<div  class='card border-dark mb-3' style='max-width: 18rem;'>",
                    "<div class='card-body '>",
                        "<a href = 'https://www.desiringgod.org"+data.link+"' target='_blank'>",
                        "<h5 class='card-title'>" +data.headline+ " </h5></a>",
                        "<h6>"+data.author+"</h6>",
                    "</div>",
                "</div>"
            ].join("")
        );

        card.data("_id", data._id);

        return card;

    };

    function renderEmpty() {
        let emptyAlert = $(
            [
                "<div class='card border-warning mb-3' style='max-width: 18rem;'>",
                    "<div class='card-body text-warning'>",
                        "<div class= 'alert alert-warning ' role='alert'  >",
                            "<h6 class='alert-heading'>No new articles as of now, Sorry!!</h6>",
                            "<hr>",
                            "<h6> What would you like to do? </h6>",
                            "<hr>",
                            "<h6><a class='scrape-new'>Try Scraping New Articles</a></h6>",
                            "<h6><a href='/saved'>Go to Saved Articles</a></h6>",
                        "</div>",
                    "<div>",
                "</div>"

            ].join("")
        );
        return emptyAlert;
    }


    function handleArticleSave() {
        let articleToSave = $(this)
            .parents(".card")
        .data()
        articleToSave.saved = true;

        $.ajax({
            method: "PUT",
            url: "/api/articles/" + articleToSave._id,
            data: articleToSave
        }).then(function (params) {

            if(data.saved){
                initPage();
            }
            
        });
    }


    function handleArticleScrape() {
        $.get("/api/fetch")
        .then(function(data) {
            initPage();
            bootbox.alert("<h3 class='text-center m-top-80'"+data.message+"</h3>");
        })
    }
});
