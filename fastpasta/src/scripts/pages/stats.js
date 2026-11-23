export function initStats() {
    const pageContent = document.getElementById("pageContent");

    const title = document.createElement("h1");
    title.textContent = "Статистика";

    pageContent.appendChild(title);
}