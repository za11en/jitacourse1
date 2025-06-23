const jeopardyBoard = document.getElementById('jeopardy-board');
const scoreDisplay = document.getElementById('score');
const newGameButton = document.getElementById('new-game-button');
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
let answeredQuestions = new Set();


function initializeBoard() {
    closeQuestionModal();
    jeopardyBoard.innerHTML = '';
    answeredQuestions.clear();
    currentScore = 0;
    updateScoreDisplay();

    jeopardyBoard.style.setProperty('--num-categories', gameData.categories.length);

    gameData.categories.forEach((category, categoryIndex) => {
        const categoryTitle = document.createElement('div');
        categoryTitle.classList.add('category-title');
        categoryTitle.textContent = category.name;
        categoryTitle.style.gridColumn = `${categoryIndex + 1}`;
        categoryTitle.style.gridRow = `1`;
        jeopardyBoard.appendChild(categoryTitle);

        category.questions.forEach((questionSlot, questionIndex) => {
            const questionCell = document.createElement('div');
            questionCell.classList.add('question-cell');
            questionCell.dataset.categoryIndex = categoryIndex;
            questionCell.dataset.questionIndex = questionIndex;
            questionCell.dataset.id = `${categoryIndex}-${questionIndex}`;
            questionCell.textContent = `$${questionSlot.value}`;
            questionCell.tabIndex = 0;

            questionCell.addEventListener('click', openQuestion);
            questionCell.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    openQuestion(e);
                }
            });

            questionCell.style.gridColumn = `${categoryIndex + 1}`;
            questionCell.style.gridRow = `${questionIndex + 2}`;
            jeopardyBoard.appendChild(questionCell);
        });
    });
}

function updateScoreDisplay() {
    scoreDisplay.textContent = currentScore;
}

function openQuestion(event) {
    currentCell = event.target;
    if (answeredQuestions.has(currentCell.dataset.id)) {
        return;
    }

    const categoryIndex = parseInt(currentCell.dataset.categoryIndex);
    const questionIndex = parseInt(currentCell.dataset.questionIndex);
    
    const questionSlot = gameData.categories[categoryIndex].questions[questionIndex];
    
    if (questionSlot.alternates && questionSlot.alternates.length > 0) {
        const randomIndex = Math.floor(Math.random() * questionSlot.alternates.length);
        currentQuestion = { ...questionSlot.alternates[randomIndex] }; 
        currentQuestion.value = questionSlot.value;
    } else {
        console.error("This question cell has no alternate questions defined.");
        return;
    }

    questionText.textContent = currentQuestion.clue;
    userAnswerInput.value = '';
    feedbackMessage.textContent = '';
    correctAnswerText.style.display = 'none';

    userAnswerInput.disabled = false;
    submitAnswerButton.style.display = 'inline-block';
    revealAnswerButton.style.display = 'inline-block';
    nextQuestionButton.style.display = 'none';

    questionModal.style.display = 'flex';
    userAnswerInput.focus();
}

function closeQuestionModal() {
    questionModal.style.display = 'none';
}

function normalizeString(str) {
    if (typeof str !== 'string') return '';
    return str.toLowerCase()
              .replace(/^(what is|who is|where is|what are|who are|where are|when are)\s/g, '')
              .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
              .replace(/\s+/g, ' ')
              .trim();
}

function checkAnswer() {
    const userAnswer = normalizeString(userAnswerInput.value);
    const correctAnswer = normalizeString(currentQuestion.answer);
    const isCorrect = userAnswer === correctAnswer;

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


    correctAnswerText.textContent = `Correct Answer: ${currentQuestion.answer}`;
    correctAnswerText.style.display = 'block';


    markQuestionAsAnswered(isCorrect);
    showNextStep();
}



function revealAnswer() {
    correctAnswerText.textContent = `Correct Answer: ${currentQuestion.answer}`;
    correctAnswerText.style.display = 'block';
    feedbackMessage.textContent = 'Answer revealed.';
    

    markQuestionAsAnswered(null);
    showNextStep();
}

/**
 * Marks the cell on the board as answered, adding a check or X.
 * @param {boolean|null} isCorrect 
 */
function markQuestionAsAnswered(isCorrect) {
    if (currentCell && !answeredQuestions.has(currentCell.dataset.id)) {
        answeredQuestions.add(currentCell.dataset.id);
        currentCell.classList.add('answered');
        currentCell.tabIndex = -1;


        if (isCorrect === true) {
            currentCell.innerHTML = '<span class="feedback-icon correct">✓</span>';
        } else if (isCorrect === false) {
            currentCell.innerHTML = '<span class="feedback-icon incorrect">✗</span>';
        } else {

            currentCell.textContent = '';
        }
    }
}

function showNextStep() {
    userAnswerInput.disabled = true;
    submitAnswerButton.style.display = 'none';
    revealAnswerButton.style.display = 'none';
    nextQuestionButton.style.display = 'inline-block';
}

function goToNextQuestion() {
    closeQuestionModal();
    currentQuestion = null;
    currentCell = null;
}


newGameButton.addEventListener('click', initializeBoard);
closeButton.addEventListener('click', goToNextQuestion);
submitAnswerButton.addEventListener('click', checkAnswer);
revealAnswerButton.addEventListener('click', revealAnswer);
nextQuestionButton.addEventListener('click', goToNextQuestion);

userAnswerInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !userAnswerInput.disabled) {
        checkAnswer();
    }
});

document.addEventListener('DOMContentLoaded', initializeBoard);
