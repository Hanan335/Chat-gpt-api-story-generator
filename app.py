import os
from flask import Flask, render_template, request, jsonify
import openai

app = Flask(__name__)

# Get your OpenAI API key from the environment variable
openai.api_key = os.environ.get('OPENAI_API_KEY')

# Home route to serve index.html
@app.route('/')
def index():
    return render_template('index.html')

# Route to generate answer
@app.route('/generate_answer', methods=['POST'])
def generate_answer():
    # Get the question from the form
    question = request.form['question']

    # Generate the answer using GPT-3
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=question,
        max_tokens=1000
    )
    answer = response['choices'][0]['text']

    return jsonify({'answer': answer})

if __name__ == '__main__':
    app.run(debug=True)
