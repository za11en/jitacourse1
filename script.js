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
let currentQuestion = null; // Stores the original question object from gameData
let displayedClue = ''; // Stores the randomly selected clue for display
let correctDisplayedAnswer = ''; // Stores the answer corresponding to the selected clue
let currentCell = null;
let questionAnsweredCorrectly = false;


function initializeBoard() {
    jeopardyBoard.innerHTML = '';
    jeopardyBoard.style.gridTemplateColumns = `repeat(${gameData.categories.length}, 1fr)`;


    gameData.categories.forEach(category => {
        const categoryTitle = document.createElement('div');
        categoryTitle.classList.add('category-title');
        categoryTitle.textContent = category.name;
        jeopardyBoard.appendChild(categoryTitle);
    });


    const maxQuestions = Math.max(...gameData.categories.map(cat => cat.questions.length));
    for (let i = 0; i < maxQuestions; i++) {
        gameData.categories.forEach((category, categoryIndex) => {
            const question = category.questions[i];
            const questionCell = document.createElement('div');
            questionCell.classList.add('question-cell');
            questionCell.dataset.categoryIndex = categoryIndex;
            questionCell.dataset.questionIndex = i;

            if (question) {
                questionCell.textContent = `$${question.value}`;
                questionCell.addEventListener('click', openQuestion);
            } else {
                questionCell.classList.add('answered');
                questionCell.textContent = '';
            }
            jeopardyBoard.appendChild(questionCell);
        });
    }
    updateScoreDisplay();
}

function updateScoreDisplay() {
    scoreDisplay.textContent = currentScore;
}

// Helper function to normalize common compound words
function normalizeCompoundWordAttempt(word1, word2) {
    const combinedWord = (word1 + word2).toLowerCase(); // Combine and lowercase
    const hyphenatedWord = (word1 + '-' + word2).toLowerCase(); // Combine with hyphen and lowercase

    // List of common IT-related compound words and their variations
    const compoundMap = {
        'antivirus': ['antivirus', 'anti-virus', 'anti virus'],
        'firewall': ['firewall', 'fire-wall', 'fire wall'],
        'database': ['database', 'data-base', 'data base'],
        'ipaddress': ['ipaddress', 'ip-address', 'ip address'],
        'website': ['website', 'web-site', 'web site'],
        'login': ['login', 'log-in', 'log in'],
        'logout': ['logout', 'log-out', 'log out'],
        'hardware': ['hardware', 'hard-ware', 'hard ware'],
        'software': ['software', 'soft-ware', 'soft ware'],
        'laptop': ['laptop', 'lap-top', 'lap top'],
        'desktop': ['desktop', 'desk-top', 'desk top'],
        'notebook': ['notebook', 'note-book', 'note book'],
        'wifi': ['wifi', 'wi-fi'] // Explicitly handle Wi-Fi here as well
    };

    for (const canonicalForm in compoundMap) {
        if (compoundMap[canonicalForm].includes(combinedWord) || compoundMap[canonicalForm].includes(hyphenatedWord)) {
            return canonicalForm; // Return the standardized form if a match is found
        }
    }
    return null; // No compound word match
}

// Global variable to keep track of the question's state once answered/revealed
let questionStatusSaved = false;

function openQuestion(event) {
    currentCell = event.target;
    if (currentCell.classList.contains('answered')) {
        return; // Don't open already answered questions
    }

    const categoryIndex = parseInt(currentCell.dataset.categoryIndex);
    const questionIndex = parseInt(currentCell.dataset.questionIndex);
    currentQuestion = gameData.categories[categoryIndex].questions[questionIndex]; // Store the original question object

    if (!currentQuestion) {
        return; // Should not happen with proper empty cell handling
    }

    // --- NEW LOGIC: Randomly select one of the alternate clues/answers ---
    const allClueAnswerPairs = [{ clue: currentQuestion.clue, answer: currentQuestion.answer }];
    if (currentQuestion.alternates && currentQuestion.alternates.length > 0) {
        allClueAnswerPairs.push(...currentQuestion.alternates);
    }
    const randomIndex = Math.floor(Math.random() * allClueAnswerPairs.length);
    const selectedClueAnswer = allClueAnswerPairs[randomIndex];

    displayedClue = selectedClueAnswer.clue;
    correctDisplayedAnswer = selectedClueAnswer.answer;
    // --- END NEW LOGIC ---


    questionText.textContent = displayedClue; // Display the randomly selected clue
    userAnswerInput.value = '';
    feedbackMessage.textContent = '';
    correctAnswerText.style.display = 'none'; // Ensure hidden initially
    submitAnswerButton.style.display = 'inline-block';
    revealAnswerButton.style.display = 'inline-block';
    nextQuestionButton.style.display = 'none';
    userAnswerInput.disabled = false; // Ensure input is enabled

    questionModal.style.display = 'flex'; // Show the modal
    userAnswerInput.focus();
    questionAnsweredCorrectly = false; // Reset for new question
    questionStatusSaved = false; // Reset status for new question
}


