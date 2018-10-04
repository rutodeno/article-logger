$(document).ready(function () {
    let articleContainer = $(".article-container");

    $(document).on("click", ".btn.delete", handleArticleDelete);
    $(document).on("click", ".btn.notes", handleArticleNotes);
    $(document).on("click", ".btn.save", handleNoteSave);
    $(document).on("click", ".btn.note-delete", handleNoteDelete);

    initPage();

    function initPage() {
        articleContainer.empty();
        $.get("/api/article?saved=true").then(function (data) {
            if (data && data.length) {
                articleContainer.append(renderArticles(data));
            } else {
                renderEmpty();
            }
        });
    }

    function renderArticles(articles) {
        let articleCards = [];

        for (let i = 0; i < articles.length; i++) {
            articleCards.push(createCard(articles[i]));
        }

        articleContainer.append(articleCards);
    }

    function createCard(article) {
        let card = $(
            [
                "<div  class='card border-dark mb-3' style='max-width: 18rem;'>",
                    "<div class='card-body '>",
                        "<a href = 'https://www.desiringgod.org"+article.link+"' target='_blank'>",
                        "<h5 class='card-title'>" +article.headline+ " </h5></a>",
                        "<h6>"+article.author+"</h6>",
                        "<button type='button' class='btn btn-sm btn-outline-danger delete'>Delete</button>",
                        "<button type='button' class='btn btn-sm btn-outline-info notes'>Add notes</button>",

                    "</div>",
                "</div>"
            ].join("")
        );

        card.data("_id", article._id);
        return card;
    }

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
        articleContainer.append(emptyAlert);
    }

    function renderNotesList(data) {
        let notesToRender = [];
        let currentNote;
        if(!data.notes.length) {
            currentNote = [
                "<li class = 'list-group-item'>",
                "No notes for this article yet.",
                "</li>"
            ].join("");
            notesToRender.push(currentNote);
        } else {
            for (let i = 0; i < data.notes.length; i++) {
                currentNote = $(
                    [
                        "<li class='list-group-item note'>",
                        data.notes[i].noteText,
                        "<button class='btn btn-danger note-delete'>x</button>",
                        "</li>"
                    ].join("")
                );

                currentNote.children("button").data("_id", data.notes[i]._id);
                notesToRender.push(currentNote);
            }
        }
        $(".note-container").append(notesToRender);
    }

    function handleArticleNotes(event) {
        let currentArticle = $(this)
            .parents(".card")
            .data();
        $.get("/api/note/" +currentArticle._id).then((data) => {
            let modalText = [
                "<div class='container-fluid text-center'>",
                "<h4>Notes For Article: ",
                currentArticle._id,
                "</h4>",
                "<hr />",
                "<ul class='list-group note-container'>",
                "</ul>",
                "<textarea placeholder='New Note' rows='4' cols='60'></textarea>",
                "<button class='btn btn-success save'>Save Note</button>",
                "</div>"
            ].join("");

            bootbox.dialog({
                message: modalText,
                closeButton: true
            });

            let noteData = {
                _id: currentArticle._id,
                notes: data || []
            };

            $(".btn.save").data("article", noteData);
            renderNotesList(noteData);
        })
    }

    function handleArticleDelete() {
        let articleToDelete = $(this)
        .parents(".card")
        .data();

        $.ajax({
            method: "DELETE",
            url: "/api/article/" + articleToDelete._id
        }).then((data) => {
            if(data.ok) {
                initPage();
            }
        })
        
    }

    function handleNoteSave() {
        let noteData;
        let newNote = $(".bootbox-body textarea").val().trim();
        if (newNote) {
            noteData = { _headlineId: $(this).data("article")._id, noteText: newNote }
            $.post("/api/note", noteData).then(() => bootbox.hideAll());
        }
    }

    function handleNoteDelete() {
        let noteToDelete = $(this).data("_id");
        $.ajax({
            url: "/api/note/" + noteToDelete,
            method: "DELETE"
        }).then(() => bootbox.hideAll())
    }

});