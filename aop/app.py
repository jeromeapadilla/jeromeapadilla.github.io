from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

vocabulary = {
    "hello": "hola",
    "goodbye": "adios",
    "thank you": "gracias",
    "no": "no",
    "yes": "si",
    # Add more words and their translations here.
}

def flashcards():
    word, translation = random.choice(list(vocabulary.items()))
    return word, translation

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_flashcard', methods=['POST'])
def get_flashcard():
    word, translation = flashcards()
    return jsonify({'word': word, 'translation': translation})

if __name__ == '__main__':
    app.run(debug=True)
