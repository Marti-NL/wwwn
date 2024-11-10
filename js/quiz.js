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
                <input type="text" id="answer-${index}" placeholder="Your answer here">
            `;
            questionsContainer.appendChild(questionElement);
        });
    } else {
        document.body.innerHTML = "<p>Category not found.</p>";
    }
});

function submitAnswers() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryIndex = parseInt(urlParams.get("category"), 10);
    const category = categories[categoryIndex];

    const answers = category.questions.map((q, index) => {
        const answer = document.getElementById(`answer-${index}`).value;
        return {
            question: q.question,
            answer: answer
        };
    });

    fetch('/submit-answers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ category: category.name, answers: answers })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.error("Error submitting answers:", error);
    });
}
