document.addEventListener("DOMContentLoaded", () => {
    const categoriesContainer = document.getElementById("categories");

    categories.forEach((category, index) => {
        const categoryElement = document.createElement("div");
        categoryElement.className = "category";
        categoryElement.innerHTML = `<a href="category.html?category=${index}">${category.name}</a>`;
        categoriesContainer.appendChild(categoryElement);
    });
});
