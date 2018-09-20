$(document).ready(function() {

    let articleContainer = $(".articleContainer");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);

    initPage();

    function initPage() {
        $.get("/api/articles?saved=false").then(function(data) {
            console.log(data);
            if (data && data.length) {
                renderArticles(data);
            } else {
                renderEmpty();
            }
        })
    }   


    function renderArticles(data) {
        for(var i = 0; i < data.length; i++) {
            var biggerDiv = $("<div data-id='" +data[i]._id+ "' class='card-panel'>");
            $(biggerDiv).append("<a href = https://www.desiringgod.org/" +data[i].link+" target='_blank'> <h4>" +data[i].title + "</h4> by " + data[i].author + "<br />"+ "</a> " +"<br />"); 
            $(biggerDiv).append("<button data-target='modal1' data-id='" +data[i]._id+ "' class='btn modal-trigger' id = 'modalTrigger'>Comment</button>");
            articleContainer.append(biggerDiv);
        }
    }

    function renderEmpty() {
        let emptyAlert = $(
            [ 
                "<div class='alert alert-warning text center'>",
                "<h4>No new articles today, Sorry!!</h4>",
                "</div>",
                "<div class='card",
                "<div class='card-header text center>",
                "<h3What would you like to do?</h3>",
                "</div>",
                "<div class='card-body text-center'>",
                "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
                "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
                "</div>",
                "</div>"
            ].join("")
        );
        articleContainer.append(emptyAlert);
    }
    

    function handleArticleSave() {
        let articleToSave =$(this)
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
