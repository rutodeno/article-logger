$(document).ready(function() {
    let articleContainer = $(".article-container");

    $(document).on("click", ".btn.delete", handleArticleDelete);
    $(document).on("click", ".btn.notes", handleArticleNotes);
    $(document).on("click", ".btn.save", handleNoteSave);
    $(document).on("click", ".btn.note-delete", handleNoteDelete);

    initPage();

    function initPage() {
        articleContainer.empty();
        $.get("/api/article?saved=true").then(function(data) {
            if(data && data.length) {
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

});