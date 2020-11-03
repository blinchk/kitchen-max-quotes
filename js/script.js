var audio = new Audio('https://github.com/blinchk/kitchen-max-quotes/blob/master/audio/thelostsong.mp3?raw=true');
var audio_playing = false;
var audio_isenabled = true;
var first_load = true;
audio.volume = 0.35;
audio.loop = true;

function getQuote() {
    $.getJSON("https://raw.githubusercontent.com/blinchk/kitchen-max-quotes/master/quotes.json",
    function (data, textStatus, jqXHR) {
        console.log(data[Math.random() * data.length+1]);
        var quote_text = data[Math.floor(Math.random() * data.length)];
        $('.quote-text').text(quote_text);
    }
);
}

function playAudio() {
    console.log(audio_playing);
    if (audio_playing == false) {
        audio_playing = true;
        audio.play();
    }
}

function nextButtonClick() {
    getQuote();
    if (audio_isenabled) {
        playAudio();
        audio_playing = true;
    }
    if (first_load && audio_playing) {
        playAudio();
        audio_playing = true;
        $('#music-button').text("Выключить музыку");
    }
}

function offOnAudio() {
    if (first_load && !audio_playing) {
        audio.play();
        audio_playing = true;
        first_load = false;
        $('#music-button').text("Выключить музыку");
    }
    else {
        if (audio_isenabled) {
            audio_isenabled = false;
            if (audio_playing) {
                audio.pause();
                audio_playing = false;
            }
            $('#music-button').text("Включить музыку");
        }
        else {
            audio_isenabled = true;
            if (!audio_playing) {
                audio.play();
                audio_playing = true;
            }
            $('#music-button').text("Выключить музыку");
        }
    }
}

function loadPage() {
    getQuote();
    if (first_load) {
        $('#music-button').text("Включить музыку");
    }
}