$(document).ready(function() {

    $.getJSON("/allarticles", function(data) {
        for(var i = 0; i < data.length; i++) {
            var biggerDiv = $("<div data-id='" +data[i]._id+ "' class='card-panel'>");
            $(biggerDiv).append("<a href = https://www.desiringgod.org/" +data[i].link+" target='_blank'> <h4>" +data[i].title + "</h4> by " + data[i].author + "<br />"+ "</a> " +"<br />"); 
            $(biggerDiv).append("<button data-target='modal1' data-id='" +data[i]._id+ "' class='btn modal-trigger' id = 'modalTrigger'>Comment</button>");
            $("#articles").append(biggerDiv);
        }
    });


    $(document).on("click", "#modalTrigger", function() {

        $('.modal').modal();

        $('#modal1').modal("open");

        $(document).on("click", "#closeBtn", function() {

            $("#closeBtn").modal("close");

        })
        
        

        let thisId = $(this).attr("data-id");
        console.log("thisId get" +thisId)

        $.ajax({
            methos: "GET",
            url: "/allarticles/" +thisId
        })
        .then(function(data) {
            console.log(data);


            $(".modalHeader").html(data[0].title);
            $("#savenote").attr("data-id",  data[0]._id );

            /*

            if(data.note) {
                $("#titleinput").val(data.note.title);
                $("#bodyinput").val(data.note.body);
            }

            */

        })

    })



    $(document).on("click", "#savenote", function() {
        let thisId = $(this).attr("data-id");
        console.log("thisId post" +thisId)

        console.log( $("#titleinput").val())
    /*
        $.ajax({
            method: "POST",
            url: "/allarticles/" +thisId,
            data: {
                title: $("#titleinput").val(),
                body: $("#bodyinput").val()
            }
        })
        .then(function(data) {
            console.log(data);
            $("#notes").empty();

        });

        $("#titleinput").val("");
        $("#bodyinput").val("");
    });

    */

});
