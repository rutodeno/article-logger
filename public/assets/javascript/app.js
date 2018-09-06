$(document).ready(function() {

    let articleContainer = $(".articleContainer");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);

    initPage();

    function initPage() {


    }



    $.getJSON("/api/articles", function(data) {
        for(var i = 0; i < data.length; i++) {
            var biggerDiv = $("<div data-id='" +data[i]._id+ "' class='card-panel'>");
            $(biggerDiv).append("<a href = https://www.desiringgod.org/" +data[i].link+" target='_blank'> <h4>" +data[i].title + "</h4> by " + data[i].author + "<br />"+ "</a> " +"<br />"); 
            $(biggerDiv).append("<button data-target='modal1' data-id='" +data[i]._id+ "' class='btn modal-trigger' id = 'modalTrigger'>Comment</button>");
            $("#articles").append(biggerDiv);
        }
    });


});
