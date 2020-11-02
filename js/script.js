function getQuote() {
    $.getJSON("..//quotes.json",
    function (data, textStatus, jqXHR) {
        console.log(data[Math.random() * data.length+1]);
        var quote_text = data[Math.floor(Math.random() * data.length)];
        $('.quote-text').text(quote_text);
    }
);
}