function closeQuestionModal() {
    questionModal.style.display = 'none';
}

function checkAnswer() {
    // Prevent multiple submissions
    if (questionStatusSaved) return;

    const userAnswerRaw = userAnswerInput.value.trim();
    // Use the correctDisplayedAnswer for comparison
    let correctAnswerRaw = correctDisplayedAnswer; // Use the randomly selected answer

    userAnswerInput.disabled = true;
    submitAnswerButton.style.display = 'none'; // Hide submit button

    // --- Step 1: Prepare Answers for Comparison ---
    let cleanedCorrectAnswer = correctAnswerRaw.toLowerCase();
    if (cleanedCorrectAnswer.startsWith("what is ")) {
        cleanedCorrectAnswer = cleanedCorrectAnswer.substring(8);
    } else if (cleanedCorrectAnswer.startsWith("who is ")) {
        cleanedCorrectAnswer = cleanedCorrectAnswer.substring(7);
    }
    cleanedCorrectAnswer = cleanedCorrectAnswer.replace(/[^a-z0-9\s]/g, '');

    let cleanedUserAnswer = userAnswerRaw.toLowerCase().replace(/[^a-z\s]/g, '');

    const correctAnswerWords = cleanedCorrectAnswer.split(/\s+/).filter(word => word.length > 0);
    const userAnswerWords = cleanedUserAnswer.split(/\s+/).filter(word => word.length > 0);

    let matchedWordsCount = 0;
    const matchedCorrectWords = new Set();

    // --- Step 2: First Pass - Direct Word-by-Word Matching ---
    userAnswerWords.forEach(userWord => {
        if (correctAnswerWords.includes(userWord) && !matchedCorrectWords.has(userWord)) {
            matchedWordsCount++;
            matchedCorrectWords.add(userWord);
        }
    });

    // --- Step 3: Second Pass - Check for Compound Words if not fully matched yet ---
    if (matchedWordsCount < correctAnswerWords.length) {
        for (let i = 0; i < userAnswerWords.length - 1; i++) {
            const word1 = userAnswerWords[i];
            const word2 = userAnswerWords[i+1];
            const normalizedCompound = normalizeCompoundWordAttempt(word1, word2);

            if (normalizedCompound && correctAnswerWords.includes(normalizedCompound) && !matchedCorrectWords.has(normalizedCompound)) {
                 if (!correctAnswerWords.includes(word1) || !correctAnswerWords.includes(word2)) {
                    if (!matchedCorrectWords.has(normalizedCompound)) {
                         matchedWordsCount++;
                         matchedCorrectWords.add(normalizedCompound);
                    }
                }
            }
        }
    }

    // --- Step 4: Determine Correctness and Score (FINALIZED HERE) ---
    let isFullMatch = false;
    let isPartialMatch = false;

    if (matchedWordsCount === correctAnswerWords.length &&
        (userAnswerWords.length === correctAnswerWords.length ||
         matchedWordsCount === userAnswerWords.length ||
         userAnswerWords.length <= correctAnswerWords.length + 2)) {
        isFullMatch = true;
    } else if (matchedWordsCount > 0 && matchedWordsCount >= correctAnswerWords.length / 2) {
        isPartialMatch = true;
    }


    if (isFullMatch) {
        feedbackMessage.textContent = 'Correct!';
        feedbackMessage.style.color = 'green';
        currentScore += currentQuestion.value;
        questionAnsweredCorrectly = true;
    } else if (isPartialMatch) {
        feedbackMessage.textContent = `Partial Match! (${matchedWordsCount} of ${correctAnswerWords.length} words matched)`;
        feedbackMessage.style.color = 'orange';
        currentScore += Math.round(currentQuestion.value / 2);
        questionAnsweredCorrectly = true; // Still mark as correct for board icon
    } else {
        feedbackMessage.textContent = 'Incorrect.';
        feedbackMessage.style.color = 'red';
        currentScore -= currentQuestion.value;
        questionAnsweredCorrectly = false;
    }

    updateScoreDisplay(); // Update score immediately

    // Always show the correct answer and prepare for next action
    revealAnswerButton.style.display = 'none'; // Hide manual reveal
    correctAnswerText.textContent = `Correct Answer: ${correctDisplayedAnswer}`; // Display the correct answer
    correctAnswerText.style.display = 'block';
    nextQuestionButton.style.display = 'inline-block'; // Show "Next Question" button

    // IMPORTANT: Mark the question as fully processed here
    markQuestionAsAnsweredOnBoard();
    questionStatusSaved = true; // Set flag so it's not reprocessed if close is hit

    // Remove the event listener from the close button so it doesn't trigger go to next question
    closeButton.removeEventListener('click', closeQuestionModal);
    // Add a new handler for the close button after answer is submitted
    closeButton.addEventListener('click', goToNextQuestion);
}


