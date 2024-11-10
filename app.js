const questions = [
    { question: "What is 2 + 2?", answers: ["3", "4", "5", "6"], correct: 1 },
    { question: "What is the capital of France?", answers: ["Berlin", "Madrid", "Paris", "Rome"], correct: 2 },
    // Add more questions if needed
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById("question");
const answerContainer = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;
    answerContainer.innerHTML = "";

    currentQuestion.answers.forEach((answer, index) => {
        const answerBtn = document.createElement("div");
        answerBtn.classList.add("answer");
        answerBtn.textContent = answer;
        answerBtn.onclick = () => selectAnswer(index);
        answerContainer.appendChild(answerBtn);
    });

    nextButton.style.display = "none";
}

function selectAnswer(answerIndex) {
    const correctAnswer = questions[currentQuestionIndex].correct;
    if (answerIndex === correctAnswer) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    }
    nextButton.style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        questionContainer.textContent = "Quiz Complete!";
        answerContainer.innerHTML = "";
        nextButton.style.display = "none";
    }
}

loadQuestion();

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").then(registration => {
        console.log("Service Worker registered with scope:", registration.scope);
    }).catch(error => {
        console.log("Service Worker registration failed:", error);
    });
}
