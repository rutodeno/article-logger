
$.getJSON("/allarticles", function(data) {
    for(var i = 0; i < data.length; i++) {
        $("#articles").append("<p data-id'" +data[i]._id + "'>" +data[i].title + "<br/>" + data[i].author + "<br/>" + data[i].link + "</p>"); 
    }
    console.log(data);
});

$(document).on("click", "p", function() {
    $("#notes").empty();

    let thisId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url:"/allarticles"
    })
    .then(function(data) {
        console.log(data);
        $("#notes").append("<h2" + data[0].title + "</h2>");
        $("#notes").append("")
    })
})