function revealAnswer() {
    // Prevent multiple submissions
    if (questionStatusSaved) return;

    correctAnswerText.textContent = `Correct Answer: ${correctDisplayedAnswer}`; // Use the randomly selected answer
    correctAnswerText.style.display = 'block';
    feedbackMessage.textContent = 'Answer revealed.';
    feedbackMessage.style.color = 'orange';

    submitAnswerButton.style.display = 'none';
    revealAnswerButton.style.display = 'none';
    nextQuestionButton.style.display = 'inline-block';
    userAnswerInput.disabled = true;
    questionAnsweredCorrectly = false; // Marked as incorrect for board icon
    currentScore -= currentQuestion.value; // Deduct points for revealing
    updateScoreDisplay();

    // IMPORTANT: Mark the question as fully processed here
    markQuestionAsAnsweredOnBoard();
    questionStatusSaved = true; // Set flag

    // Remove the event listener from the close button so it doesn't trigger go to next question
    closeButton.removeEventListener('click', closeQuestionModal);
    // Add a new handler for the close button after answer is submitted
    closeButton.addEventListener('click', goToNextQuestion);
}

// NEW FUNCTION: Centralized logic to update the board cell
function markQuestionAsAnsweredOnBoard() {
    if (currentCell && !currentCell.classList.contains('answered')) { // Only update if not already
        currentCell.classList.add('answered'); // Mark as answered
        currentCell.removeEventListener('click', openQuestion); // Prevent re-clicking
        currentCell.textContent = ''; // Clear the dollar value

        // Add the checkmark or X
        const icon = document.createElement('span');
        icon.classList.add('status-icon');
        if (questionAnsweredCorrectly) {
            icon.classList.add('correct');
            icon.innerHTML = '&#10003;'; // Green checkmark HTML entity
        } else {
            icon.classList.add('incorrect');
            icon.innerHTML = '&#10006;'; // Red X HTML entity
        }
        currentCell.appendChild(icon); // Add icon to the cell
    }
}


function goToNextQuestion() {
    userAnswerInput.disabled = false; // Re-enable for next question
    closeQuestionModal();
    currentQuestion = null;
    displayedClue = ''; // Reset displayed clue
    correctDisplayedAnswer = ''; // Reset correct displayed answer
    currentCell = null;
    questionAnsweredCorrectly = false; // Reset for next question
    questionStatusSaved = false; // Reset for next question

    // Restore original close button behavior
    closeButton.removeEventListener('click', goToNextQuestion);
    closeButton.addEventListener('click', closeQuestionModal);
}


// Event Listeners
closeButton.addEventListener('click', closeQuestionModal); // Initial close behavior
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