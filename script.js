/* static/script.js */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('questionForm');
    const questionInput = document.getElementById('question');
    const answerDiv = document.getElementById('answer');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const question = questionInput.value.trim();
        if (question === '') {
            alert('Please enter a question.');
            return;
        }

        // Send the question to the backend for answer generation
        fetch('/generate_answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'question=' + encodeURIComponent(question)
        })
        .then(response => response.json())
        .then(data => {
            answerDiv.innerHTML = '<strong>Answer:</strong> ' + data.answer;
        })
        .catch(error => {
            console.error('Error fetching answer:', error);
            answerDiv.innerHTML = 'An error occurred while fetching the answer.';
        });
    });
});
