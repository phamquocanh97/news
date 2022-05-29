$(document).ready(function() {
    $('.lightbox').click(function() {
        $('.backdrop, .box').animate({
            'opacity': '.50'
        }, 300, 'linear');
        $('.box').animate({
            'opacity': '1.00'
        }, 300, 'linear');
        $('.backdrop, .box').css('display', 'block');
    });
    $('.close').click(function() {
        $('.backdrop, .box').animate({
            'opacity': '0'
        }, 300, 'linear');
        $('.backdrop, .box').css('display', 'none');

    });

    $('.backdrop').click(function() {
        close_box();

    });

    function close_box() {
        $('.backdrop, .box').animate({
            'opacity': '0'
        }, 300, 'linear');
        $('.backdrop, .box').css('display', 'none');
    }
    const input = $('#keywords');
    const topHeader = $('#top-header');
    const searchTopic = $('#search-topic');
    const apiKey = '097917e29c1e29721d1e0166763bef33';
    fetch('https://gnews.io/api/v4/top-headlines?&token=097917e29c1e29721d1e0166763bef33')
        .then(function(response) {
            return response.json();


        })
        .then(function(data) {
            for (var i = 0; i < data.articles.length; i++) {

                document.getElementById("top-header").innerHTML += "<div class='div'> <img  src='" + data.articles[i].image + "'></div>" + "<div><a href='" + data.articles[i].url + "'target='_blank' >" + data.articles[i].title + "</a><br>" + "<i>" + data.articles[i].publishedAt + "</i>" + "<p>" + data.articles[i].description + "</p>" + "</div><div style='clear:both'></div>";

            }
        });
    $('#search').click(function() {

        let topic = input.val();
        let url = `https://gnews.io/api/v4/search?q=${topic}&token=${apiKey}`;
        topHeader.html("");
        searchTopic.html("");


        $.ajax({
            type: "GET",
            url: url,
            dataType: 'json',
            beforeSend: function() {
                $('#loader').removeClass('hidden')
            },
            success: function(data) {

                for (var i = 0; i < data.articles.length; i++) {
                    document.getElementById("search-topic").innerHTML += "<div class='div'> <img  src='" + data.articles[i].image + "'></div>" + "<div><a href='" + data.articles[i].url + "'target='_blank' >" + data.articles[i].title + "</a><br>" + "<i>" + data.articles[i].publishedAt + "</i>" + "<p>" + data.articles[i].description + "</p>" + "</div><div style='clear:both'></div>";
                };
            },
            complete: function() {
                $('#loader').addClass('hidden')
                close_box();
            },
        });

    });
});