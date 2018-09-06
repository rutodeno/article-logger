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
    let title = $("#titleinput").val()
    console.log(title);
    let body = $("#bodyinput").val()
    console.log(body);

    

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
       // $("#notes").empty();

    });

    $("#titleinput").val("");
    $("#bodyinput").val("");
    $("#closeBtn").modal("close");


    
});