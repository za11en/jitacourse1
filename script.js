const jeopardyBoard = document.getElementById('jeopardy-board');
const scoreDisplay = document.getElementById('score');
const questionModal = document.getElementById('question-modal');
const closeButton = document.querySelector('.close-button');
const questionText = document.getElementById('question-text');
const userAnswerInput = document.getElementById('user-answer-input');
const submitAnswerButton = document.getElementById('submit-answer-button');
const feedbackMessage = document.getElementById('feedback-message');
const revealAnswerButton = document.getElementById('reveal-answer-button');
const correctAnswerText = document.getElementById('correct-answer-text');
const nextQuestionButton = document.getElementById('next-question-button');

let currentScore = 0;
let currentQuestion = null;
let currentCell = null;
let answeredQuestions = new Set(); // To keep track of answered questions

// Function to initialize the board
function initializeBoard() {
    jeopardyBoard.innerHTML = ''; // Clear existing board
    answeredQuestions.clear(); // Reset answered questions on new game
    currentScore = 0; // Reset score
    updateScoreDisplay();

    // Set CSS variable for number of categories. CSS will use this for grid-template-columns.
    jeopardyBoard.style.setProperty('--num-categories', gameData.categories.length);

    // Create a flat array of all cells for easy iteration
    const allCells = [];

    // Add category titles and then their questions below them,
    // positioning them using grid-column and grid-row
    gameData.categories.forEach((category, categoryIndex) => {
        const categoryTitle = document.createElement('div');
        categoryTitle.classList.add('category-title');
        categoryTitle.textContent = category.name;
        categoryTitle.style.gridColumn = `${categoryIndex + 1}`; // Place in correct column
        categoryTitle.style.gridRow = `1`; // Force to first row
        jeopardyBoard.appendChild(categoryTitle);

        category.questions.forEach((question, questionIndex) => {
            const questionCell = document.createElement('div');
            questionCell.classList.add('question-cell');
            questionCell.dataset.categoryIndex = categoryIndex;
            questionCell.dataset.questionIndex = questionIndex;
            questionCell.dataset.id = `${categoryIndex}-${questionIndex}`; // Unique ID for Set tracking

            questionCell.textContent = `$${question.value}`;
            questionCell.addEventListener('click', openQuestion);

            // Place in correct column and row based on its category and question index
            questionCell.style.gridColumn = `${categoryIndex + 1}`;
            questionCell.style.gridRow = `${questionIndex + 2}`; // +2 because row 1 is categories, then questions start
            jeopardyBoard.appendChild(questionCell);
            allCells.push(questionCell); // Add to a list for later
        });
    });

    // Handle the case where categories might have different numbers of questions
    // This ensures that `grid-auto-rows` in CSS can fill the board correctly.
    // If you have categories with fewer than `maxQuestions`, you might want
    // to explicitly add empty/disabled cells for consistency.
}

function updateScoreDisplay() {
    scoreDisplay.textContent = currentScore;
}

function openQuestion(event) {
    currentCell = event.target;
    const cellId = currentCell.dataset.id;

    if (answeredQuestions.has(cellId)) {
        return; // Don't open already answered questions
    }

    const categoryIndex = parseInt(currentCell.dataset.categoryIndex);
    const questionIndex = parseInt(currentCell.dataset.questionIndex);
    currentQuestion = gameData.categories[categoryIndex].questions[questionIndex];

    if (!currentQuestion) {
        // This case should ideally be prevented by proper board generation
        console.error("No question found for this cell.");
        return;
    }

    questionText.textContent = currentQuestion.clue;
    userAnswerInput.value = '';
    feedbackMessage.textContent = '';
    correctAnswerText.style.display = 'none';

    // Ensure buttons are in correct state
    userAnswerInput.disabled = false;
    submitAnswerButton.style.display = 'inline-block';
    revealAnswerButton.style.display = 'inline-block';
    nextQuestionButton.style.display = 'none';

    questionModal.style.display = 'flex'; // Show the modal
    userAnswerInput.focus();
}

function closeQuestionModal() {
    questionModal.style.display = 'none'; // Hide the modal
}

function normalizeString(str) {
    // Convert to lowercase, remove common Jeopardy prefixes, remove non-alphanumeric (keep spaces)
    let normalized = str.toLowerCase().replace(/^(what is|who is|where is|when is|what are|who are|where are|when are)\s/g, '');
    normalized = normalized.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ''); // Remove punctuation
    normalized = normalized.replace(/\s{2,}/g, ' '); // Replace multiple spaces with single space
    return normalized.trim();
}

// Basic check (could integrate fuzzy matching library here)
function checkAnswer() {
    const userAnswer = normalizeString(userAnswerInput.value);
    const correctAnswer = normalizeString(currentQuestion.answer);

    // Simple broad check for now. For better accuracy, integrate a fuzzy matching library.
    // Example: Using a simple includes check after normalization
    const isCorrect = correctAnswer.includes(userAnswer) && userAnswer.length > (correctAnswer.length / 3); // Prevent very short answers matching
    // Or, for exact word match if desired:
    // const isCorrect = userAnswer === correctAnswer;

    if (isCorrect) {
        feedbackMessage.textContent = 'Correct!';
        feedbackMessage.style.color = 'lightgreen';
        currentScore += currentQuestion.value;
    } else {
        feedbackMessage.textContent = 'Incorrect.';
        feedbackMessage.style.color = 'red';
        currentScore -= currentQuestion.value;
    }
    updateScoreDisplay();

    // Mark the question as answered
    if (currentCell) {
        answeredQuestions.add(currentCell.dataset.id);
        currentCell.classList.add('answered');
        currentCell.removeEventListener('click', openQuestion); // Prevent re-clicking
        currentCell.textContent = ''; // Optionally clear the dollar value
    }

    // Disable answer input and submit, show reveal/next options
    userAnswerInput.disabled = true;
    submitAnswerButton.style.display = 'none';
    revealAnswerButton.style.display = 'none';
    nextQuestionButton.style.display = 'inline-block';
}

function revealAnswer() {
    correctAnswerText.textContent = `Correct Answer: ${currentQuestion.answer}`;
    correctAnswerText.style.display = 'block';
    feedbackMessage.textContent = ''; // Clear feedback if any

    // Mark the question as answered even if revealed without guessing
    if (currentCell) {
        answeredQuestions.add(currentCell.dataset.id);
        currentCell.classList.add('answered');
        currentCell.removeEventListener('click', openQuestion);
        currentCell.textContent = '';
    }

    submitAnswerButton.style.display = 'none';
    revealAnswerButton.style.display = 'none';
    nextQuestionButton.style.display = 'inline-block';
    userAnswerInput.disabled = true;
}

function goToNextQuestion() {
    userAnswerInput.disabled = false; // Re-enable for next question
    closeQuestionModal();
    currentQuestion = null;
    currentCell = null;
    // Check if all questions are answered (optional: trigger end game)
    // For example: if (answeredQuestions.size === totalQuestions) { alert("Game Over!"); }
}

// Event Listeners
closeButton.addEventListener('click', goToNextQuestion); // Closing modal also acts as "next"
submitAnswerButton.addEventListener('click', checkAnswer);
revealAnswerButton.addEventListener('click', revealAnswer);
nextQuestionButton.addEventListener('click', goToNextQuestion);

// Allow pressing Enter to submit answer
userAnswerInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && submitAnswerButton.style.display !== 'none' && !userAnswerInput.disabled) {
        checkAnswer();
    }
});

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', initializeBoard);
