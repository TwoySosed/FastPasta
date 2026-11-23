export function initSearch() {
    const pageContent = document.getElementById("pageContent");

    const title = document.createElement("h1");
    title.textContent = "Поиск";

    pageContent.appendChild(title);
}