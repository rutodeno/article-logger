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
                renderArticles(data)
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
                        "<a href = 'https://www.desiringgod.org"+data.link+"' target='_blank'>",
                        "<h5 class='card-title'>" +data.headline+ " </h5></a>",
                        "<h6>"+data.author+"</h6>",
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
        
    }

    function handleArticleNotes() {

    }

    function handleArticleDelete() {
        
    }

    function handleNoteSave() {
        let noteData;
        let newNote = $(".bootbox-body textarea").val().trim();
        if (newNote) {
            noteData = { _headlineId: $(this).data("article")._id, noteText: newNote }
            $.post("/api/note", noteData).then(function () {
                bootbox.hideAll();
            });
        }
    }

    function handleNoteDelete() {
        let noteToDelete = $(this).data("_id");
        $.ajax({
            url: "/api/note/" + noteToDelete,
            method: "DELETE"
        }).then(function () {
            bootbox.hideAll();
        })
    }

});