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
                "<div class='card'>",
                "<div class='card-header'>",
                "<h3>",
                "<a class='article-link' target='_blank' href='" +article.url+ "'>", article.headline, "</a>",
                "<a class='btn btn-danger delete'", "Delete From Saved", "</a>",
                "<a class='btn btn-info notes'>Article Notes</a>",
                "</h3>",
                "</div>",
                "</div>"
            ].join("")
        );

        card.data("_id", article._id);
        return card;
    }

    function renderEmpty() {
        let emptyAlert =$(
            [
                "<div class='alert alert-warning text-center'>",
                "<h4>We need new saved articles</h4>",
                "</div>",
                "<div class='card'>",
                "<div class='card-header text-center'>",
                "<h3>Please browse available articles</h3>",
                "</div>",
                "<div class='card-body text-center'>",
                "<h4><a href='/'>Browse Articles</a></h4>",
                "</div>",
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
            $.post("/api/notes", noteData).then(function () {
                bootbox.hideAll();
            });
        }
    }

    function handleNoteDelete() {
        let noteToDelete = $(this).data("_id");
        $.ajax({
            url: "/api/notes/" + noteToDelete,
            method: "DELETE"
        }).then(function () {
            bootbox.hideAll();
        })
    }

});