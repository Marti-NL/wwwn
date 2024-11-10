document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryIndex = parseInt(urlParams.get("category"), 10);

    if (!isNaN(categoryIndex) && categoryIndex < categories.length) {
        const category = categories[categoryIndex];
        document.getElementById("category-name").textContent = category.name;

        const questionsContainer = document.getElementById("questions");
        category.questions.forEach((q, index) => {
            const questionElement = document.createElement("div");
            questionElement.className = "question";

            questionElement.innerHTML = `
                <p>${index + 1}. ${q.question}</p>
                ${q.options.map(option => `<button onclick="checkAnswer(${categoryIndex}, ${index}, '${option}')">${option}</button>`).join('')}
            `;
            questionsContainer.appendChild(questionElement);
        });
    } else {
        document.body.innerHTML = "<p>Category not found.</p>";
    }
});

function checkAnswer(categoryIndex, questionIndex, selectedAnswer) {
    const correctAnswer = categories[categoryIndex].questions[questionIndex].answer;
    if (selectedAnswer === correctAnswer) {
        alert("Correct!");
    } else {
        alert("Wrong answer. Try again!");
    }
}
