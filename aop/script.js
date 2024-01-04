// Define your vocabulary here as a JavaScript object
var vocabulary = {
    "hello": "bonjour",
    "goodbye": "au revoir",
    "thank you": "merci",
    "no": "non",
    "yes": "oui"
    // Add more words and their translations here.
};

var lastWord = null;
var score = 0;
var correctCounter = 0;

function getRandomFlashcard() {
    var randomWord;
    do {
        randomWord = Object.keys(vocabulary)[Math.floor(Math.random() * Object.keys(vocabulary).length)];
    } while (randomWord === lastWord);

    lastWord = randomWord;
    var randomTranslation = vocabulary[randomWord];
    return { word: randomWord, translation: randomTranslation };
}

function showRandomFlashcard() {
    var flashcard = getRandomFlashcard();
    $('#word').text(flashcard.word);
    $('#translation').text(flashcard.translation).hide();
    $('#result').text('');
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        checkTranslation();
    }
}

function checkTranslation() {
    var userTranslation = $('#user_translation').val().trim().toLowerCase();
    var translation = $('#translation').text().trim().toLowerCase();

    if (userTranslation === translation) {
        score += 1;
        correctCounter += 1;
        $('#result').text('Correct! You have ' + score + ' points. (' + correctCounter + ' correct answers)');
        $('#correctCount').text(correctCounter); // Update correct counter on the page
        showRandomFlashcard(); // Show a new random question after a correct answer
    } else {
        $('#result').text('Incorrect. Try again.');
    }
}


$(document).ready(function() {
    showRandomFlashcard();

    $('#checkTranslation').click(checkTranslation);
    $('#word').click(function() {
        showRandomFlashcard();
        $('#result').text('');
    });
});
