$(document).ready(function() {

    $.getJSON("/allarticles", function(data) {
        for(var i = 0; i < data.length; i++) {
            var biggerDiv = $("<div data-id='" +data[i]._id+ "' class='card-panel'>");
            $(biggerDiv).append("<p>" +data[i].title + "<br />" + data[i].author + "<br />" + data[i].link + "</p>"); 
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
        console.log("thisId " +thisId)

        $.ajax({
            methos: "GET",
            url: "/allarticles/" +thisId
        })
        .then(function(data) {
            console.log(data);


            $(".modalHeader").html(data[0].title);
            $("#savenote").append("<data-id '" + data[0]._id + "'>");
        })

    })

/*
    $(document).on("click", "p", function() {
       // $("#notes").empty();

       $('.modal').modal('open');

        let thisId = $(this).attr("data-id");

        console.log(thisId)

        $.ajax({
            method: "GET",
            url: "/allarticles/" + thisId
        })
        .then(function(data) {

            


            console.log(data);
            
            $("#notes").append("<h6 class='header'>" + data[0].title + "</h6>");
            $("#notes").append("<input id='titleinput' name='title' >");
            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            $("#notes").append("<button  class='btn waves-effect waves-light' data-id'" + data[0]._id + "' id='savenote'> Save Note</button> ");
            
            if(data.note) {
                $("#titleinput").val(data.note.title);
                $("#bodyinput").val(data.note.body);
            }
        });
    }); 
*/
    $(document).on("click", "#savenote", function() {
        let thisId = $(this).attr("data-id");

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


});
